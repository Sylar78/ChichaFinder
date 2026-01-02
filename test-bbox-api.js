// Test script for bbox API
const fetch = require('node-fetch');

async function testBboxAPI() {
  // Test avec Paris (coordonnées approximatives)
  const south = 48.8;
  const north = 48.9;
  const west = 2.2;
  const east = 2.4;

  console.log('Testing bbox API with Paris coordinates...');
  console.log(`Bounds: south=${south}, west=${west}, north=${north}, east=${east}`);

  try {
    const response = await fetch(
      `http://localhost:3000/api/osm/bbox?south=${south}&west=${west}&north=${north}&east=${east}`
    );
    
    const data = await response.json();
    
    console.log('\n=== API Response ===');
    console.log('Status:', response.status);
    console.log('Success:', data.success);
    console.log('Count:', data.count);
    console.log('Bars found:', data.bars?.length || 0);
    
    if (data.bars && data.bars.length > 0) {
      console.log('\n=== First 3 bars ===');
      data.bars.slice(0, 3).forEach((bar, i) => {
        console.log(`\n${i + 1}. ${bar.name}`);
        console.log(`   OSM ID: ${bar.osm_id}`);
        console.log(`   Location: ${bar.latitude}, ${bar.longitude}`);
        console.log(`   Address: ${bar.address || 'N/A'}`);
      });
    } else {
      console.log('\nNo bars found. This might be normal if there are no hookah bars in OSM for this area.');
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
}

testBboxAPI();
