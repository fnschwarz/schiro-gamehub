import { test, expect } from '@playwright/test';

test.describe('testing page navigation', () => {
    test('testing NotFound page', async ({ page }) => {
        await page.goto('http://localhost:5173/thispageisinvalid');
        await expect(page.locator('text=404 Not Found')).toBeVisible();
        await page.getByRole('button').click();
        await expect(page).toHaveURL('http://localhost:5173/');
    });

    test('testing AccessDenied page', async ({ page }) => {
        await page.goto('http://localhost:5173/access-denied');
        await expect(page.locator('text=403 Forbidden')).toBeVisible();
        await page.getByRole('button').click();
        await expect(page).toHaveURL('http://localhost:5173/');
    });

    test('testing Impressum page', async ({ page }) => {
        await page.goto('http://localhost:5173/');
        await page.locator('a[href="/impressum"]').click();
        await expect(page).toHaveURL('http://localhost:5173/impressum');
        await expect(page.getByRole('heading', { name: 'Impressum' })).toBeVisible();
        await page.locator('a[href="/"]').click();
        await expect(page).toHaveURL('http://localhost:5173/');
    });
})
