from playwright.sync_api import sync_playwright
import time
import os

def run_verification(url):
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Override geolocation/permissions if needed, though not strictly required here
        context = browser.new_context(
            viewport={'width': 1280, 'height': 800}
        )
        page = context.new_page()

        print(f"Navigating to {url}...")
        try:
            page.goto(url)
        except Exception as e:
            print(f"Error navigating: {e}")
            return

        print("Waiting for map to load...")
        try:
            # Wait for the base image layer
            page.wait_for_selector(".leaflet-image-layer", state="visible", timeout=10000)
            print("Map base layer loaded.")

            # Wait for the polygons (interactive elements)
            page.wait_for_selector(".leaflet-interactive", state="attached", timeout=10000)
            print("Interactive polygons loaded.")

            # Allow animations to settle
            time.sleep(2)

            # 1. Desktop Initial View
            page.screenshot(path="verification/desktop_initial.png")
            print("Captured desktop_initial.png")

            # 2. Desktop Interaction (Hover & Click)
            # Find a polygon (e.g., Egypt) and click it
            # We need to simulate a click on the map where Egypt is.
            # Egypt coords in app.js are roughly: x: 162-320, y: 694-856 (in original image coords)
            # The map bounds are [0,0] to [938, 800].
            # Leaflet Y is distinct from screen Y.
            # Let's just click the center of the viewport or search for the element if possible.
            # Since the polygons have paths, we can try to click one via CSS selector if we knew which one.
            # But they are just <path> elements.

            # Let's try to click a point on the screen that roughly corresponds to a country.
            # Or use Playwright to dispatch an event to the map.
            # Actually, app.js exposes `polygonLayer`. We could potentially execute JS.
            # But let's try visual interaction first.

            # Simulate hover
            page.mouse.move(640, 400) # Middle of screen
            time.sleep(0.5)
            page.screenshot(path="verification/desktop_hover.png")

            # Simulate click (Activate panel)
            # We'll click on a specific coordinate known to be a country.
            # Egypt is roughly top right? No, coords are from image.
            # Image is 800x938. Egypt is [162, 694]...
            # The map fits the bounds.
            # Let's just execute JS to open a panel to be safe and deterministic.
            page.evaluate("showCountryInfo('egypt')")

            # Wait for panel animation
            time.sleep(2)
            page.screenshot(path="verification/desktop_panel_open.png")
            print("Captured desktop_panel_open.png")

        except Exception as e:
            print(f"Error during desktop verification: {e}")
            page.screenshot(path="verification/debug_error_desktop.png")

        # 3. Mobile View
        print("Switching to Mobile view...")
        context_mobile = browser.new_context(
            viewport={'width': 375, 'height': 812},
            is_mobile=True,
            has_touch=True
        )
        page_mobile = context_mobile.new_page()
        page_mobile.goto(url)

        try:
            page_mobile.wait_for_selector(".leaflet-image-layer", state="visible", timeout=10000)
            time.sleep(1)

            # Trigger panel (Mobile Sheet)
            page_mobile.evaluate("showCountryInfo('south_africa')")
            time.sleep(2)

            page_mobile.screenshot(path="verification/mobile_sheet_open.png")
            print("Captured mobile_sheet_open.png")

        except Exception as e:
            print(f"Error during mobile verification: {e}")
            page_mobile.screenshot(path="verification/debug_error_mobile.png")

        browser.close()

if __name__ == "__main__":
    # Use localhost
    run_verification("http://localhost:8000/index.html")
