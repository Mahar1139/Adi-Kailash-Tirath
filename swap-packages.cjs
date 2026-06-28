const fs = require('fs');

const siteDataPath = './site-data.json';

if (fs.existsSync(siteDataPath)) {
  const data = JSON.parse(fs.readFileSync(siteDataPath, 'utf8'));
  
  if (data.packages && data.packages.length >= 3) {
    const temp = data.packages[0];
    data.packages[0] = data.packages[2];
    data.packages[2] = temp;
    console.log(`Swapped ${data.packages[0].id} and ${data.packages[2].id} in site-data.json`);
  }
  
  fs.writeFileSync(siteDataPath, JSON.stringify(data, null, 2), 'utf8');
}
