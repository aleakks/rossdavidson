import { test, expect } from '@playwright/test';

test.describe('Full Site Navigation Check', () => {

    // Helper to click nav link handling mobile menu
    const clickNav = async (page: any, isMobile: boolean, label: string | RegExp) => {
        if (isMobile) {
            const menuBtn = page.getByRole('button', { name: /Menu/i });
            if (await menuBtn.isVisible()) {
                await menuBtn.click();
            }
        }
        await page.getByRole('link', { name: label }).first().click();
    };

    test('About Page Displays Section', async ({ page, isMobile }) => {
        await page.goto('/');

        // Click About in nav
        await clickNav(page, isMobile, /About/i);
        await expect(page).toHaveURL(/\/about/);

        // Assert About section is visible
        await expect(page.locator('#about')).toBeVisible();
    });

    test('Contact Page Displays Form', async ({ page, isMobile }) => {
        await page.goto('/');

        // Click Contact in nav
        await clickNav(page, isMobile, /Contact/i);
        await expect(page).toHaveURL(/\/contact/);

        // Assert Contact section is visible but About section is NOT on this page
        await expect(page.locator('#contact')).toBeVisible();
        await expect(page.locator('#about')).not.toBeVisible();
    });

    test('External Page Navigation', async ({ page, isMobile }) => {
        await page.goto('/');

        // 1. Live Page
        await clickNav(page, isMobile, /Live/i);
        await expect(page).toHaveURL(/\/live/);
        await expect(page.getByRole('heading', { level: 1 })).toBeVisible();

        // 2. Publications Page
        await page.goto('/');
        await clickNav(page, isMobile, /Publications/i);
        await expect(page).toHaveURL(/\/publications/);
        await expect(page.getByRole('heading', { level: 1 })).toBeVisible();

        // 3. Contact Page
        await page.goto('/');
        await clickNav(page, isMobile, /Contact/i);
        await expect(page).toHaveURL(/\/contact/);
    });

    test('Cross-Page Navigation (The Bug Check)', async ({ page, isMobile }) => {
        // Start from Live page
        await page.goto('/live');

        // Navigate to About via nav link
        await clickNav(page, isMobile, /About/i);

        // Wait for navigation
        await page.waitForURL(/\/about/);

        // Assert Element is visible
        await expect(page.locator('#about')).toBeInViewport({ timeout: 10000 });
    });

    test('Live Page Grid and Event Modal Check', async ({ page }) => {
        await page.goto('/live');

        // Verify page loads 12 event items
        const eventItems = page.locator('.grid > div');
        await expect(eventItems).toHaveCount(12);

        // Click on the first event item
        await eventItems.first().click();

        // Expect modal to be open showing the showcase images
        const modalHeader = page.getByText(/Live Showcase Folder/i);
        await expect(modalHeader).toBeVisible();

        // Check if close button is visible and click it
        const closeBtn = page.getByRole('button', { name: /Close Gallery/i });
        await expect(closeBtn).toBeVisible();
        await closeBtn.click();

        // Expect modal to be closed
        await expect(modalHeader).not.toBeVisible();
    });

});
