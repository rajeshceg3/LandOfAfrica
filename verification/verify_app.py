from playwright.sync_api import sync_playwright
import time
import os

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        # Create a context with desktop viewport
        context = browser.new_context(viewport={'width': 1280, 'height': 800})
        page = context.new_page()

        try:
            print("Navigating to app...")
            page.goto("http://localhost:8000")

            # Wait for map to initialize (Leaflet adds classes)
            print("Waiting for map...")
            page.wait_for_selector("path.leaflet-interactive", state="visible", timeout=10000)

            # Allow some time for tiles and geojson to load
            time.sleep(2)

            # Test Search
            print("Testing search...")
            search_input = page.get_by_placeholder("Find a country...")
            search_input.fill("Nigeria")

            # Wait for results
            page.wait_for_selector("#search-results li", timeout=5000)
            page.click("#search-results li >> text=Nigeria")

            # Wait for info panel animation
            print("Waiting for info panel...")
            page.wait_for_selector(".info-panel.visible", timeout=5000)

            # Wait a bit for staggering animations to complete
            time.sleep(1.5)

            # Take screenshot
            os.makedirs("verification", exist_ok=True)
            screenshot_path = "verification/verification_desktop.png"
            page.screenshot(path=screenshot_path)
            print(f"Screenshot saved to {screenshot_path}")

        except Exception as e:
            print(f"Error: {e}")
            page.screenshot(path="verification/error.png")
        finally:
            browser.close()

if __name__ == "__main__":
    run()
