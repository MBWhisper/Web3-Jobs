import { test, expect } from '@playwright/test';

const BASE_URL = 'https://web3-jobs-hazel.vercel.app';

test.describe('Mobile Responsive Smoke Test', () => {
  
  test('mobile viewport loads correctly and displays mobile menu', async ({ page }) => {
    // Set mobile viewport (iPhone 14 size)
    await page.setViewportSize({ width: 390, height: 844 });
    
    await page.goto(BASE_URL, { waitUntil: 'networkidle' });
    
    // Verify hero text loads
    await expect(page.getByText('WEB3 IS ALIVE')).toBeVisible();
    
    // Desktop nav should be hidden on mobile
    await expect(page.locator('nav').first()).not.toBeVisible();
    
    // Mobile menu button should be present
    const mobileMenuButton = page.getByLabel(/open menu/i);
    await expect(mobileMenuButton).toBeVisible();
    
    // Open mobile menu
    await mobileMenuButton.click();
    
    // Verify mobile navigation opens
    await expect(page.getByLabel(/mobile navigation/i)).toBeVisible();
    
    const mobileNav = page.getByLabel(/mobile navigation/i);
    
    // Check navigation items exist ONLY inside mobile menu
    await expect(mobileNav.getByText(/partnerships/i)).toBeVisible();
    await expect(mobileNav.getByText(/agents/i)).toBeVisible();
    await expect(mobileNav.getByText(/salaries/i)).toBeVisible();
    await expect(mobileNav.getByText(/internships/i)).toBeVisible();
    await expect(mobileNav.getByText(/learn web3/i)).toBeVisible();
    
    // Check login/signup buttons exist inside mobile menu
    await expect(mobileNav.getByRole('button', { name: /login/i })).toBeVisible();
    await expect(mobileNav.getByRole('button', { name: /sign up/i })).toBeVisible();
    
    // Close mobile menu
    await page.getByLabel(/close menu/i).click();
    await expect(page.getByLabel(/mobile navigation/i)).not.toBeVisible();
    
    await page.screenshot({ path: 'tests/screenshots/mobile-layout.png', fullPage: true });
  });

  test('tablet viewport works correctly', async ({ page }) => {
    // Set tablet viewport (iPad Mini)
    await page.setViewportSize({ width: 768, height: 1024 });
    
    await page.goto(BASE_URL, { waitUntil: 'networkidle' });
    
    await expect(page.getByText('WEB3 IS ALIVE')).toBeVisible();
    
    // Desktop nav still hidden at tablet size
    await expect(page.locator('nav').first()).not.toBeVisible();
    
    // Mobile menu still available
    await expect(page.getByLabel(/open menu/i)).toBeVisible();
    
    await page.screenshot({ path: 'tests/screenshots/tablet-layout.png', fullPage: true });
  });

});