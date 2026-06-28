const fs = require('fs');
const filepath = './site-data.json';
if (fs.existsSync(filepath)) {
  const data = JSON.parse(fs.readFileSync(filepath, 'utf8'));
  console.log(data.circularDestinations.map((c, i) => `${i+1}: ${c.categoryRef} / ${c.title}`).join('\n'));
}
