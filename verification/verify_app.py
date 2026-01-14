from playwright.sync_api import sync_playwright, expect
import re

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # 1. Load the app
        page.goto("http://localhost:8000/index.html")

        # Wait for map to initialize (Leaflet adds classes)
        page.wait_for_selector(".leaflet-container")

        # 2. Verify Map Visuals
        # Take a screenshot of the initial state
        page.screenshot(path="verification/initial_state.png")
        print("Initial state screenshot taken.")

        # 3. Interact: Click on Egypt
        # The app sets aria-label on the path elements
        egypt_btn = page.locator("path[aria-label='View info about Egypt']")

        # Force click because sometimes SVG paths are considered 'hidden' or covered by Leaflet layers
        egypt_btn.click(force=True)

        # 4. Verify Panel Opens
        panel = page.locator("#info-panel")
        # Check if class contains 'visible'
        expect(panel).to_have_class(re.compile(r"visible"))
        expect(page.locator("#country-name")).to_have_text("Egypt")

        # Take a screenshot of the open panel
        page.screenshot(path="verification/panel_open.png")
        print("Panel open screenshot taken.")

        # 5. Close Panel
        page.get_by_label("Close panel").click()
        expect(panel).not_to_have_class(re.compile(r"visible"))

        print("Verification successful.")
        browser.close()

if __name__ == "__main__":
    run()
