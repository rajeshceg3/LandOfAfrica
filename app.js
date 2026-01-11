document.body.classList.add('js-enabled');

// --- DATA and ASSETS ---
const imageUrl = 'https://images.unsplash.com/photo-1649299313612-48cc3493f62e?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bWFwJTIwb2YlMjBhZnJpY2F8ZW58MHx8MHx8fDA=';
const imageWidth = 800;
const imageHeight = 938;


const countryData = {
    "egypt": { "name": "Egypt", "description": "Home to the Pyramids of Giza, one of the Seven Wonders of the Ancient World.", "coords": [[162, 694], [162, 856], [320, 856], [320, 694]] },
    "libya": { "name": "Libya", "description": "Showcasing the majestic ruins of Leptis Magna, a prominent city of the Roman Empire.", "coords": [[217, 497], [217, 678], [372, 678], [372, 497]] },
    "algeria": { "name": "Algeria", "description": "The Martyrs' Memorial (Maqam Echahid) stands tall, commemorating the Algerian war for independence.", "coords": [[167, 260], [167, 452], [350, 452], [350, 260]] },
    "nigeria": { "name": "Nigeria", "description": "A grand mosque is depicted, representing the rich architectural heritage and cultural diversity of West Africa.", "coords": [[446, 314], [446, 477], [568, 477], [568, 314]] },
    "kenya": { "name": "Kenya", "description": "A sanctuary for wildlife, represented here by a rhinoceros. Kenya's national parks are crucial for conservation.", "coords": [[620, 810], [620, 915], [740, 915], [740, 810]] },
    "tanzania": { "name": "Tanzania", "description": "The 'King of the Savanna', the lion, is illustrated before Mount Kilimanjaro, capturing iconic Serengeti scenery.", "coords": [[716, 780], [716, 912], [840, 912], [840, 780]] },
    "south_africa": { "name": "South Africa", "description": "The African elephant stands near the King Protea, the national flower, symbolizing the nation's rich biodiversity.", "coords": [[1020, 560], [1020, 760], [1180, 760], [1180, 560]] },
    "namibia": { "name": "Namibia", "description": "A giraffe, the tallest land animal, roams the plains, evoking the vast landscapes of Etosha National Park.", "coords": [[910, 510], [910, 610], [1050, 610], [1050, 510]] },
    "madagascar": { "name": "Madagascar", "description": "The unique Avenue of the Baobabs showcases the island's extraordinary and distinct flora.", "coords": [[800, 955], [800, 1025], [1050, 1025], [1050, 955]] }
};

// --- MAP INITIALIZATION ---
// Using slightly darker background for the container
const map = L.map('map-container', { crs: L.CRS.Simple, zoomControl: false, attributionControl: false, minZoom: -1.5, maxZoom: 2 });
const bounds = [[0, 0], [imageHeight, imageWidth]];
L.imageOverlay(imageUrl, bounds).addTo(map);
map.fitBounds(bounds);

// --- INTERACTION LOGIC & STATE ---
const infoPanel = document.getElementById('info-panel');
const countryNameEl = document.getElementById('country-name');
const countryDescEl = document.getElementById('country-description');
const closePanelBtn = document.getElementById('close-panel');
let lastFocusedElement = null;
let polygonLayer;

initializeMap();

function initializeMap() {
    polygonLayer = L.geoJSON(null, {
        // Base style: invisible hit area but responsive
        style: () => ({
            fillColor: '#00d4ff', /* Matching CSS accent-color */
            weight: 1,
            color: '#00d4ff',
            opacity: 0,
            fillOpacity: 0,
            className: 'country-poly' // Hook for potential CSS transitions
        }),
        onEachFeature: (feature, layer) => {
            if (layer.getElement()) {
                 const element = layer.getElement();
                 element.setAttribute('tabindex', '0');
                 element.setAttribute('role', 'button');
                 element.setAttribute('aria-label', feature.properties.name);
                 // Add class for CSS styling if needed
                 element.classList.add('map-feature');
            } else {
                layer.on('add', () => {
                    const element = layer.getElement();
                    if (element) {
                        element.setAttribute('tabindex', '0');
                        element.setAttribute('role', 'button');
                        element.setAttribute('aria-label', feature.properties.name);
                        element.classList.add('map-feature');
                    }
                });
            }

            const openFeature = () => {
                lastFocusedElement = document.activeElement;
                showCountryInfo(feature.properties.id);
            };

            layer.on({
                mouseover: e => {
                    // Hover effect: More sophisticated glow
                    e.target.setStyle({
                        fillOpacity: 0.1, // Subtle fill
                        opacity: 0.9,     // Bright border
                        weight: 2
                    });

                    // Optional: Change cursor to indicate interactivity explicitly
                    document.getElementById('map-container').style.cursor = 'pointer';
                },
                mouseout: e => {
                    e.target.setStyle({
                        fillOpacity: 0,
                        opacity: 0,
                        weight: 1
                    });
                    document.getElementById('map-container').style.cursor = '';
                },
                click: e => { L.DomEvent.stopPropagation(e); openFeature(); },
                keydown: e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openFeature(); } }
            });
        }
    }).addTo(map);

    polygonLayer.addData(Object.keys(countryData).map(id => {
        const country = countryData[id];
        const geoJsonCoords = [country.coords.map(p => [p[1], p[0]])];
        geoJsonCoords[0].push(geoJsonCoords[0][0]);
        return { type: "Feature", properties: { id, name: country.name }, geometry: { type: "Polygon", coordinates: geoJsonCoords } };
    }));
}


function encodeHTML(str) {
    const temp = document.createElement('div');
    temp.textContent = str;
    return temp.innerHTML;
}

function showCountryInfo(id) {
    const country = countryData[id];
    if (!country) return;

    map.stop();

    countryNameEl.textContent = encodeHTML(country.name);
    countryDescEl.textContent = encodeHTML(country.description);

    infoPanel.classList.add('visible');
    infoPanel.setAttribute('aria-hidden', 'false');

    closePanelBtn.focus();

    const polygon = L.polygon(country.coords);
    // Cinematography: Slower, smoother camera movement
    map.flyToBounds(polygon.getBounds().pad(0.5), { // More padding for breathing room
        duration: 1.5, // Slower duration for elegance
        easeLinearity: 0.1 // More curve to the easing
    });
}

function hidePanel() {
    if (!infoPanel.classList.contains('visible')) return;
    infoPanel.classList.remove('visible');
    infoPanel.setAttribute('aria-hidden', 'true');

    if (lastFocusedElement) {
        lastFocusedElement.focus();
        lastFocusedElement = null;
    }

    // Return to full view with matching elegant ease
    map.flyToBounds(bounds, {
        duration: 1.5,
        easeLinearity: 0.1
    });
}

closePanelBtn.addEventListener('click', hidePanel);
map.on('click', hidePanel);

// Keyboard Trap for Accessibility (Best Practice)
infoPanel.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
        hidePanel();
    }

    if (e.key === 'Tab') {
        const focusableElements = infoPanel.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
            if (document.activeElement === firstElement) {
                lastElement.focus();
                e.preventDefault();
            }
        } else {
            if (document.activeElement === lastElement) {
                firstElement.focus();
                e.preventDefault();
            }
        }
    }
});
