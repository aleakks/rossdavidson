import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
    test('navigate from journal to about section', async ({ page, isMobile }) => {
        // 1. Go to Journal page
        await page.goto('/journal');

        // 2. Click proper nav link depending on mobile/desktop
        if (isMobile) {
            await page.getByRole('button', { name: /Menu/i }).click();
            await page.getByRole('link', { name: /About/i }).click();
        } else {
            await page.getByRole('link', { name: /About/i }).click();
        }

        // 3. Check URL
        await expect(page).toHaveURL(/#about/);

        // 4. Check if we actually scrolled to the About section
        // We'll check if the "The Artist" text (in AboutClient) is in the viewport
        // or getting close to it.
        const aboutSection = page.locator('#about');
        await expect(aboutSection).toBeInViewport({ timeout: 10000 });
    });
});
