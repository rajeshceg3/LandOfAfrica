const fs = require('fs');

try {
    // Read country-data.js
    let countryDataContent = fs.readFileSync('country-data.js', 'utf8');
    // Remove "const countryData = " and trailing semicolon if present
    countryDataContent = countryDataContent.replace(/^const countryData = /, '').trim();
    if (countryDataContent.endsWith(';')) {
        countryDataContent = countryDataContent.slice(0, -1);
    }

    // Fix potential JS object syntax to JSON if needed (though it looked like JSON)
    // The file content I saw earlier had keys quoted.
    const countryData = JSON.parse(countryDataContent);
    const dataKeys = new Set(Object.keys(countryData));

    // Read africa.geojson
    const geoJsonContent = fs.readFileSync('africa.geojson', 'utf8');
    const geoJson = JSON.parse(geoJsonContent);
    const mapKeys = new Set(geoJson.features.map(f => f.properties.name));

    // Analysis
    const missingInMap = [...dataKeys].filter(k => !mapKeys.has(k));
    const missingInData = [...mapKeys].filter(k => !dataKeys.has(k));

    console.log("Analysis Result:");
    console.log(`Total in Data: ${dataKeys.size}`);
    console.log(`Total in Map: ${mapKeys.size}`);

    if (missingInMap.length > 0) {
        console.log("\nCountries in Data but NOT in Map (Action: These will be broken in Quiz/Nav):");
        missingInMap.forEach(k => console.log(` - "${k}"`));
    } else {
        console.log("\nAll Data entries have matching Map features.");
    }

    if (missingInData.length > 0) {
        console.log("\nFeatures in Map but NOT in Data (Action: These are unclickable grey shapes):");
        missingInData.forEach(k => console.log(` - "${k}"`));
    } else {
        console.log("\nAll Map features have matching Data entries.");
    }

} catch (e) {
    console.error("Error verifying data:", e);
}
