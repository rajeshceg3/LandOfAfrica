document.body.classList.add('js-enabled');

// --- DATA and ASSETS ---
const countryData = {
    "Algeria": {
        "id": "algeria",
        "name": "Algeria",
        "description": "The largest country in Africa, featuring the Sahara Desert and ancient Roman ruins like Timgad."
    },
    "Angola": {
        "id": "angola",
        "name": "Angola",
        "description": "Known for its vast oil reserves and the spectacular Kalandula Falls."
    },
    "Benin": {
        "id": "benin",
        "name": "Benin",
        "description": "The birthplace of the Vodun (Voodoo) religion and home to the Royal Palaces of Abomey."
    },
    "Botswana": {
        "id": "botswana",
        "name": "Botswana",
        "description": "A premier safari destination, home to the Okavango Delta and large elephant populations."
    },
    "Burkina Faso": {
        "id": "burkina_faso",
        "name": "Burkina Faso",
        "description": "Known for its rich musical traditions and the annual FESPACO film festival."
    },
    "Burundi": {
        "id": "burundi",
        "name": "Burundi",
        "description": "A small nation with a big heart, known for its drumming traditions and Lake Tanganyika."
    },
    "Cameroon": {
        "id": "cameroon",
        "name": "Cameroon",
        "description": "Often called 'Africa in miniature' for its geological and cultural diversity."
    },
    "Cape Verde": {
        "id": "cape_verde",
        "name": "Cape Verde",
        "description": "An island nation known for its Creole Portuguese-African culture and Morna music."
    },
    "Central African Republic": {
        "id": "central_african_republic",
        "name": "Central African Republic",
        "description": "Rich in biodiversity, with vast rainforests and wildlife populations."
    },
    "Chad": {
        "id": "chad",
        "name": "Chad",
        "description": "Home to the Tibesti Mountains and Lake Chad, a vital water source for the region."
    },
    "Comoros": {
        "id": "comoros",
        "name": "Comoros",
        "description": "A volcanic archipelago known as the 'Perfume Islands' for its fragrant plant life."
    },
    "Congo": {
        "id": "congo",
        "name": "Congo",
        "description": "Home to the Odzala-Kokoua National Park and western lowland gorillas."
    },
    "Djibouti": {
        "id": "djibouti",
        "name": "Djibouti",
        "description": "Located at the Horn of Africa, known for its unique geological landscapes like Lake Assal."
    },
    "Egypt": {
        "id": "egypt",
        "name": "Egypt",
        "description": "Home to the Pyramids of Giza, one of the Seven Wonders of the Ancient World, and the Nile River."
    },
    "Equatorial Guinea": {
        "id": "equatorial_guinea",
        "name": "Equatorial Guinea",
        "description": "The only Spanish-speaking country in Africa, consisting of a mainland and islands."
    },
    "Eritrea": {
        "id": "eritrea",
        "name": "Eritrea",
        "description": "Known for its Italian colonial architecture in Asmara and Red Sea coastline."
    },
    "Ethiopia": {
        "id": "ethiopia",
        "name": "Ethiopia",
        "description": "The cradle of humanity, home to Lalibela's rock-hewn churches and the Simien Mountains."
    },
    "Gabon": {
        "id": "gabon",
        "name": "Gabon",
        "description": "A haven for nature lovers, with over 10% of its land protected as national parks."
    },
    "Gambia": {
        "id": "gambia",
        "name": "Gambia",
        "description": "The smallest country on mainland Africa, known for its diverse birdlife along the Gambia River."
    },
    "Ghana": {
        "id": "ghana",
        "name": "Ghana",
        "description": "Famous for its friendly people, historic slave castles, and vibrant Kente cloth."
    },
    "Guinea": {
        "id": "guinea",
        "name": "Guinea",
        "description": "Rich in minerals and the source of the Niger, Gambia, and Senegal rivers."
    },
    "Guinea-Bissau": {
        "id": "guinea_bissau",
        "name": "Guinea-Bissau",
        "description": "Known for the Bijag\u00f3s Archipelago, a UNESCO Biosphere Reserve."
    },
    "Ivory Coast": {
        "id": "ivory_coast",
        "name": "Ivory Coast",
        "description": "The world's largest producer of cocoa and home to the Basilica of Our Lady of Peace."
    },
    "Kenya": {
        "id": "kenya",
        "name": "Kenya",
        "description": "A top safari destination with the Maasai Mara and diverse landscapes from savannahs to mountains."
    },
    "Lesotho": {
        "id": "lesotho",
        "name": "Lesotho",
        "description": "The 'Kingdom in the Sky', the only country in the world entirely above 1,000m elevation."
    },
    "Liberia": {
        "id": "liberia",
        "name": "Liberia",
        "description": "Africa's oldest republic, founded by freed slaves from the United States."
    },
    "Libya": {
        "id": "libya",
        "name": "Libya",
        "description": "Home to the Sahara Desert and the spectacular Roman ruins of Leptis Magna."
    },
    "Madagascar": {
        "id": "madagascar",
        "name": "Madagascar",
        "description": "An island continent with unique wildlife like lemurs and the Avenue of the Baobabs."
    },
    "Malawi": {
        "id": "malawi",
        "name": "Malawi",
        "description": "Known as the 'Warm Heart of Africa', dominated by the massive Lake Malawi."
    },
    "Mali": {
        "id": "mali",
        "name": "Mali",
        "description": "Home to the historic city of Timbuktu and the Great Mosque of Djenne."
    },
    "Mauritania": {
        "id": "mauritania",
        "name": "Mauritania",
        "description": "Where the desert meets the ocean, home to the Banc d'Arguin National Park."
    },
    "Mauritius": {
        "id": "mauritius",
        "name": "Mauritius",
        "description": "A tropical paradise known for its beaches, lagoons, and reefs."
    },
    "Morocco": {
        "id": "morocco",
        "name": "Morocco",
        "description": "A land of medinas, souks, and the Atlas Mountains, blending Arab, Berber, and European influences."
    },
    "Mozambique": {
        "id": "mozambique",
        "name": "Mozambique",
        "description": "Known for its stunning coastline, coral reefs, and the Bazaruto Archipelago."
    },
    "Namibia": {
        "id": "namibia",
        "name": "Namibia",
        "description": "Home to the Namib Desert, the oldest in the world, and the wildlife of Etosha National Park."
    },
    "Niger": {
        "id": "niger",
        "name": "Niger",
        "description": "Named after the Niger River, featuring the Air Mountains and Tenere Desert."
    },
    "Nigeria": {
        "id": "nigeria",
        "name": "Nigeria",
        "description": "The most populous country in Africa, a cultural powerhouse known for Nollywood and Afrobeats."
    },
    "La Reunion": {
        "id": "la_reunion",
        "name": "La Reunion",
        "description": "A French overseas department known for its volcanic landscape and hiking trails."
    },
    "Rwanda": {
        "id": "rwanda",
        "name": "Rwanda",
        "description": "The 'Land of a Thousand Hills', famous for its mountain gorillas and clean capital, Kigali."
    },
    "Sao Tome and Principe": {
        "id": "sao_tome_and_principe",
        "name": "Sao Tome and Principe",
        "description": "An island nation known for its cocoa production and dramatic volcanic spires."
    },
    "Senegal": {
        "id": "senegal",
        "name": "Senegal",
        "description": "Known for its musical heritage, hospitality (Teranga), and the pink Lake Retba."
    },
    "Seychelles": {
        "id": "seychelles",
        "name": "Seychelles",
        "description": "An archipelago of 115 islands, home to giant tortoises and pristine beaches."
    },
    "Sierra Leone": {
        "id": "sierra_leone",
        "name": "Sierra Leone",
        "description": "Known for its white-sand beaches and the chimpanzee sanctuary at Tacugama."
    },
    "Somalia": {
        "id": "somalia",
        "name": "Somalia",
        "description": "Has the longest coastline on Africa's mainland and a rich oral poetic tradition."
    },
    "South Africa": {
        "id": "south_africa",
        "name": "South Africa",
        "description": "A 'Rainbow Nation' with diverse cultures, Table Mountain, and Kruger National Park."
    },
    "Sudan": {
        "id": "sudan",
        "name": "Sudan",
        "description": "Home to more pyramids than Egypt, remnants of the ancient Kingdom of Kush."
    },
    "South Sudan": {
        "id": "south_sudan",
        "name": "South Sudan",
        "description": "The world's youngest nation, home to the Sudd wetland and vast wildlife migrations."
    },
    "Swaziland": {
        "id": "swaziland",
        "name": "Swaziland",
        "description": "Now known as Eswatini, a kingdom known for its wilderness reserves and festivals."
    },
    "Tanzania": {
        "id": "tanzania",
        "name": "Tanzania",
        "description": "Home to Mount Kilimanjaro, the Serengeti migration, and the spice island of Zanzibar."
    },
    "Togo": {
        "id": "togo",
        "name": "Togo",
        "description": "Known for its palm-lined beaches and hilltop villages."
    },
    "Tunisia": {
        "id": "tunisia",
        "name": "Tunisia",
        "description": "Features the ruins of Carthage and the white-and-blue village of Sidi Bou Said."
    },
    "Uganda": {
        "id": "uganda",
        "name": "Uganda",
        "description": "Winston Churchill's 'Pearl of Africa', home to the source of the Nile and mountain gorillas."
    },
    "Western Sahara": {
        "id": "western_sahara",
        "name": "Western Sahara",
        "description": "A disputed territory with vast desert landscapes and a coastline on the Atlantic."
    },
    "DR Congo": {
        "id": "dr_congo",
        "name": "DR Congo",
        "description": "A vast country with immense biodiversity, including the Okapi Wildlife Reserve."
    },
    "Zambia": {
        "id": "zambia",
        "name": "Zambia",
        "description": "Home to the thundering Victoria Falls and walking safaris in South Luangwa."
    },
    "Zimbabwe": {
        "id": "zimbabwe",
        "name": "Zimbabwe",
        "description": "Known for Victoria Falls, Hwange National Park, and the Great Zimbabwe ruins."
    }
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
