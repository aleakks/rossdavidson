import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
    test('navigate from services to about section', async ({ page, isMobile }) => {
        // 1. Go to Services page
        await page.goto('/info');

        // 2. Click proper nav link depending on mobile/desktop
        if (isMobile) {
            await page.getByRole('button', { name: /Menu/i }).click();
            await page.locator('div.fixed').getByRole('link', { name: /About/i }).click();
        } else {
            await page.locator('nav').getByRole('link', { name: /About/i }).click();
        }

        // 3. Check URL
        await expect(page).toHaveURL(/\/about/);

        // 4. Check if we actually navigated to the About section
        const aboutSection = page.locator('#about');
        await expect(aboutSection).toBeInViewport({ timeout: 10000 });
    });
});
