from playwright.sync_api import sync_playwright
import time

def run():
    with sync_playwright() as p:
        # Launch browser
        browser = p.chromium.launch(headless=True)

        # Create a mobile context
        iphone_12 = p.devices['iPhone 12']
        context = browser.new_context(**iphone_12)
        page = context.new_page()

        print("Navigating to app (Mobile)...")
        page.goto("http://localhost:8000")

        # Wait for map to load
        page.wait_for_selector(".leaflet-interactive", timeout=5000)

        # Take initial mobile screenshot
        page.screenshot(path="verification/mobile_initial.png")
        print("Mobile initial state screenshot taken.")

        # Click on a country (Egypt is usually top left/center)
        # We need to click a specific path.
        # Since we can't easily click by coordinate without knowing where the map is centered exactly on mobile
        # (it fits bounds), we'll try to find the path element.

        # In Leaflet, paths are SVG. We can try to click the first path.
        print("Clicking a country...")
        page.click("path.leaflet-interactive >> nth=0")

        # Wait for panel
        page.wait_for_selector("#info-panel.visible", timeout=2000)

        # Check if mobile handle is visible (computed style)
        handle = page.locator(".mobile-handle")
        if handle.is_visible():
            print("Mobile handle is visible.")
        else:
            print("WARNING: Mobile handle is NOT visible.")

        # Take screenshot of open panel
        time.sleep(1) # Wait for animation
        page.screenshot(path="verification/mobile_panel_open.png")
        print("Mobile panel open screenshot taken.")

        browser.close()

if __name__ == "__main__":
    run()
