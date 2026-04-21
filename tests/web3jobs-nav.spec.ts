import { test, expect } from '@playwright/test';

const BASE_URL = 'https://web3-jobs-hazel.vercel.app';

test.describe('navbar navigation', () => {
  test('navigate between main sections', async ({ page }) => {
    // Set desktop viewport since nav elements are only visible on lg screens
    await page.setViewportSize({ width: 1280, height: 720 });
    
    await page.goto(BASE_URL, { waitUntil: 'networkidle' });

    await expect(page.getByText('WEB3 IS ALIVE')).toBeVisible();

    const nav = page.locator('nav').first();
    await expect(nav).toBeVisible();

    await expect(nav.getByText(/partnerships/i)).toBeVisible();
    await expect(nav.getByText(/agents/i)).toBeVisible();
    await expect(nav.getByText(/salaries/i)).toBeVisible();
    await expect(nav.getByText(/internships/i)).toBeVisible();
    await expect(nav.getByText(/learn web3/i)).toBeVisible();

    const topWeb3Jobs = nav.getByText(/top web3 jobs/i).first();
    await expect(topWeb3Jobs).toBeVisible();
    await topWeb3Jobs.click();

    await page.waitForTimeout(1000);

    // Login/Signup buttons are NOT inside the nav element - they are in the header actions div
    await expect(page.getByRole('button', { name: /login/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /sign up/i })).toBeVisible();

    await page.screenshot({ path: 'tests/screenshots/navbar-flow.png', fullPage: true });
  });
});
