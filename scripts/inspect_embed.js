import https from 'https';

const url = 'https://www.instagram.com/p/DeSoC8_jD1T/embed/captioned/';

https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, (res) => {
  let d = '';
  res.on('data', chunk => d += chunk);
  res.on('end', () => {
    const imgMatches = d.match(/<img[^>]+class="EmbeddedMediaImage"[^>]+src="([^">]+)"/i) 
      || d.match(/class="EmbeddedMediaImage"[^>]+src="([^">]+)"/i);
    console.log("EmbeddedMediaImage regex:", imgMatches ? imgMatches[1].replace(/&amp;/g, '&') : "not found");

    const matchAllImgs = d.match(/https:\\\/\\\/[^"]+cdninstagram\.com\\\/v\\\/[^"]+/g);
    if (matchAllImgs) {
      console.log("Total cdn images found:", matchAllImgs.length);
      const cleanImg = matchAllImgs[0].split('\\/').join('/').split('\\u0026').join('&');
      console.log("Sample 1:", cleanImg);
    }
  });
});
