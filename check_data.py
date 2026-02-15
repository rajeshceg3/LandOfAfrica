import json
import re

def check_consistency():
    # Load GeoJSON
    with open('africa.geojson', 'r') as f:
        geojson = json.load(f)

    geojson_names = set()
    for feature in geojson['features']:
        if 'name' in feature['properties']:
            geojson_names.add(feature['properties']['name'])

    # Load country-data.js and extract keys
    with open('country-data.js', 'r') as f:
        data_js = f.read()

    # Extract keys from countryData object
    # Matches: "Key": {
    country_keys = set(re.findall(r'"([^"]+)":\s*{', data_js))

    print("GeoJSON Names Count:", len(geojson_names))
    print("CountryData Keys Count:", len(country_keys))

    missing_in_geojson = country_keys - geojson_names
    missing_in_countrydata = geojson_names - country_keys

    print("\nKeys in countryData but MISSING in GeoJSON (Features won't show):")
    for k in missing_in_geojson:
        print(f"- {k}")

    print("\nNames in GeoJSON but MISSING in countryData (Features won't hold data):")
    for k in missing_in_countrydata:
        print(f"- {k}")

if __name__ == "__main__":
    check_consistency()
