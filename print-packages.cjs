const fs = require('fs');
const filepath = './site-data.json';
if (fs.existsSync(filepath)) {
  const data = JSON.parse(fs.readFileSync(filepath, 'utf8'));
  console.log("site-data.json packages:");
  if (data.packages) console.log(data.packages.slice(0, 5).map((c, i) => `${i+1}: ${c.id} - ${c.title}`).join('\n'));
} else {
  console.log("No site-data.json packages");
}
