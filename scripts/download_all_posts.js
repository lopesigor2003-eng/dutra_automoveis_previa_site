import https from 'https';
import fs from 'fs';
import path from 'path';

const postUrls = [
  { id: 'veh-01', url: 'https://www.instagram.com/p/DeSoC8_jD1T/' },
  { id: 'veh-02', url: 'https://www.instagram.com/p/DeMsCnplMOS/' },
  { id: 'veh-03', url: 'https://www.instagram.com/p/DeCrU5cFLJH/' },
  { id: 'veh-04', url: 'https://www.instagram.com/p/DdpzoneDGCT/' },
  { id: 'veh-05', url: 'https://www.instagram.com/p/DdfSPDYjO_D/' },
  { id: 'veh-06', url: 'https://www.instagram.com/p/Dde43z4lJ7G/' },
  { id: 'veh-07', url: 'https://www.instagram.com/p/DdbzHW-FEHY/' },
  { id: 'veh-08', url: 'https://www.instagram.com/p/Dc1bb3ilKMl/' },
  { id: 'veh-09', url: 'https://www.instagram.com/p/Dc1MWQYlLpL/' },
  { id: 'veh-10', url: 'https://www.instagram.com/p/DcB-z3xlF6q/' },
  { id: 'veh-11', url: 'https://www.instagram.com/p/Dbgddo9lImV/' },
  { id: 'veh-12', url: 'https://www.instagram.com/p/Dbgc4XilBgq/' },
  { id: 'veh-13', url: 'https://www.instagram.com/p/DbBjIYQFAcn/' },
];

function fetchUrl(targetUrl) {
  return new Promise((resolve, reject) => {
    https.get(targetUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    }, res => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

function downloadImage(imgUrl, destPath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(destPath);
    https.get(imgUrl, res => {
      res.pipe(file);
      file.on('finish', () => file.close(resolve));
    }).on('error', err => {
      fs.unlink(destPath, () => {});
      reject(err);
    });
  });
}

async function start() {
  const outputDir = path.resolve('public', 'vehicles');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const results = [];

  for (let i = 0; i < postUrls.length; i++) {
    const item = postUrls[i];
    const embedUrl = item.url + 'embed/captioned/';
    try {
      const html = await fetchUrl(embedUrl);
      
      // Caption extraction
      let caption = '';
      const capIdx = html.indexOf('class="Caption"');
      if (capIdx !== -1) {
        const endIdx = html.indexOf('</div><div class="Footer"', capIdx);
        if (endIdx !== -1) {
          caption = html.slice(capIdx, endIdx)
            .replace(/<br\s*[\/]?>/gi, '\n')
            .replace(/<[^>]+>/g, '')
            .trim();
        }
      }

      // Image extraction
      let imgMatch = html.match(/class="EmbeddedMediaImage"[^>]+src="([^">]+)"/i) 
                  || html.match(/src="([^">]+)"[^>]+class="EmbeddedMediaImage"/i);
      
      let imgUrl = imgMatch ? imgMatch[1].replace(/&amp;/g, '&') : null;

      if (!imgUrl) {
        // Fallback to cdninstagram match
        const cdnMatches = html.match(/https:\\\/\\\/[^"]+cdninstagram\.com\\\/v\\\/[^"]+/g);
        if (cdnMatches && cdnMatches.length > 0) {
          imgUrl = cdnMatches[0].split('\\/').join('/').split('\\u0026').join('&');
        }
      }

      let localImagePath = null;
      if (imgUrl) {
        const filename = `${item.id}.jpg`;
        const dest = path.join(outputDir, filename);
        await downloadImage(imgUrl, dest);
        localImagePath = `/vehicles/${filename}`;
        console.log(`[${i+1}/${postUrls.length}] Downloaded ${filename}`);
      } else {
        console.log(`[${i+1}/${postUrls.length}] No image found for ${item.url}`);
      }

      results.push({
        id: item.id,
        instagramUrl: item.url,
        caption,
        imageUrl: localImagePath || imgUrl,
        rawImgUrl: imgUrl
      });

      console.log(`Caption for ${item.id}:\n${caption}\n---`);
    } catch (e) {
      console.error(`Error on ${item.url}:`, e.message);
    }
  }

  fs.writeFileSync('scripts/extracted_vehicles.json', JSON.stringify(results, null, 2));
  console.log('Saved extracted_vehicles.json!');
}

start();
