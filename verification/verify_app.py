from playwright.sync_api import sync_playwright
import time

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        page.goto("http://localhost:8000")

        # Wait for map to load
        page.wait_for_timeout(3000)

        # 1. Test Quiz UI
        print("Testing Quiz UI...")
        # Check if button exists
        quiz_btn = page.locator("#start-quiz")
        if quiz_btn.is_visible():
            quiz_btn.click()
            page.wait_for_timeout(1000)
            page.screenshot(path="verification/quiz_ui.png")
            print("Quiz UI screenshot taken.")

            # Exit Quiz
            page.locator("#stop-quiz").click()
            page.wait_for_timeout(500)
        else:
            print("Quiz button not found!")

        # 2. Test Info Panel Enrichment & Navigation
        print("Testing Info Panel...")
        # Simulate clicking a country. Since map clicks are canvas/svg, we can use search to open one.
        search_input = page.locator("#country-search")
        if search_input.is_disabled():
             print("Search disabled, waiting...")
             page.wait_for_timeout(2000)

        page.fill("#country-search", "Algeria")
        page.wait_for_timeout(1000)

        # Click the first result
        results = page.locator("#search-results li")
        if results.count() > 0:
            results.first.click()
            page.wait_for_timeout(2000) # Wait for animation

            page.screenshot(path="verification/info_panel.png")
            print("Info Panel screenshot taken.")

            # Test Next Button
            next_btn = page.locator(".nav-btn.next")
            if next_btn.is_visible():
                next_btn.click()
                page.wait_for_timeout(1000)
                page.screenshot(path="verification/info_panel_next.png")
                print("Navigated to next country.")
            else:
                print("Next button not found!")
        else:
            print("Search results not found!")

        browser.close()

if __name__ == "__main__":
    run()
