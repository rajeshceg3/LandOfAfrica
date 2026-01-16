document.body.classList.add('js-enabled');

// --- DATA and ASSETS ---
const countryData = {
    "Egypt": { "id": "egypt", "name": "Egypt", "description": "Home to the Pyramids of Giza, one of the Seven Wonders of the Ancient World." },
    "Libya": { "id": "libya", "name": "Libya", "description": "Showcasing the majestic ruins of Leptis Magna, a prominent city of the Roman Empire." },
    "Algeria": { "id": "algeria", "name": "Algeria", "description": "The Martyrs' Memorial (Maqam Echahid) stands tall, commemorating the Algerian war for independence." },
    "Nigeria": { "id": "nigeria", "name": "Nigeria", "description": "A grand mosque is depicted, representing the rich architectural heritage and cultural diversity of West Africa." },
    "Kenya": { "id": "kenya", "name": "Kenya", "description": "A sanctuary for wildlife, represented here by a rhinoceros. Kenya's national parks are crucial for conservation." },
    "Tanzania": { "id": "tanzania", "name": "Tanzania", "description": "The 'King of the Savanna', the lion, is illustrated before Mount Kilimanjaro, capturing iconic Serengeti scenery." },
    "South Africa": { "id": "south_africa", "name": "South Africa", "description": "The African elephant stands near the King Protea, the national flower, symbolizing the nation's rich biodiversity." },
    "Namibia": { "id": "namibia", "name": "Namibia", "description": "A giraffe, the tallest land animal, roams the plains, evoking the vast landscapes of Etosha National Park." },
    "Madagascar": { "id": "madagascar", "name": "Madagascar", "description": "The unique Avenue of the Baobabs showcases the island's extraordinary and distinct flora." }
};

// --- MAP INITIALIZATION ---
// Center on Africa
const map = L.map('map-container', {
    zoomControl: false,
    attributionControl: false,
    minZoom: 2,
    maxZoom: 6,
    zoomSnap: 0.1,
    zoomDelta: 0.5,
    wheelPxPerZoomLevel: 120
}).setView([1.5, 17], 3.2);

// CartoDB Dark Matter Tiles
L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    subdomains: 'abcd',
    maxZoom: 20
}).addTo(map);

// --- INTERACTION LOGIC & STATE ---
const infoPanel = document.getElementById('info-panel');
const countryNameEl = document.getElementById('country-name');
const countryDescEl = document.getElementById('country-description');
const closePanelBtn = document.getElementById('close-panel');

let lastFocusedElement = null;
let geoJsonLayer;
let selectedFeatureName = null;

// Styles matching CSS variables
const defaultStyle = {
    fillColor: '#38bdf8', /* Sky 400 */
    weight: 0.5,
    color: '#38bdf8',
    opacity: 0.3,
    fillOpacity: 0.1, // Visible but subtle
    className: 'country-poly'
};

const hoverStyle = {
    fillOpacity: 0.2,
    opacity: 0.8,
    weight: 1.5,
    color: '#38bdf8'
};

const activeStyle = {
    fillOpacity: 0.3,
    opacity: 1,
    weight: 2.5,
    color: '#818cf8' /* Indigo 400 accent */
};

initializeMap();

function initializeMap() {
    fetch('africa.geojson')
        .then(response => response.json())
        .then(data => {
            // Filter features to only those in countryData
            const relevantFeatures = data.features.filter(feature =>
                countryData.hasOwnProperty(feature.properties.name)
            );

            geoJsonLayer = L.geoJSON(relevantFeatures, {
                style: () => defaultStyle,
                onEachFeature: (feature, layer) => {
                    const countryName = feature.properties.name;

                    // Accessibility Setup
                    const applyA11y = (l) => {
                        if (l.getElement) {
                             const element = l.getElement();
                             if (element) setupA11y(element, countryName);
                             else l.on('add', () => {
                                const el = l.getElement();
                                if (el) setupA11y(el, countryName);
                             });
                        }
                    };

                    if (layer.eachLayer) {
                        layer.eachLayer(applyA11y);
                    } else {
                        applyA11y(layer);
                    }

                    const openFeature = () => {
                        lastFocusedElement = document.activeElement;
                        showCountryInfo(countryName, layer);
                    };

                    layer.on({
                        mouseover: e => {
                            if (selectedFeatureName !== countryName) {
                                e.target.setStyle(hoverStyle);
                                document.getElementById('map-container').style.cursor = 'pointer';
                            }
                        },
                        mouseout: e => {
                            if (selectedFeatureName !== countryName) {
                                geoJsonLayer.resetStyle(e.target);
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
        })
        .catch(error => {
            console.error('Error loading GeoJSON:', error);
            document.getElementById('error-message').textContent = 'Failed to load map data.';
            document.getElementById('error-message').classList.remove('hidden');
        });
}

function setupA11y(element, name) {
    element.setAttribute('tabindex', '0');
    element.setAttribute('role', 'button');
    element.setAttribute('aria-label', `View info about ${name}`);
    element.classList.add('map-feature');
}

function encodeHTML(str) {
    const temp = document.createElement('div');
    temp.textContent = str;
    return temp.innerHTML;
}

function showCountryInfo(name, layer) {
    const country = countryData[name];
    if (!country) return;

    // Reset previous selection
    if (selectedFeatureName && selectedFeatureName !== name) {
        geoJsonLayer.eachLayer(l => {
            geoJsonLayer.resetStyle(l);
        });
    }

    selectedFeatureName = name;

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
        : { paddingBottomRight: [500, 0], paddingTopLeft: [100, 0] };

    // Cinematography: Slower, smoother camera movement
    map.flyToBounds(layer.getBounds(), {
        paddingTopLeft: paddingOptions.paddingTopLeft,
        paddingBottomRight: paddingOptions.paddingBottomRight,
        maxZoom: 6, // Don't zoom in *too* close, keep context
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
    selectedFeatureName = null;
    geoJsonLayer.eachLayer(l => geoJsonLayer.resetStyle(l));

    if (lastFocusedElement) {
        lastFocusedElement.focus();
        lastFocusedElement = null;
    }

    // Return to full view with matching elegant ease
    // Center on Africa roughly
    map.flyTo([1.5, 17], 3.2, {
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
const panelGlare = document.querySelector('.panel-glare');

document.addEventListener('mousemove', (e) => {
    if (window.innerWidth <= 768) return; // Desktop only
    if (!infoPanel.classList.contains('visible')) return;

    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;

    // Calculate rotation (range: -4deg to 4deg for subtlety)
    const rotateY = (x - 0.5) * 8;
    const rotateX = (0.5 - y) * 8;

    // Apply transform while maintaining the scale
    infoPanel.style.transform = `translate3d(0, 0, 0) scale(1) rotateY(${rotateY}deg) rotateX(${rotateX}deg)`;

    // Glare effect logic
    if (panelGlare) {
        // Calculate glare movement
        // We move the gradient background to simulate light reflection
        // The gradient is large, so we shift it across the panel
        const glareX = (x - 0.5) * 150;
        const glareY = (y - 0.5) * 150;

        panelGlare.style.transform = `translate(${glareX}%, ${glareY}%)`;
    }
});
