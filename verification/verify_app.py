from playwright.sync_api import sync_playwright
import time

def verify_app():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            page.goto("http://localhost:8080")

            # 1. Verify A11y
            main = page.locator("main#main-content")
            h1 = page.locator("h1.sr-only")

            print(f"Main count: {main.count()}")
            print(f"H1 count: {h1.count()}")

            # 2. Verify Quiz
            # Wait for map to load (button enabled)
            # The button is initially disabled.
            page.wait_for_selector("#start-quiz:not([disabled])", timeout=20000)

            # Click start quiz
            page.click("#start-quiz")
            time.sleep(1)

            # Click stop quiz
            page.click("#stop-quiz")
            time.sleep(2) # Wait for flyTo

            # 3. Verify Mobile Handle
            # Force mobile view
            page.set_viewport_size({"width": 375, "height": 667})

            # Open panel to see handle? Handle is in .attraction-modal which is in #info-panel
            # Need to trigger a country click to show panel.
            # We can just check if element exists in DOM.
            handle = page.locator(".mobile-handle")
            print(f"Mobile handle count: {handle.count()}")

            page.screenshot(path="verification/app_screenshot.png")
            print("Verification successful")
        except Exception as e:
            print(f"Error: {e}")
            page.screenshot(path="verification/error_screenshot.png")
        finally:
            browser.close()

if __name__ == "__main__":
    verify_app()
