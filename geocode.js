// Script pour obtenir les coordonnées d'une adresse
// Usage: node geocode.js "Boulevard des Cygnes, France"

const https = require('https');

const address = process.argv[2] || "Boulevard des Cygnes, France";

console.log(`🔍 Recherche des coordonnées pour: ${address}\n`);

const query = encodeURIComponent(address);
const url = `/search?q=${query}&format=json&addressdetails=1&limit=5`;

const options = {
  hostname: 'nominatim.openstreetmap.org',
  path: url,
  method: 'GET',
  headers: {
    'User-Agent': 'ChichaAroundMe/1.0'
  }
};

const req = https.request(options, (res) => {
  let data = '';

  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    try {
      const results = JSON.parse(data);
      
      if (results.length === 0) {
        console.log('❌ Aucun résultat trouvé pour cette adresse.');
        return;
      }

      console.log(`✅ ${results.length} résultat(s) trouvé(s):\n`);
      
      results.forEach((result, index) => {
        console.log(`${index + 1}. ${result.display_name}`);
        console.log(`   📍 Latitude: ${result.lat}`);
        console.log(`   📍 Longitude: ${result.lon}`);
        console.log(`   🏷️  Type: ${result.type}`);
        console.log('');
      });

      // Afficher le code pour le test
      if (results.length > 0) {
        const first = results[0];
        console.log('📋 Code à utiliser dans test-search.js:');
        console.log(`const latitude = ${first.lat};`);
        console.log(`const longitude = ${first.lon};`);
      }
    } catch (error) {
      console.error('❌ Erreur:', error.message);
    }
  });
});

req.on('error', (error) => {
  console.error('❌ Erreur de requête:', error.message);
});

req.end();
