// Test script to search for chicha bars
// Usage: node test-search.js

const https = require('https');

// Coordinates du Boulevard des Cygnes, Mantes-la-Jolie
const latitude = 48.9967540;
const longitude = 1.7150009;
const radius = 5000; // 5km

const query = `[out:json][timeout:25];
(
  node["amenity"="bar"]["hookah"="yes"](around:${radius},${latitude},${longitude});
  node["amenity"="cafe"]["hookah"="yes"](around:${radius},${latitude},${longitude});
  node["amenity"="bar"]["name"~"chicha|shisha|hookah|lounge|iris",i](around:${radius},${latitude},${longitude});
  node["amenity"="cafe"]["name"~"chicha|shisha|hookah|lounge|iris",i](around:${radius},${latitude},${longitude});
  node["amenity"]["name"~"chicha|shisha|hookah",i](around:${radius},${latitude},${longitude});
  way["amenity"="bar"]["name"~"chicha|shisha|hookah|lounge|iris",i](around:${radius},${latitude},${longitude});
  way["amenity"="cafe"]["name"~"chicha|shisha|hookah|lounge|iris",i](around:${radius},${latitude},${longitude});
);
out center;`;

const postData = `data=${encodeURIComponent(query)}`;

const options = {
  hostname: 'overpass-api.de',
  path: '/api/interpreter',
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Content-Length': Buffer.byteLength(postData)
  }
};

console.log('🔍 Recherche de bars à chicha autour de:', latitude, longitude);
console.log('📍 Rayon de recherche:', radius / 1000, 'km\n');

const req = https.request(options, (res) => {
  let data = '';

  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    try {
      const result = JSON.parse(data);
      const elements = result.elements || [];
      
      console.log(`✅ ${elements.length} résultat(s) trouvé(s):\n`);
      
      const seenNames = new Set();
      elements.forEach((el, index) => {
        if (el.tags && el.tags.name && !seenNames.has(el.tags.name)) {
          seenNames.add(el.tags.name);
          console.log(`${index + 1}. ${el.tags.name}`);
          if (el.tags['addr:street']) {
            console.log(`   📍 ${el.tags['addr:housenumber'] || ''} ${el.tags['addr:street']}`);
          }
          if (el.tags.phone) {
            console.log(`   ☎️  ${el.tags.phone}`);
          }
          if (el.tags.amenity) {
            console.log(`   🏷️  Type: ${el.tags.amenity}`);
          }
          console.log(`   🌐 OSM ID: ${el.id}`);
          console.log('');
        }
      });

      if (elements.length === 0) {
        console.log('❌ Aucun résultat trouvé.');
        console.log('\n💡 Suggestions:');
        console.log('   - Vérifiez les coordonnées (lat/lon)');
        console.log('   - Augmentez le rayon de recherche');
        console.log('   - Le bar n\'est peut-être pas encore dans OpenStreetMap');
        console.log('   - Vous pouvez l\'ajouter sur https://www.openstreetmap.org');
      }
    } catch (error) {
      console.error('❌ Erreur lors du parsing:', error.message);
      console.log('Réponse brute:', data.substring(0, 500));
    }
  });
});

req.on('error', (error) => {
  console.error('❌ Erreur de requête:', error.message);
});

req.write(postData);
req.end();
