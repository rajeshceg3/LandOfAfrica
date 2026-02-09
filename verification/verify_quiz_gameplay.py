from playwright.sync_api import sync_playwright
import time
import sys

def verify_quiz_gameplay():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Listen for console errors
        console_errors = []
        page.on("console", lambda msg: console_errors.append(msg.text) if msg.type == "error" else None)
        page.on("pageerror", lambda exc: console_errors.append(str(exc)))

        page.goto("http://localhost:8000")

        # Wait for map to load
        page.wait_for_selector(".leaflet-interactive", timeout=10000)

        # Enable controls
        page.wait_for_function("document.getElementById('start-quiz') && !document.getElementById('start-quiz').disabled")

        # Start Quiz
        print("Starting Quiz...")
        page.click("#start-quiz")

        # Wait for quiz UI
        page.wait_for_selector("#quiz-ui:not(.hidden)")

        # Get target country name
        target_name_1 = page.text_content("#quiz-target")
        print(f"Target country 1: {target_name_1}")

        # Click Correctly
        aria_label = f"View info about {target_name_1}"
        country_locator = page.locator(f"path[aria-label='{aria_label}']")
        country_locator.first.click(force=True)

        # Wait for success feedback
        page.wait_for_selector(".quiz-feedback.success", timeout=3000)
        print("Success feedback shown.")

        # Wait for next question (logic waits 1.5s then calls nextQuestion)
        # We wait 2s to be safe
        time.sleep(2.5)

        # Check if target changed (or at least if nextQuestion was called)
        target_name_2 = page.text_content("#quiz-target")
        print(f"Target country 2: {target_name_2}")

        # Note: Random selection *could* pick the same country again, but unlikely with 50+ countries.
        # But even if it's the same, the UI state should be reset (feedback hidden).

        is_feedback_hidden = page.eval_on_selector("#quiz-feedback", "el => el.classList.contains('hidden')")

        if not is_feedback_hidden:
            print("FAILURE: Feedback message did not hide. Execution might have crashed after showing feedback.")
            sys.exit(1)

        if len(console_errors) > 0:
            print(f"FAILURE: Console errors detected:\n{console_errors}")
            sys.exit(1)

        print("SUCCESS: Quiz proceeded to next question without errors.")
        browser.close()

if __name__ == "__main__":
    verify_quiz_gameplay()
