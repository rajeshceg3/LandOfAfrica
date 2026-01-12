
from playwright.sync_api import sync_playwright
import os

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)

        # --- Desktop Verification ---
        page = browser.new_page(viewport={'width': 1280, 'height': 800})
        # Use file:// protocol to load local file
        page.goto(f"file://{os.getcwd()}/index.html")

        # Wait for map to load (the leaflet-layer filter transition is 1.5s, wait a bit more)
        page.wait_for_timeout(2000)

        # Simulate click on Egypt to open panel
        # Using the area coords approx or tab navigation
        page.keyboard.press("Tab") # Focus first element
        page.keyboard.press("Enter") # Select Egypt (first in tab order usually or first feature added)

        # Wait for panel animation
        page.wait_for_timeout(1500)

        page.screenshot(path="verification/desktop_panel.png")
        print("Desktop screenshot captured.")

        # --- Mobile Verification ---
        context_mobile = browser.new_context(
            viewport={'width': 375, 'height': 667},
            is_mobile=True,
            has_touch=True
        )
        page_mobile = context_mobile.new_page()
        page_mobile.goto(f"file://{os.getcwd()}/index.html")
        page_mobile.wait_for_timeout(2000)

        # Open panel on mobile
        # We can try clicking the center of a known country polygon.
        # Egypt roughly at 162, 694 to 320, 856 on 800x938 image.
        # Map fits bounds, so we need to calculate click relative to viewport.
        # Easier to just use keyboard again or execute JS.
        page_mobile.evaluate("showCountryInfo('egypt')")

        page_mobile.wait_for_timeout(1500)
        page_mobile.screenshot(path="verification/mobile_panel.png")
        print("Mobile screenshot captured.")

        browser.close()

if __name__ == "__main__":
    run()
