const fs = require('fs');
const filepath = './site-data.json';
if (fs.existsSync(filepath)) {
  const data = JSON.parse(fs.readFileSync(filepath, 'utf8'));
  
  if (data.circularDestinations) {
    data.circularDestinations.forEach(item => {
      if (item.categoryRef === 'darma_valley') {
        item.img = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDYdLE8R_2tMzwXok2KG2abgk1eFA3_saSAzDfEGLGScyq0p04';
      }
    });
  }

  fs.writeFileSync(filepath, JSON.stringify(data, null, 2), 'utf8');
  console.log('site-data.json updated successfully');
}
