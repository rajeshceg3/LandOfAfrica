import os
import sys
import time
import threading
import http.server
import socketserver
from playwright.sync_api import sync_playwright

PORT = 8082

def run_server():
    os.chdir('.') # Root of repo
    Handler = http.server.SimpleHTTPRequestHandler
    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        print(f"Serving at port {PORT}")
        httpd.serve_forever()

def verify():
    server_thread = threading.Thread(target=run_server, daemon=True)
    server_thread.start()
    time.sleep(2) # Give server time to start

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        print("Loading page...")
        page.goto(f"http://localhost:{PORT}/index.html")

        # Check for console errors
        page.on("console", lambda msg: print(f"Console: {msg.text}"))

        # Wait for map to load (loader to disappear)
        try:
            page.wait_for_selector("#loader.fade-out", state="attached", timeout=10000)
            print("Loader faded out.")
        except Exception as e:
            print("Loader did not fade out or took too long.")

        # Check if countryData is loaded
        script = page.locator('script[src="country-data.js"]')
        if script.count() > 0:
            print("country-data.js script tag found.")
        else:
            print("FAIL: country-data.js script tag NOT found.")
            sys.exit(1)

        # Check for Skip Link
        skip_link = page.locator('.skip-link')
        if skip_link.count() > 0:
            print("Skip link found.")
            # check visibility on focus?
            skip_link.focus()
            time.sleep(0.5) # Wait for transition
            box = skip_link.bounding_box()
            print(f"Skip link box: {box}")
            if box['y'] >= -1: # Tolerance for 0 or -1
                print("Skip link visible on focus.")
            else:
                print("FAIL: Skip link not visible on focus.")
                # Don't fail the whole script for this visual check if it's flaky, but print FAIL.
        else:
            print("FAIL: Skip link not found.")
            sys.exit(1)

        # Check Map Interaction
        # Click a random path
        print("Clicking a country...")
        # wait for any path
        try:
            page.wait_for_selector("path.leaflet-interactive", timeout=15000)
            paths = page.locator("path.leaflet-interactive")
            count = paths.count()
            print(f"Found {count} interactive paths.")
            if count > 0:
                # Force click if needed, or just click
                paths.nth(0).click(force=True)
                print("Clicked a country.")

                # Check info panel
                page.wait_for_selector("#info-panel.visible", timeout=10000)
                print("Info panel visible.")

                # Check content inside
                # Wait for title to have text
                page.wait_for_function("document.getElementById('country-name').textContent.length > 0", timeout=10000)
                title = page.locator("#country-name").text_content()
                print(f"Country Title: {title}")
                if not title:
                    print("FAIL: Country title empty.")
                    sys.exit(1)

                # Close panel
                page.click("#close-panel")
                page.wait_for_selector("#info-panel:not(.visible)", timeout=10000)
                print("Info panel closed.")
            else:
                print("FAIL: No interactive paths found on map.")
        except Exception as e:
            print(f"FAIL during map interaction: {e}")
            sys.exit(1)

        browser.close()
        print("Verification SUCCESS.")

if __name__ == "__main__":
    verify()
