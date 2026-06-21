import { test, expect } from '@playwright/test';

test.describe('Homepage Experience', () => {

    test('has title', async ({ page }) => {
        await page.goto('/');
        await expect(page).toHaveTitle(/Portfolio|Ross Davidson/);
    });

    test('hero section is visible', async ({ page }) => {
        await page.goto('/');
        // Expecting the Hero text to be present (adjust selector based on your Hero component content)
        await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    });

    test('navigation links work', async ({ page, isMobile }) => {
        await page.goto('/');

        if (isMobile) {
            // Check for mobile menu button and open it
            const menuButton = page.getByRole('button', { name: /Menu/i });
            await expect(menuButton).toBeVisible();
            await menuButton.click();
            // Wait for menu overlay
            await expect(page.getByRole('link', { name: /Home/i }).first()).toBeVisible();
        } else {
            // Desktop check
            const nav = page.locator('nav').first();
            await expect(nav).toBeVisible();

            // Check for specific links (e.g., Home)
            const homeLink = page.getByRole('link', { name: /Home/i }).first();
            await expect(homeLink).toBeVisible();
        }
    });

});
