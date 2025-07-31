document.body.classList.add('js-enabled');

// --- DATA and ASSETS ---
const imageUrl = 'https://images.unsplash.com/photo-1649299313612-48cc3493f62e?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bWFwJTIwb2YlMjBhZnJpY2F8ZW58MHx8MHx8fDA=';
const imageWidth = 800;
const imageHeight = 938;


let countryData = {};

// --- MAP INITIALIZATION ---
const map = L.map('map-container', { crs: L.CRS.Simple, zoomControl: false, attributionControl: false, minZoom: -1.5, maxZoom: 2 });
const bounds = [[0, 0], [imageHeight, imageWidth]];
L.imageOverlay(imageUrl, bounds).addTo(map);
map.fitBounds(bounds);

// --- INTERACTION LOGIC & STATE ---
const infoPanel = document.getElementById('info-panel');
const countryNameEl = document.getElementById('country-name');
const countryDescEl = document.getElementById('country-description');
const closePanelBtn = document.getElementById('close-panel');
let lastFocusedElement = null; // [REMEDIATION VULN-004] Variable to store focus
let polygonLayer;

function initializeMap(data) {
    countryData = data;
    polygonLayer = L.geoJSON(null, {
        style: () => ({ fillColor: 'var(--highlight-color)', weight: 0, opacity: 1, fillOpacity: 0 }),
        onEachFeature: (feature, layer) => {
            const element = layer.getElement();
            // [REMEDIATION VULN-001, VULN-002] Make polygons accessible
            element.setAttribute('tabindex', '0');
            element.setAttribute('role', 'button');
            element.setAttribute('aria-label', feature.properties.name);

            const openFeature = () => {
                lastFocusedElement = document.activeElement; // [REMEDIATION VULN-004] Store focus before opening
                showCountryInfo(feature.properties.id);
            };

            layer.on({
                mouseover: e => e.target.setStyle({ fillOpacity: 0.3 }),
                mouseout: e => e.target.setStyle({ fillOpacity: 0 }),
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

fetch('country-data.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => initializeMap(data))
    .catch(error => {
        console.error('Error loading country data:', error);
        const errorMessage = document.getElementById('error-message');
        errorMessage.textContent = 'Could not load country data. Please try refreshing the page.';
        errorMessage.classList.remove('hidden');
    });

function encodeHTML(str) {
    const temp = document.createElement('div');
    temp.textContent = str;
    return temp.innerHTML;
}

function showCountryInfo(id) {
    const country = countryData[id];
    if (!country) return;

    // [REMEDIATION VULN-005] Stop any ongoing animation before starting a new one.
    map.stop();

    countryNameEl.textContent = encodeHTML(country.name);
    countryDescEl.textContent = encodeHTML(country.description);

    infoPanel.classList.add('visible');
    infoPanel.setAttribute('aria-hidden', 'false');

    // [REMEDIATION VULN-004] Move focus into the panel
    closePanelBtn.focus();

    const polygon = L.polygon(country.coords);
    map.flyToBounds(polygon.getBounds().pad(0.1), { duration: 1.2, easeLinearity: 0.1 });
}

function hidePanel() {
    if (!infoPanel.classList.contains('visible')) return; // Prevent multiple calls
    infoPanel.classList.remove('visible');
    infoPanel.setAttribute('aria-hidden', 'true');

    // [REMEDIATION VULN-004] Return focus to the element that opened the panel
    if (lastFocusedElement) {
        lastFocusedElement.focus();
        lastFocusedElement = null;
    }

    map.flyToBounds(bounds, { duration: 1.2, easeLinearity: 0.1 });
}

closePanelBtn.addEventListener('click', hidePanel);
map.on('click', hidePanel);

// [REMEDIATION VULN-004] Manage focus trapping and Escape key
infoPanel.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
        hidePanel();
    }

    if (e.key === 'Tab') {
        const focusableElements = infoPanel.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
            // if shift + tab
            if (document.activeElement === firstElement) {
                lastElement.focus();
                e.preventDefault();
            }
        } else {
            // if tab
            if (document.activeElement === lastElement) {
                firstElement.focus();
                e.preventDefault();
            }
        }
    }
});
