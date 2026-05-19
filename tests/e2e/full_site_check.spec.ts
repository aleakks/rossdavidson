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

    test('Home Page Internal Navigation', async ({ page, isMobile }) => {
        await page.goto('/');

        // 1. About (Scroll to The Artist section)
        await clickNav(page, isMobile, /About/i);
        await expect(page).toHaveURL(/#about/);
        await expect(page.locator('#about')).toBeInViewport();
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

        // Navigate to About (should go to Home -> Scroll to #about)
        await clickNav(page, isMobile, /About/i);

        // Wait for navigation
        await page.waitForURL(/#about/);

        // Assert Element is visible (implies scroll happened)
        await expect(page.locator('#about')).toBeInViewport({ timeout: 10000 });
    });

    test('CTA Button Navigation', async ({ page, isMobile }) => {
        await page.goto('/');

        // Enquire Button
        if (isMobile) {
            await page.getByRole('link', { name: /Enquire/i }).first().click();
        } else {
            await page.getByRole('link', { name: /Enquire/i }).last().click();
        }
        await expect(page).toHaveURL(/\/contact/);
    });

});
