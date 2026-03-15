const fs = require('fs');
const https = require('https');

const content = fs.readFileSync('seed.js', 'utf8');

const regex = /image:\s*'([^']+)'/g;
let match;
const urls = [];

while ((match = regex.exec(content)) !== null) {
  urls.push(match[1]);
}

const uniqueUrls = [...new Set(urls)];

async function checkUrl(url) {
  return new Promise((resolve) => {
    https.get(url, (res) => {
      resolve({ url, status: res.statusCode });
    }).on('error', (err) => {
      resolve({ url, status: 'Error: ' + err.message });
    });
  });
}

async function run() {
  const promises = uniqueUrls.map(checkUrl);
  const results = await Promise.all(promises);
  let output = '';
  
  results.forEach(r => {
    if (r.status !== 200) {
      output += `[FAIL] ${r.status} = ${r.url}\n`;
    } else {
      output += `[OK] ${r.url}\n`;
    }
  });
  fs.writeFileSync('results_utf8.txt', output, 'utf8');
}

run();
