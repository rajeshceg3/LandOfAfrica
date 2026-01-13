
from playwright.sync_api import sync_playwright
import time
import os

def run():
    print("Starting verification...")
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)

        # --- Desktop Test ---
        print("Testing Desktop...")
        page = browser.new_page(viewport={'width': 1280, 'height': 800})

        # Load the local HTML file
        # We need absolute path for file://
        cwd = os.getcwd()
        page.goto(f'file://{cwd}/index.html')

        # Wait for map to load
        page.wait_for_selector('.leaflet-interactive', timeout=10000)

        # Click on Egypt (coords approx 162, 694 in map space)
        # Note: Map is image overlay, so coordinates are pixel based.
        # But we added click handlers to GeoJSON features.
        # Let's try to click a feature by aria-label since we added those!

        # Wait for features to be added
        page.wait_for_selector('[aria-label="View info about Egypt"]')

        # Click Egypt
        page.click('[aria-label="View info about Egypt"]')

        # Wait for panel to appear
        page.wait_for_selector('#info-panel.visible')

        # Wait for animation
        time.sleep(2)

        # Take screenshot
        page.screenshot(path='verification/desktop_panel_v2.png')
        print("Desktop screenshot saved.")

        # --- Mobile Test ---
        print("Testing Mobile...")
        context_mobile = browser.new_context(
            viewport={'width': 375, 'height': 812},
            is_mobile=True,
            has_touch=True
        )
        page_mobile = context_mobile.new_page()
        page_mobile.goto(f'file://{cwd}/index.html')

        page_mobile.wait_for_selector('[aria-label="View info about South Africa"]')
        page_mobile.click('[aria-label="View info about South Africa"]')

        page_mobile.wait_for_selector('#info-panel.visible')
        time.sleep(2)

        page_mobile.screenshot(path='verification/mobile_panel_v2.png')
        print("Mobile screenshot saved.")

        browser.close()

if __name__ == '__main__':
    run()
