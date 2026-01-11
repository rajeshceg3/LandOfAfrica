
from playwright.sync_api import sync_playwright

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)

        # 1. Desktop Verification
        page_desktop = browser.new_page(viewport={"width": 1280, "height": 800})
        # Use file:// protocol to load local file
        import os
        cwd = os.getcwd()
        page_desktop.goto(f"file://{cwd}/index.html")

        # Wait for map to load (basic check)
        page_desktop.wait_for_selector("#map-container")

        # Simulate click on Egypt (approximate coordinates based on data or finding element)
        # Using the accessible role/label we added
        page_desktop.wait_for_selector('path[aria-label="Egypt"]')
        page_desktop.click('path[aria-label="Egypt"]')

        # Wait for panel to be visible
        page_desktop.wait_for_selector("#info-panel.visible")
        page_desktop.wait_for_timeout(1000) # Wait for animation

        page_desktop.screenshot(path="verification/desktop_panel.png")
        print("Desktop screenshot captured.")

        # 2. Mobile Verification
        page_mobile = browser.new_page(viewport={"width": 375, "height": 667})
        page_mobile.goto(f"file://{cwd}/index.html")

        # Click Egypt again
        page_mobile.wait_for_selector('path[aria-label="Egypt"]')
        page_mobile.click('path[aria-label="Egypt"]')

        # Wait for panel
        page_mobile.wait_for_selector("#info-panel.visible")
        page_mobile.wait_for_timeout(1000) # Wait for animation

        page_mobile.screenshot(path="verification/mobile_panel.png")
        print("Mobile screenshot captured.")

        browser.close()

if __name__ == "__main__":
    run()
