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
            await expect(page.getByRole('link', { name: /Work/i }).first()).toBeVisible();
        } else {
            // Desktop check
            const nav = page.locator('nav').first();
            await expect(nav).toBeVisible();

            // Check for specific links (e.g., Work)
            const workLink = page.getByRole('link', { name: /Work/i }).first();
            await expect(workLink).toBeVisible();
        }
    });

    test('gallery loads images', async ({ page }) => {
        await page.goto('/');

        // Wait for gallery to load (it might take a moment due to animation/fetch)
        await expect(page.locator('#work')).toBeVisible();

        // Check if at least one image is loaded in the gallery
        const images = page.locator('#work img');
        await expect(images.first()).toBeVisible();
    });
});
