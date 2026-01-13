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
const map = L.map('map-container', {
    crs: L.CRS.Simple,
    zoomControl: false,
    attributionControl: false,
    minZoom: -1.5,
    maxZoom: 2,
    zoomSnap: 0.05, // Ultra-smooth zooming
    zoomDelta: 0.5,
    wheelPxPerZoomLevel: 120 // Slower scroll zoom
});

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
let selectedFeatureId = null;

// Styles matching CSS variables
const defaultStyle = {
    fillColor: '#38bdf8', /* Sky 400 */
    weight: 0, // Invisible until interacted
    color: '#38bdf8',
    opacity: 0,
    fillOpacity: 0,
    className: 'country-poly'
};

const hoverStyle = {
    fillOpacity: 0.1,
    opacity: 0.8,
    weight: 1.5,
    color: '#38bdf8'
};

const activeStyle = {
    fillOpacity: 0.2,
    opacity: 1,
    weight: 2.5,
    color: '#818cf8' /* Indigo 400 accent */
};

initializeMap();

function initializeMap() {
    polygonLayer = L.geoJSON(null, {
        style: () => defaultStyle,
        onEachFeature: (feature, layer) => {
            // Accessibility Setup
            if (layer.getElement()) {
                 const element = layer.getElement();
                 setupA11y(element, feature);
            } else {
                layer.on('add', () => {
                    const element = layer.getElement();
                    if (element) setupA11y(element, feature);
                });
            }

            const openFeature = () => {
                lastFocusedElement = document.activeElement;
                showCountryInfo(feature.properties.id, layer);
            };

            layer.on({
                mouseover: e => {
                    if (selectedFeatureId !== feature.properties.id) {
                        e.target.setStyle(hoverStyle);
                        document.getElementById('map-container').style.cursor = 'pointer';
                    }
                },
                mouseout: e => {
                    if (selectedFeatureId !== feature.properties.id) {
                        polygonLayer.resetStyle(e.target);
                        document.getElementById('map-container').style.cursor = '';
                    }
                },
                click: e => {
                    L.DomEvent.stopPropagation(e);
                    openFeature();
                },
                keydown: e => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        openFeature();
                    }
                }
            });
        }
    }).addTo(map);

    // Load Data
    polygonLayer.addData(Object.keys(countryData).map(id => {
        const country = countryData[id];
        // Swap coordinates for Leaflet [lat, lng] -> [y, x]
        const geoJsonCoords = [country.coords.map(p => [p[1], p[0]])];
        geoJsonCoords[0].push(geoJsonCoords[0][0]); // Close polygon
        return {
            type: "Feature",
            properties: { id, name: country.name },
            geometry: { type: "Polygon", coordinates: geoJsonCoords }
        };
    }));
}

function setupA11y(element, feature) {
    element.setAttribute('tabindex', '0');
    element.setAttribute('role', 'button');
    element.setAttribute('aria-label', `View info about ${feature.properties.name}`);
    element.classList.add('map-feature');
}

function encodeHTML(str) {
    const temp = document.createElement('div');
    temp.textContent = str;
    return temp.innerHTML;
}

function showCountryInfo(id, layer) {
    const country = countryData[id];
    if (!country) return;

    // Reset previous selection
    if (selectedFeatureId && selectedFeatureId !== id) {
        polygonLayer.eachLayer(l => {
            polygonLayer.resetStyle(l);
        });
    }

    selectedFeatureId = id;

    // Highlight current
    if (layer) {
        layer.setStyle(activeStyle);
        layer.bringToFront();
    }

    map.stop();

    countryNameEl.textContent = encodeHTML(country.name);
    countryDescEl.textContent = encodeHTML(country.description);

    infoPanel.classList.add('visible');
    infoPanel.setAttribute('aria-hidden', 'false');

    closePanelBtn.focus();

    // Smart Padding for Mobile vs Desktop
    const isMobile = window.innerWidth <= 768;

    // Desktop: Panel is on right (width ~400px incl margins) -> Pad Right
    // Mobile: Panel is on bottom (height ~40-50%) -> Pad Bottom
    const paddingOptions = isMobile
        ? { paddingBottomRight: [0, window.innerHeight * 0.45], paddingTopLeft: [0, 0] }
        : { paddingBottomRight: [500, 0], paddingTopLeft: [100, 0] }; // Added left padding for better centering

    const polygon = L.polygon(country.coords);

    // Cinematography: Slower, smoother camera movement
    map.flyToBounds(polygon.getBounds(), {
        paddingTopLeft: paddingOptions.paddingTopLeft,
        paddingBottomRight: paddingOptions.paddingBottomRight,
        maxZoom: 0.5, // Don't zoom in *too* close, keep context
        duration: 1.6, // Slower for elegance
        easeLinearity: 0.1 // More curve
    });
}

function hidePanel() {
    if (!infoPanel.classList.contains('visible')) return;
    infoPanel.classList.remove('visible');
    infoPanel.setAttribute('aria-hidden', 'true');

    // Reset tilt transform on close
    infoPanel.style.transform = '';

    // Reset selection state
    selectedFeatureId = null;
    polygonLayer.eachLayer(l => polygonLayer.resetStyle(l));

    if (lastFocusedElement) {
        lastFocusedElement.focus();
        lastFocusedElement = null;
    }

    // Return to full view with matching elegant ease
    map.flyToBounds(bounds, {
        duration: 1.8,
        easeLinearity: 0.1
    });
}

closePanelBtn.addEventListener('click', hidePanel);
map.on('click', hidePanel);

// Keyboard Trap for Accessibility
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

// --- DESKTOP PARALLAX TILT EFFECT ---
// Adds a subtle 3D tilt to the panel based on mouse position
document.addEventListener('mousemove', (e) => {
    if (window.innerWidth <= 768) return; // Desktop only
    if (!infoPanel.classList.contains('visible')) return;

    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;

    // Calculate rotation (range: -3deg to 3deg for subtlety)
    const rotateY = (x - 0.5) * 6;
    const rotateX = (0.5 - y) * 6;

    // Apply transform while maintaining the scale
    infoPanel.style.transform = `translate3d(0, 0, 0) scale(1) rotateY(${rotateY}deg) rotateX(${rotateX}deg)`;
});
