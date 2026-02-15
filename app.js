document.body.classList.add('js-enabled');

// --- DATA and ASSETS ---
// Data moved to country-data.js

// --- CONFETTI EFFECT ---
// Physics-Based Canvas Confetti
const canvas = document.getElementById('confetti-canvas');
let ctx = canvas ? canvas.getContext('2d') : null;

function resizeCanvas() {
    if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
}
function debounce(func, wait) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}
window.addEventListener('resize', debounce(resizeCanvas, 200));
resizeCanvas();

let particles = [];
let animationFrameId = null;

function fireConfetti() {
    if (!canvas) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const count = 150;
    const colors = ['#f43f5e', '#fb7185', '#8b5cf6', '#a78bfa', '#2dd4bf', '#fbbf24'];

    for (let i = 0; i < count; i++) {
        const x = window.innerWidth / 2;
        const y = window.innerHeight / 2;

        // Random spread angle
        const angle = Math.random() * Math.PI * 2;
        const velocity = Math.random() * 15 + 5;

        particles.push({
            x: x,
            y: y,
            vx: Math.cos(angle) * velocity,
            vy: Math.sin(angle) * velocity - 2, // Slight upward bias
            size: Math.random() * 8 + 4,
            color: colors[Math.floor(Math.random() * colors.length)],
            life: 1,
            decay: 0.005 + Math.random() * 0.015,
            gravity: 0.4,
            rotation: Math.random() * 360,
            rotationSpeed: (Math.random() - 0.5) * 10,
            shape: Math.random() > 0.5 ? 'circle' : 'rect' // Varied shapes
        });
    }

    if (!animationFrameId) {
        updateConfetti();
    }
}

function updateConfetti() {
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = particles.length - 1; i >= 0; i--) {
        let p = particles[i];

        // Physics
        p.x += p.vx;
        p.y += p.vy;
        p.vy += p.gravity;

        // Friction / Drag
        p.vx *= 0.96;
        p.vy *= 0.96;

        p.rotation += p.rotationSpeed;
        p.life -= p.decay;

        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(0, p.life);

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation * Math.PI / 180);

        if (p.shape === 'circle') {
            ctx.beginPath();
            ctx.arc(0, 0, p.size, 0, Math.PI * 2);
            ctx.fill();
        } else {
            ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
        }

        ctx.restore();

        if (p.life <= 0) {
            particles.splice(i, 1);
        }
    }

    if (particles.length > 0) {
        animationFrameId = requestAnimationFrame(updateConfetti);
    } else {
        animationFrameId = null;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
}

// --- MOUSE TRAIL EFFECT ---
class MouseTrail {
    constructor() {
        this.colors = ['#f43f5e', '#fb7185', '#8b5cf6', '#a78bfa', '#2dd4bf'];
        this.pool = [];
        this.maxParticles = 25;
        this.pointer = 0;
        this.lastX = 0;
        this.lastY = 0;

        // Initialize Object Pool
        for (let i = 0; i < this.maxParticles; i++) {
            const p = document.createElement('div');
            p.style.position = 'fixed';
            p.style.borderRadius = '50%';
            p.style.pointerEvents = 'none';
            p.style.zIndex = '9999';
            p.style.opacity = '0'; // Hidden by default
            document.body.appendChild(p);
            this.pool.push(p);
        }
    }

    update(x, y) {
        // Distance check
        const dist = Math.hypot(x - this.lastX, y - this.lastY);
        if (dist < 25) return;

        this.lastX = x;
        this.lastY = y;

        this.activateParticle(x, y);
    }

    activateParticle(x, y) {
        const particle = this.pool[this.pointer];
        this.pointer = (this.pointer + 1) % this.maxParticles;

        const size = Math.random() * 6 + 2;

        // Reset State
        particle.style.transition = 'none';
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.transform = 'translate(-50%, -50%) scale(1)';
        particle.style.opacity = '0.6';
        particle.style.background = this.colors[Math.floor(Math.random() * this.colors.length)];
        particle.style.boxShadow = `0 0 6px ${particle.style.background}`;

        // Force reflow
        void particle.offsetWidth;

        // Animate out
        particle.style.transition = 'transform 0.6s cubic-bezier(0, 0, 0.2, 1), opacity 0.6s ease';

        const destX = (Math.random() - 0.5) * 30;
        const destY = (Math.random() - 0.5) * 30;

        particle.style.transform = `translate(calc(-50% + ${destX}px), calc(-50% + ${destY}px)) scale(0)`;
        particle.style.opacity = '0';
    }
}

const mouseTrail = new MouseTrail();

// --- CURSOR TOOLTIP LOGIC ---
const cursorTooltip = document.getElementById('cursor-tooltip');
function updateCursorTooltip(x, y) {
    if (cursorTooltip) {
        cursorTooltip.style.left = x + 'px';
        cursorTooltip.style.top = y + 'px';
    }
}

// --- MAP INITIALIZATION ---
// Center on Africa
const map = L.map('map-container', {
    zoomControl: false,
    attributionControl: false,
    minZoom: 2,
    maxZoom: 6,
    maxBounds: [[-40, -30], [45, 65]],
    zoomSnap: 0.1,
    zoomDelta: 0.5,
    wheelPxPerZoomLevel: 120
}).setView([1.5, 17], 3.2);

// CartoDB Positron (Light) Tiles
L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    subdomains: 'abcd',
    maxZoom: 20
}).addTo(map);

// --- INTERACTION LOGIC & STATE ---
const infoPanel = document.getElementById('info-panel');
const attractionModal = infoPanel.querySelector('.attraction-modal');
const closePanelBtn = document.getElementById('close-panel');
const mobileHandle = infoPanel.querySelector('.mobile-handle');

if (mobileHandle) {
    mobileHandle.addEventListener('click', hidePanel);

    // Swipe down to close
    let touchStartY = 0;

    mobileHandle.addEventListener('touchstart', (e) => {
        touchStartY = e.changedTouches[0].screenY;
    }, { passive: true });

    mobileHandle.addEventListener('touchend', (e) => {
        const touchEndY = e.changedTouches[0].screenY;
        if (touchEndY - touchStartY > 50) { // Swipe down > 50px
            hidePanel();
        }
    }, { passive: true });
}

let lastFocusedElement = null;
let geoJsonLayer;
let selectedFeatureName = null;

// Styles matching CSS variables (Pastel Theme)
const defaultStyle = {
    fillColor: '#94a3b8', // Slate 400 - Neutral default
    weight: 1,
    color: '#cbd5e1', // Slate 300
    opacity: 0.6,
    fillOpacity: 0.2, // Light but visible
    className: 'country-poly'
};

const hoverStyle = {
    fillOpacity: 0.4,
    opacity: 1,
    weight: 2,
    color: '#f43f5e', // Rose 500
    fillColor: '#fda4af' // Rose 300
};

const activeStyle = {
    fillOpacity: 0.7,
    opacity: 1,
    weight: 3,
    color: '#f43f5e', // Rose 500
    fillColor: '#f43f5e'
};

const dimmedStyle = {
    fillColor: '#cbd5e1',
    weight: 0.5,
    color: '#e2e8f0',
    opacity: 0.4,
    fillOpacity: 0.05, // Ghostly
    className: 'country-poly dimmed'
};

function showOnboarding() {
    if (!geoJsonLayer) return;

    // Pick a random country to pulse
    const layers = [];
    geoJsonLayer.eachLayer(layer => layers.push(layer));
    if (layers.length > 0) {
        const randomLayer = layers[Math.floor(Math.random() * layers.length)];
        let path = null;
        if (randomLayer.getElement) {
            path = randomLayer.getElement();
        } else if (randomLayer.getLayers && randomLayer.getLayers().length > 0) {
             // For MultiPolygons, target the first part
             const parts = randomLayer.getLayers();
             if (parts[0].getElement) path = parts[0].getElement();
        }

        if (path) {
            path.classList.add('pulse-animation');

            // Create Toast
            const toast = document.createElement('div');
            toast.className = 'toast-notification';
            toast.setAttribute('role', 'status');
            toast.setAttribute('aria-live', 'polite');
            toast.innerHTML = '<span>👆</span> Tap a country to explore!';
            document.body.appendChild(toast);

            // Dismiss on interaction
            const dismiss = () => {
                path.classList.remove('pulse-animation');
                toast.classList.add('fade-out');
                setTimeout(() => toast.remove(), 600);
                map.off('click', dismiss);
                map.off('movestart', dismiss);
                if (document.getElementById('country-search')) {
                    document.getElementById('country-search').removeEventListener('focus', dismiss);
                }
            };

            map.on('click', dismiss);
            map.on('movestart', dismiss);
            const searchInput = document.getElementById('country-search');
            if (searchInput) searchInput.addEventListener('focus', dismiss);
        }
    }
}

initializeMap();

function initializeMap() {
    fetch('africa.geojson')
        .then(response => response.json())
        .then(data => {
            // Filter features to only those in countryData
            const relevantFeatures = data.features.filter(feature =>
                countryData.hasOwnProperty(feature.properties.name)
            );

            // Data Consistency Check
            const foundNames = new Set(relevantFeatures.map(f => f.properties.name));
            Object.keys(countryData).forEach(key => {
                if (!foundNames.has(key)) {
                    console.warn(`[Data Warning] Country "${key}" defined in countryData but not found in GeoJSON features.`);
                }
            });

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
                            const tooltip = document.getElementById('cursor-tooltip');
                            if (tooltip) {
                                tooltip.textContent = countryName;
                                tooltip.classList.remove('hidden');
                            }
                            if (selectedFeatureName !== countryName) {
                                layer.setStyle(hoverStyle);
                                document.getElementById('map-container').style.cursor = 'none'; // Hide default cursor
                            }
                        },
                        mouseout: e => {
                            const tooltip = document.getElementById('cursor-tooltip');
                            if (tooltip) {
                                tooltip.classList.add('hidden');
                            }
                            if (selectedFeatureName !== countryName) {
                                geoJsonLayer.resetStyle(layer);
                                document.getElementById('map-container').style.cursor = '';
                            }
                        },
                        click: e => {
                            L.DomEvent.stopPropagation(e);
                            if (typeof isQuizActive !== 'undefined' && isQuizActive) {
                                handleQuizAttempt(countryName, layer);
                            } else {
                                openFeature();
                            }
                        },
                        keydown: e => {
                            const key = e.originalEvent ? e.originalEvent.key : e.key;
                            if (key === 'Enter' || key === ' ') {
                                e.preventDefault();
                                if (typeof isQuizActive !== 'undefined' && isQuizActive) {
                                    handleQuizAttempt(countryName, layer);
                                } else {
                                    openFeature();
                                }
                            }
                        }
                    });
                }
            }).addTo(map);

            // Enable interactions now that data is ready
            document.getElementById('country-search').removeAttribute('disabled');
            const randomBtn = document.getElementById('random-country');
            if (randomBtn) randomBtn.removeAttribute('disabled');
            const startQuizBtn = document.getElementById('start-quiz');
            if (startQuizBtn) startQuizBtn.removeAttribute('disabled');

            showOnboarding();

            // Hide Loader
            const loader = document.getElementById('loader');
            if (loader) {
                loader.classList.add('fade-out');
                setTimeout(() => loader.remove(), 500);
            }
        })
        .catch(error => {
            console.error('Error loading GeoJSON:', error);
            const errorMsg = document.getElementById('error-message');
            errorMsg.innerHTML = `
                <p>Failed to load map data.</p>
                <button id="retry-btn" style="margin-top: 10px; padding: 8px 16px; cursor: pointer; border-radius: 4px; border: none; background: #fb7185; color: white; font-weight: bold;">Retry</button>
            `;
            errorMsg.classList.remove('hidden');

            document.getElementById('retry-btn').addEventListener('click', () => {
                errorMsg.classList.add('hidden');
                // Recreate loader if it was removed
                let loader = document.getElementById('loader');
                if (!loader) {
                     loader = document.createElement('div');
                     loader.id = 'loader';
                     loader.innerHTML = '<div class="spinner"></div>';
                     document.body.appendChild(loader);
                }
                loader.classList.remove('fade-out');

                initializeMap();
            });

            // Hide Loader even on error so user sees message
            const loader = document.getElementById('loader');
            if (loader) loader.classList.add('fade-out');
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

    selectedFeatureName = name;

    // Spotlight Effect: Dim others, highlight current
    if (geoJsonLayer) {
        geoJsonLayer.eachLayer(l => {
            const isSelected = l.feature.properties.name === name;
            l.setStyle(isSelected ? activeStyle : dimmedStyle);

            if (isSelected && l.bringToFront) {
                l.bringToFront();
            }

            const applyEffect = (layer, active) => {
                if (layer.getElement) {
                    const el = layer.getElement();
                    if (el) {
                        if (active) el.classList.add('map-feature-lifted');
                        else el.classList.remove('map-feature-lifted');
                    }
                } else if (layer.eachLayer) {
                    layer.eachLayer(child => applyEffect(child, active));
                }
            };

            applyEffect(l, isSelected);
        });
    }

    // Trigger Confetti
    fireConfetti();

    const panelContent = infoPanel.querySelector('.panel-content');

    const html = `
        <div class="anim-stagger-1">
            <h2 class="greeting-text">"${encodeHTML(country.greeting || 'Hello')}"</h2>
            <h2 id="country-name">
                <img src="https://unpkg.com/flag-icons/country-4x3/${country.iso}.svg" class="country-flag" alt="${encodeHTML(country.name)} Flag">
                ${encodeHTML(country.name || 'Unknown Country')}
            </h2>
        </div>

        <div class="anim-stagger-2 cultural-highlights">
             <div class="cultural-badges">
                <span class="culture-badge" title="National Dish">🍲 ${encodeHTML(country.dish || 'Local Cuisine')}</span>
                <span class="culture-badge" title="Famous Landmark">🏛️ ${encodeHTML(country.landmark || 'Historic Sites')}</span>
                <span class="culture-badge" title="National Animal">🐾 ${encodeHTML(country.animal || 'Local Wildlife')}</span>
                <span class="culture-badge" title="Climate">☀️ ${encodeHTML(country.climate || 'Diverse')}</span>
            </div>
        </div>

        <div class="anim-stagger-3 country-stats">
            <div class="stat-item">
                <span class="stat-label">Capital</span>
                <span class="stat-value">${encodeHTML(country.capital || 'N/A')}</span>
            </div>
            <div class="stat-item">
                <span class="stat-label">Population</span>
                <span class="stat-value">${encodeHTML(country.population || 'N/A')}</span>
            </div>
            <div class="stat-item">
                <span class="stat-label">Currency</span>
                <span class="stat-value">${encodeHTML(country.currency || 'N/A')}</span>
            </div>
            <div class="stat-item">
                <span class="stat-label">Languages</span>
                <span class="stat-value">${encodeHTML(country.languages || 'N/A')}</span>
            </div>
            <div class="stat-item">
                <span class="stat-label">GDP</span>
                <span class="stat-value">${encodeHTML(country.gdp || 'N/A')}</span>
            </div>
            <div class="stat-item">
                <span class="stat-label">Area</span>
                <span class="stat-value">${encodeHTML(country.area || 'N/A')}</span>
            </div>
        </div>

        <div class="anim-stagger-4">
            <p class="country-description">${encodeHTML(country.description || 'No description available.')}</p>
        </div>

        <div class="anim-stagger-5 fun-fact">
            <span class="fact-icon">💡</span>
            <p>${encodeHTML(country.fact || 'Did you know? Africa is amazing!')}</p>
        </div>

        <div class="anim-stagger-5 panel-nav">
             <button class="nav-btn prev" aria-label="Previous Country">
                <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" /></svg>
             </button>
             <button class="nav-btn next" aria-label="Next Country">
                <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /></svg>
             </button>
        </div>
    `;

    panelContent.innerHTML = html;

    // Bind Navigation
    const prevBtn = panelContent.querySelector('.nav-btn.prev');
    const nextBtn = panelContent.querySelector('.nav-btn.next');
    if (prevBtn) prevBtn.addEventListener('click', () => navigateCountry(-1));
    if (nextBtn) nextBtn.addEventListener('click', () => navigateCountry(1));

    infoPanel.classList.add('visible');
    infoPanel.setAttribute('aria-hidden', 'false');
    attractionModal.classList.add('visible');

    closePanelBtn.focus();

    // Smart Padding for Mobile vs Desktop
    const isMobile = window.innerWidth <= 768;
    const paddingOptions = isMobile
        ? { paddingBottomRight: [0, window.innerHeight * 0.45], paddingTopLeft: [0, 0] }
        : { paddingBottomRight: [500, 0], paddingTopLeft: [100, 0] };

    map.flyToBounds(layer.getBounds(), {
        paddingTopLeft: paddingOptions.paddingTopLeft,
        paddingBottomRight: paddingOptions.paddingBottomRight,
        maxZoom: 6,
        duration: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 1.6,
        easeLinearity: 0.1
    });
}

function hidePanel() {
    if (!infoPanel.classList.contains('visible')) return;

    attractionModal.classList.remove('visible');

    setTimeout(() => {
        infoPanel.classList.remove('visible');
        infoPanel.setAttribute('aria-hidden', 'true');
        infoPanel.style.transform = ''; // Reset tilt
    }, 300);

    selectedFeatureName = null;
    if (geoJsonLayer) {
        geoJsonLayer.eachLayer(l => geoJsonLayer.resetStyle(l));
    }

    if (lastFocusedElement) {
        if (document.body.contains(lastFocusedElement) && lastFocusedElement.offsetParent !== null) {
            lastFocusedElement.focus();
        } else {
            const fallback = document.getElementById('country-search');
            if (fallback) fallback.focus();
        }
        lastFocusedElement = null;
    }

    map.flyTo([1.5, 17], 3.2, {
        duration: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 1.8,
        easeLinearity: 0.1
    });
}

closePanelBtn.addEventListener('click', hidePanel);
map.on('click', hidePanel);

// Keyboard Trap
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
const panelGlare = document.querySelector('.panel-glare');

function updatePanelGlare(x, y) {
    if (window.innerWidth <= 768) return;
    if (!infoPanel.classList.contains('visible')) return;

    const normX = x / window.innerWidth;
    const normY = y / window.innerHeight;

    const rotateY = (normX - 0.5) * 8;
    const rotateX = (0.5 - normY) * 8;

    infoPanel.style.transform = `translate3d(0, 0, 0) scale(1) rotateY(${rotateY}deg) rotateX(${rotateX}deg)`;

    if (panelGlare) {
        const glareX = (normX - 0.5) * 150;
        const glareY = (normY - 0.5) * 150;
        panelGlare.style.transform = `translate(${glareX}%, ${glareY}%)`;
    }
}

// --- GLOBAL EVENT CONTROLLER ---
let isTicking = false;

document.addEventListener('mousemove', (e) => {
    if (!isTicking) {
        window.requestAnimationFrame(() => {
            const x = e.clientX;
            const y = e.clientY;

            if (mouseTrail) mouseTrail.update(x, y);
            updateCursorTooltip(x, y);
            updatePanelGlare(x, y);

            isTicking = false;
        });
        isTicking = true;
    }
});

// --- SEARCH LOGIC ---
const searchInput = document.getElementById('country-search');
const searchResults = document.getElementById('search-results');
const resetViewBtn = document.getElementById('reset-view');

let currentFocus = -1;

const normalize = (str) => str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

searchInput.addEventListener('input', (e) => {
    const query = normalize(e.target.value);
    searchResults.innerHTML = '';
    currentFocus = -1;

    if (query.length < 2) {
        searchResults.classList.add('hidden');
        searchInput.setAttribute('aria-expanded', 'false');
        return;
    }

    const matches = Object.entries(countryData).filter(([key, country]) =>
        normalize(country.name).includes(query)
    );

    if (matches.length > 0) {
        matches.forEach(([key, country], index) => {
            const li = document.createElement('li');
            li.textContent = country.name;
            li.setAttribute('role', 'option');
            li.id = `search-result-${index}`;
            li.dataset.key = key;

            li.addEventListener('click', () => {
                if (!geoJsonLayer) return;
                let targetLayer;
                geoJsonLayer.eachLayer(layer => {
                    if (layer.feature.properties.name === key) {
                        targetLayer = layer;
                    }
                });

                if (targetLayer) {
                    lastFocusedElement = searchInput;
                    showCountryInfo(key, targetLayer);
                    searchInput.value = '';
                    searchResults.classList.add('hidden');
                    searchInput.setAttribute('aria-expanded', 'false');
                }
            });
            searchResults.appendChild(li);
        });
        searchResults.classList.remove('hidden');
        searchInput.setAttribute('aria-expanded', 'true');
    } else {
        const li = document.createElement('li');
        li.textContent = "No matches found";
        li.style.color = "var(--text-tertiary)";
        li.style.cursor = "default";
        li.style.pointerEvents = "none";
        searchResults.appendChild(li);

        searchResults.classList.remove('hidden');
        searchInput.setAttribute('aria-expanded', 'true');
    }
});

// Accessibility: Keyboard Navigation
searchInput.addEventListener('keydown', function(e) {
    let items = searchResults.querySelectorAll('li:not([style*="pointer-events: none"])');
    if (!items.length) return;

    if (e.key === 'ArrowDown') {
        currentFocus++;
        addActive(items);
        e.preventDefault();
    } else if (e.key === 'ArrowUp') {
        currentFocus--;
        addActive(items);
        e.preventDefault();
    } else if (e.key === 'Enter') {
        e.preventDefault();
        if (currentFocus > -1) {
            if (items[currentFocus]) items[currentFocus].click();
        }
    } else if (e.key === 'Escape') {
        searchResults.classList.add('hidden');
        searchInput.setAttribute('aria-expanded', 'false');
    }
});

function addActive(items) {
    if (!items) return false;
    removeActive(items);
    if (currentFocus >= items.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = (items.length - 1);

    items[currentFocus].classList.add('active');
    items[currentFocus].setAttribute('aria-selected', 'true');
    searchInput.setAttribute('aria-activedescendant', items[currentFocus].id);

    items[currentFocus].scrollIntoView({ block: 'nearest' });
}

function removeActive(items) {
    for (let i = 0; i < items.length; i++) {
        items[i].classList.remove('active');
        items[i].removeAttribute('aria-selected');
    }
    searchInput.removeAttribute('aria-activedescendant');
}

document.addEventListener('click', (e) => {
    if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
        searchResults.classList.add('hidden');
        searchInput.setAttribute('aria-expanded', 'false');
    }
});

resetViewBtn.addEventListener('click', () => {
    hidePanel();
    searchInput.value = '';
    map.flyTo([1.5, 17], 3.2, {
        duration: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 1.8,
        easeLinearity: 0.1
    });
});

// --- RANDOM DISCOVERY ---
const randomBtn = document.getElementById('random-country');

if (randomBtn) {
    randomBtn.addEventListener('click', () => {
        const keys = Object.keys(countryData);
        if (keys.length === 0) return;
        const randomKey = keys[Math.floor(Math.random() * keys.length)];
        let targetLayer;
        if (geoJsonLayer) {
            geoJsonLayer.eachLayer(layer => {
                if (layer.feature.properties.name === randomKey) {
                    targetLayer = layer;
                }
            });
        }
        if (targetLayer) {
            showCountryInfo(randomKey, targetLayer);
            searchInput.value = '';
            searchResults.classList.add('hidden');
        }
    });
}

function navigateCountry(direction) {
    if (!selectedFeatureName) return;

    const keys = Object.keys(countryData).sort(); // Ensure consistent order
    const currentIndex = keys.indexOf(selectedFeatureName);

    if (currentIndex === -1) return;

    let newIndex = currentIndex + direction;
    if (newIndex < 0) newIndex = keys.length - 1;
    if (newIndex >= keys.length) newIndex = 0;

    const newKey = keys[newIndex];
    let targetLayer;

    if (geoJsonLayer) {
        geoJsonLayer.eachLayer(layer => {
            if (layer.feature.properties.name === newKey) {
                targetLayer = layer;
            }
        });
    }

    if (targetLayer) {
        showCountryInfo(newKey, targetLayer);
    }
}

// --- QUIZ LOGIC ---
let isQuizActive = false;
let quizScore = 0;
let quizTarget = null;
let quizPreviousView = null;
let isQuizProcessing = false;

const quizUI = document.getElementById('quiz-ui');
const quizScoreVal = document.getElementById('quiz-score-val');
const quizTargetEl = document.getElementById('quiz-target');
const quizFeedback = document.getElementById('quiz-feedback');
const startQuizBtn = document.getElementById('start-quiz');
const stopQuizBtn = document.getElementById('stop-quiz');

if (startQuizBtn) {
    startQuizBtn.addEventListener('click', startQuiz);
}

if (stopQuizBtn) {
    stopQuizBtn.addEventListener('click', stopQuiz);
}

function startQuiz() {
    isQuizActive = true;
    quizScore = 0;
    updateScore();

    // Store current view to restore later
    quizPreviousView = {
        center: map.getCenter(),
        zoom: map.getZoom()
    };

    // UI Updates
    hidePanel(); // Close info panel if open
    document.querySelector('.search-wrapper').classList.add('hidden'); // Hide search
    quizUI.classList.remove('hidden');
    quizUI.setAttribute('tabindex', '-1');
    quizUI.focus();

    // Zoom out to see whole continent
    map.flyTo([1.5, 17], 3.2, { duration: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 1.5 });

    nextQuestion();
}

function stopQuiz() {
    isQuizActive = false;
    quizUI.classList.add('hidden');
    document.querySelector('.search-wrapper').classList.remove('hidden');

    // Reset Map Styles
    if (geoJsonLayer) {
        geoJsonLayer.eachLayer(l => geoJsonLayer.resetStyle(l));
    }

    // Restore view
    if (quizPreviousView) {
        map.flyTo(quizPreviousView.center, quizPreviousView.zoom, { duration: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 1.5 });
        quizPreviousView = null;
    } else {
        map.flyTo([1.5, 17], 3.2, { duration: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 1.5 });
    }

    // Restore focus
    if (startQuizBtn && !startQuizBtn.disabled) {
        startQuizBtn.focus();
    }
}

function nextQuestion() {
    const keys = Object.keys(countryData);
    const randomKey = keys[Math.floor(Math.random() * keys.length)];
    quizTarget = randomKey;

    quizTargetEl.textContent = countryData[randomKey].name;
    quizFeedback.classList.add('hidden');
    quizFeedback.className = 'quiz-feedback hidden'; // Reset classes
}

function updateScore() {
    if (quizScoreVal) quizScoreVal.textContent = quizScore;
}

function handleQuizAttempt(name, layer) {
    if (isQuizProcessing) return;
    isQuizProcessing = true;

    if (name === quizTarget) {
        // Correct
        quizScore++;
        updateScore();

        // Large Overlay Feedback
        const overlay = document.createElement('div');
        overlay.id = 'quiz-overlay';
        overlay.innerHTML = '<div class="quiz-msg">CORRECT! 🎉</div>';
        document.body.appendChild(overlay);
        setTimeout(() => overlay.remove(), 1500);

        quizFeedback.textContent = "Correct! 🎉";
        quizFeedback.className = 'quiz-feedback success';
        quizFeedback.classList.remove('hidden');

        // Visuals
        fireConfetti();
        layer.setStyle({ fillColor: '#10b981', fillOpacity: 0.8, color: '#059669' }); // Green
        layer.bringToFront();

        setTimeout(() => {
            geoJsonLayer.resetStyle(layer);
            nextQuestion();
            isQuizProcessing = false;
        }, 1500);

    } else {
        // Wrong
        quizFeedback.textContent = "Try Again! 😅";
        quizFeedback.className = 'quiz-feedback error';
        quizFeedback.classList.remove('hidden');

        // Shake Map
        const mapContainer = document.getElementById('map-container');
        mapContainer.classList.add('shake');
        setTimeout(() => mapContainer.classList.remove('shake'), 500);

        // Overlay Feedback
        const overlay = document.createElement('div');
        overlay.id = 'quiz-overlay';
        overlay.innerHTML = '<div class="quiz-msg" style="color: #ef4444;">TRY AGAIN! 😅</div>';
        document.body.appendChild(overlay);
        setTimeout(() => overlay.remove(), 1000);

        layer.setStyle({ fillColor: '#ef4444', fillOpacity: 0.6 }); // Red
        layer.bringToFront();

        setTimeout(() => {
            geoJsonLayer.resetStyle(layer);
            isQuizProcessing = false;
        }, 500);
    }
}

// Handle image errors globally (CSP compliant)
document.addEventListener('error', function(e) {
    if (e.target.tagName === 'IMG' && e.target.classList.contains('country-flag')) {
        e.target.style.display = 'none';
    }
}, true);
