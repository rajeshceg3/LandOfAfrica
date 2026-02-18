from playwright.sync_api import sync_playwright, expect
import re
import time

def verify_app(page):
    # 1. Load Page
    print("Loading page...")
    page.goto("http://localhost:8000/index.html")

    # Wait for map to initialize (loader gone)
    expect(page.locator("#loader")).not_to_be_visible(timeout=10000)
    print("Map loaded.")

    # 2. Test Quiz
    print("Starting Quiz...")
    start_btn = page.get_by_role("button", name="Play Quiz")
    expect(start_btn).to_be_enabled()
    start_btn.click()

    # Wait for Quiz UI
    quiz_ui = page.locator("#quiz-ui")
    expect(quiz_ui).to_be_visible()

    # Get Target
    target_el = page.locator("#quiz-target")
    expect(target_el).not_to_be_empty()
    target_name = target_el.text_content()
    print(f"Quiz Target: {target_name}")

    # Find Feature on Map
    # Leaflet paths have class 'country-poly' or 'leaflet-interactive'
    # We added aria-label in setupA11y: "View info about {name}"
    # Note: aria-label might be on a path element inside an SVG overlay.

    feature_locator = page.locator(f"path[aria-label='View info about {target_name}']").first

    # Force click if obscured by label or tooltip (force=True)
    print(f"Clicking {target_name}...")
    feature_locator.click(force=True)

    # Check Feedback
    feedback = page.locator("#quiz-feedback")
    expect(feedback).to_contain_text("Correct!")
    print("Answered Correctly!")

    # Check Score
    score_val = page.locator("#quiz-score-val")
    expect(score_val).to_have_text("1")
    print("Score updated.")

    # Wait for Next Question
    # The app waits 1500ms before next question
    time.sleep(2)

    new_target_name = target_el.text_content()
    print(f"New Target: {new_target_name}")
    assert new_target_name != target_name, "Target should change after correct answer"

    # Screenshot Quiz State
    page.screenshot(path="verification/quiz_state.png")

    # Stop Quiz
    page.get_by_label("Exit Quiz").click()
    expect(quiz_ui).not_to_be_visible()
    print("Quiz Stopped.")

    # 3. Test Navigation (Robustness check)
    print("Testing Navigation...")
    # Click random country button to open panel
    random_btn = page.get_by_label("Surprise me")
    random_btn.click()

    panel = page.locator("#info-panel")
    expect(panel).to_have_class(re.compile(r"visible"))

    # Get current country name
    current_country_el = page.locator("#country-name")
    country_text = current_country_el.text_content().strip() # Includes Flag text? No, flag is img.
    # The text content includes the country name.
    print(f"Current Country: {country_text}")

    # Click Next
    next_btn = page.get_by_label("Next Country")
    next_btn.click()

    # Wait for transition (flyToBounds takes time)
    time.sleep(2)

    new_country_text = current_country_el.text_content().strip()
    print(f"Next Country: {new_country_text}")

    assert new_country_text != country_text, "Navigation should change country"

    # Screenshot Navigation State
    page.screenshot(path="verification/nav_state.png")
    print("Verification Complete.")

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            verify_app(page)
        except Exception as e:
            print(f"Verification Failed: {e}")
            page.screenshot(path="verification/failure.png")
            raise e
        finally:
            browser.close()
