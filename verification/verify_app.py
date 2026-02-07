from playwright.sync_api import sync_playwright
import time

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Navigate to the local server
        page.goto("http://localhost:8000")

        # 1. Verify Search Bar
        search_input = page.locator("#country-search")
        search_input.wait_for(state="visible")
        print("Search bar found.")

        # 2. Type "Algeria"
        search_input.fill("Algeria")
        time.sleep(1) # Wait for debounce/render

        # 3. Verify Results
        results = page.locator("#search-results")
        results.wait_for(state="visible")
        print("Search results visible.")

        # 4. Click the result
        # We look for the li containing "Algeria"
        algeria_option = results.locator("li", has_text="Algeria")
        algeria_option.click()
        print("Clicked Algeria.")

        # 5. Wait for panel to open
        info_panel = page.locator("#info-panel")
        # The panel has a class 'visible' when open
        page.wait_for_selector("#info-panel.visible", timeout=5000)
        print("Info panel opened.")

        # 6. Verify Content Depth
        # Check for Capital, Population, etc.
        capital = page.locator(".stat-label", has_text="Capital")
        if capital.is_visible():
            print("Capital stat found.")

        fun_fact = page.locator(".fun-fact")
        if fun_fact.is_visible():
            print("Fun fact found.")

        # 7. Take Screenshot
        time.sleep(2) # Wait for any animations
        page.screenshot(path="verification/app_verification.png")
        print("Screenshot saved to verification/app_verification.png")

        browser.close()

if __name__ == "__main__":
    run()
