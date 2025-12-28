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

        // 1. Work (Scroll)
        await clickNav(page, isMobile, /Work/i);
        await expect(page).toHaveURL(/#work/);
        await expect(page.locator('#work')).toBeInViewport();

        // 2. About (Scroll)
        await clickNav(page, isMobile, /About/i);
        await expect(page).toHaveURL(/#about/);
        await expect(page.locator('#about')).toBeInViewport();
    });

    test('External Page Navigation', async ({ page, isMobile }) => {
        await page.goto('/');

        // 1. Services (Page)
        await clickNav(page, isMobile, /Services/i);
        await expect(page).toHaveURL(/\/info/);
        await expect(page.getByRole('heading', { level: 1 })).toBeVisible(); // Check for some content
    });

    test('Journal Navigation', async ({ page, isMobile }) => {
        await page.goto('/');

        // 1. Journal (Page)
        await clickNav(page, isMobile, /Journal/i);
        await expect(page).toHaveURL(/\/journal/);

        // 2. Click first article
        const firstArticle = page.locator('a[href^="/journal/"]').first();
        if (await firstArticle.isVisible()) {
            await firstArticle.click();
            await expect(page).toHaveURL(/\/journal\/.+/);
        }
    });

    test('Cross-Page Navigation (The Bug Check)', async ({ page, isMobile }) => {
        // Start from Journal
        await page.goto('/journal');

        // Navigate to About (should go to Home -> Scroll to #about)
        await clickNav(page, isMobile, /About/i);

        // Wait for navigation
        await page.waitForURL(/#about/);

        // Assert we are on homepage
        // Assert Element is visible (implies scroll happened)
        // We give it a generous timeout because of our 2000ms retry logic
        await expect(page.locator('#about')).toBeInViewport({ timeout: 10000 });

        // Navigate to Work from Journal (Cross-page) - testing another one
        await page.goto('/journal');
        await clickNav(page, isMobile, /Work/i);
        await page.waitForURL(/#work/);
        await expect(page.locator('#work')).toBeInViewport({ timeout: 10000 });
    });

    test('CTA Button Navigation', async ({ page, isMobile }) => {
        await page.goto('/');

        // Enquire Button
        if (isMobile) {
            // Mobile header has "Enquire" button visible
            await page.getByRole('link', { name: /Enquire/i }).first().click();
        } else {
            await page.getByRole('link', { name: /Enquire/i }).last().click();
        }
        await expect(page).toHaveURL(/#contact/);
        await expect(page.locator('#contact')).toBeInViewport();
    });

});
