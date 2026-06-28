const fs = require('fs');
const filepath = './site-data.json';
if (fs.existsSync(filepath)) {
  const data = JSON.parse(fs.readFileSync(filepath, 'utf8'));
  
  if (data.circularDestinations) {
    data.circularDestinations.forEach(item => {
      if (item.categoryRef === 'chardham' && item.title === 'Complete Chardham') {
        item.img = 'https://images.travelbudie.com/uploads/blog/kLEm7kjp3RbbgIHnWRX8mL4Mk7G1rtyc7MzVag4w.jpg';
      }
      if (item.categoryRef === 'adi_kailash' && item.title === 'Adi Kailash Parvat') {
        item.img = 'https://i0.wp.com/dharmikvibes.com/wp-content/uploads/2025/10/adi-kailash-tour-package.webp?fit=750%2C419&ssl=1';
      }
      if (item.categoryRef === 'om_parvat') {
        item.img = 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/05/04/56/b3/om-parvat.jpg?w=1200&h=-1&s=1';
      }
      if (item.categoryRef === 'munsyari' && item.title.includes('Munsyari')) {
        item.img = 'https://soulitude.in/wp-content/uploads/Munsiyari1.jpg';
      }
      if (item.categoryRef === 'kainchi_dham') {
        item.img = 'https://lh3.googleusercontent.com/gps-cs-s/APNQkAH1UJBjYuxcThKaN1CvuMk12YDlgV7kV97wmD7ODun67CdGWEpTC-EgckKAnYFOMtHb0CfNlqqlYGwf5j_7KOkEQgKZ76F4Qy2SHRIjwiGK3naCH6jDw5NYpqy12IfBF3kKEqXc4kZ86fga=s680-w680-h510-rw';
      }
    });

    data.circularDestinations = data.circularDestinations.filter(item => {
      if (item.title === 'Amarnath Helicopter' || item.title === 'Amarnath Cave Heli Yatra' || item.title === 'Amarnath & Vaishno Devi' || item.title === 'Amarnath Tours' || item.title === 'Babaji Cave Dunagiri' || item.title.includes('Amarnath Cave') || item.categoryRef === 'amarnath') {
        return false;
      }
      return true;
    });
  }

  fs.writeFileSync(filepath, JSON.stringify(data, null, 2), 'utf8');
  console.log('site-data.json updated successfully');
}
