import threading
import http.server
import socketserver
import os
from playwright.sync_api import sync_playwright

# Start a simple HTTP server in a separate thread
PORT = 8000
Handler = http.server.SimpleHTTPRequestHandler

def start_server():
    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        print(f"Serving at port {PORT}")
        httpd.serve_forever()

server_thread = threading.Thread(target=start_server, daemon=True)
server_thread.start()

def run_verification():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(viewport={'width': 1280, 'height': 800})
        page = context.new_page()

        print("Navigating to app...")
        page.goto(f"http://localhost:{PORT}/index.html")

        # Wait for map to load (Leaflet adds .leaflet-container)
        page.wait_for_selector(".leaflet-container")
        print("Map loaded.")

        # Take a screenshot of the initial state (should be Light Mode)
        page.screenshot(path="verification/initial_state.png")
        print("Captured initial_state.png")

        # Interact: Search for "Kenya"
        print("Searching for Kenya...")
        page.fill("#country-search", "Kenya")
        page.wait_for_selector(".search-results li")

        # Click the result
        page.click(".search-results li")
        print("Clicked Kenya.")

        # Wait for Info Panel
        page.wait_for_selector("#info-panel.visible")
        # Wait for animation
        page.wait_for_timeout(1000)

        # Check for confetti canvas
        canvas = page.query_selector("#confetti-canvas")
        if canvas:
            print("Confetti canvas found.")
        else:
            print("ERROR: Confetti canvas NOT found.")

        # Take a screenshot of the info panel with confetti
        page.screenshot(path="verification/kenya_info.png")
        print("Captured kenya_info.png")

        browser.close()

if __name__ == "__main__":
    run_verification()
