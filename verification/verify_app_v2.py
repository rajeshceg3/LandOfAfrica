from playwright.sync_api import sync_playwright
import time

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()

        # Log console messages
        page.on("console", lambda msg: print(f"BROWSER CONSOLE: {msg.text}"))
        page.on("pageerror", lambda err: print(f"BROWSER ERROR: {err}"))

        print("Navigating to app...")
        page.goto("http://localhost:8000")

        # Wait for the map to initialize and load GeoJSON layers
        # The country shapes are SVG paths with class 'leaflet-interactive'
        print("Waiting for map layers...")
        page.wait_for_selector("path.leaflet-interactive", state="visible", timeout=10000)

        # Take an initial screenshot
        page.screenshot(path="verification/initial_load.png")
        print("Initial load screenshot saved.")

        # Test Interaction: Click on a country
        # We can try to click a specific one if we know where it is, or just the first one.
        # Let's try to click the first interactive path (likely a country).
        print("Clicking a country...")
        page.click("path.leaflet-interactive >> nth=0")

        # Wait for the info panel to appear
        # The panel has class 'info-panel' and should become visible
        print("Waiting for info panel...")
        page.wait_for_selector(".info-panel.visible", state="visible", timeout=5000)

        # Allow time for animations (staggered entrance) to play
        time.sleep(1)

        # Take a screenshot of the active state
        page.screenshot(path="verification/active_state.png")
        print("Active state screenshot saved.")

        browser.close()
        print("Verification complete.")

if __name__ == "__main__":
    run()
