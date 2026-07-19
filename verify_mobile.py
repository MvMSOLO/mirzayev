import asyncio
from playwright.async_api import async_playwright

async def main():
    async with async_playwright() as p:
        # iPhone X mobile emulation viewport
        device = p.devices['iPhone X']
        browser = await p.chromium.launch()
        context = await browser.new_context(**device)
        page = await context.new_page()

        # Navigate to Studio Simulator Splash
        print("Navigating to Roblox Studio Simulator Splash Page on Port 5000...")
        await page.goto("http://localhost:5000/studio")
        await page.wait_for_timeout(3000)

        # Capture mobile splash
        await page.screenshot(path="/home/jules/verification/studio_mobile_splash.png")

        # Find and click the template
        print("Launching the Mobile Studio IDE...")
        launch_btn = page.locator("text=Launch Studio Engine")
        await launch_btn.scroll_into_view_if_needed()
        await launch_btn.click()

        # Wait for transition to complete and load
        await page.wait_for_timeout(4000)
        await page.screenshot(path="/home/jules/verification/studio_mobile_ide.png")

        # Let's open the Explorer sheet (click mobile bottom navigation tab labeled "Explorer")
        print("Opening the Explorer Panel...")
        explorer_btn = page.locator("button:has-text('Explorer')")
        await explorer_btn.first.click()
        await page.wait_for_timeout(2000)
        await page.screenshot(path="/home/jules/verification/studio_mobile_explorer.png")

        await browser.close()
        print("Mobile flow complete.")

if __name__ == "__main__":
    asyncio.run(main())
