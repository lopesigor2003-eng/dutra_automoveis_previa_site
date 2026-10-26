import https from 'https';

const postUrls = [
  'https://www.instagram.com/p/DeSoC8_jD1T/',
  'https://www.instagram.com/p/DeMsCnplMOS/',
  'https://www.instagram.com/p/DeCrU5cFLJH/',
  'https://www.instagram.com/p/DdpzoneDGCT/',
  'https://www.instagram.com/p/DdfSPDYjO_D/',
  'https://www.instagram.com/p/Dde43z4lJ7G/',
  'https://www.instagram.com/p/DdbzHW-FEHY/',
  'https://www.instagram.com/p/Dc1bb3ilKMl/',
  'https://www.instagram.com/p/Dc1MWQYlLpL/',
  'https://www.instagram.com/p/DcB-z3xlF6q/',
  'https://www.instagram.com/p/Dbgddo9lImV/',
  'https://www.instagram.com/p/Dbgc4XilBgq/',
  'https://www.instagram.com/p/DbBjIYQFAcn/',
];

function fetchEmbed(url) {
  return new Promise((resolve, reject) => {
    const embedUrl = url.endsWith('/') ? url + 'embed/captioned/' : url + '/embed/captioned/';
    https.get(embedUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ url, data }));
    }).on('error', reject);
  });
}

async function run() {
  const results = [];
  for (const url of postUrls) {
    try {
      const { data } = await fetchEmbed(url);
      
      // Look for caption in html: <div class="Caption"> or in JSON "text":"..."
      let caption = '';
      const captionMatch = data.match(/<div class="Caption"[^>]*>([\s\S]*?)<\/div>/i);
      if (captionMatch) {
        caption = captionMatch[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
      }

      // Look for display_url or src image
      let images = [];
      const imgRegex = /"display_url":"([^"]+)"/g;
      let m;
      while ((m = imgRegex.exec(data)) !== null) {
        images.push(m[1].replace(/\\u0026/g, '&').replace(/\\\//g, '/'));
      }
      if (images.length === 0) {
        const srcRegex = /"src":"([^"]+)"/g;
        while ((m = srcRegex.exec(data)) !== null) {
          if (m[1].includes('cdninstagram.com') && (m[1].includes('.jpg') || m[1].includes('.webp'))) {
            images.push(m[1].replace(/\\u0026/g, '&').replace(/\\\//g, '/'));
          }
        }
      }

      // Also search for JSON "caption":{"edges":[{"node":{"text":"..."}}]}
      const jsonTextMatch = data.match(/"text":"((?:[^"\\]|\\.)*)"/);
      let jsonCaption = '';
      if (jsonTextMatch) {
        try {
          jsonCaption = JSON.parse(`"${jsonTextMatch[1]}"`);
        } catch (e) {
          jsonCaption = jsonTextMatch[1];
        }
      }

      results.push({
        url,
        caption: caption || jsonCaption,
        image: images[0] || '',
        allImages: Array.from(new Set(images)).slice(0, 5)
      });
      console.log(`=== URL: ${url} ===`);
      console.log(`Caption: ${caption || jsonCaption}`);
      console.log(`Main Image: ${images[0]}`);
      console.log(`-----------------------------------`);
    } catch (err) {
      console.error(`Error fetching ${url}:`, err.message);
    }
  }
}

run();
