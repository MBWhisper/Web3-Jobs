import { test, expect } from '@playwright/test';

const BASE_URL = 'https://web3-jobs-hazel.vercel.app';

test.describe('Authentication UI', () => {
  
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto(BASE_URL, { waitUntil: 'networkidle' });
  });

  test('Login modal opens and displays correctly', async ({ page }) => {
    // Click Login button
    await page.getByRole('button', { name: /login/i }).first().click();
    
    // Verify modal appears
    const modal = page.getByRole('dialog');
    await expect(modal).toBeVisible();
    await expect(modal.getByText('Welcome Back')).toBeVisible();
    
    // Check form elements inside modal only
    await expect(modal.getByLabel(/email address/i)).toBeVisible();
    await expect(modal.getByLabel(/password/i)).toBeVisible();
    await expect(modal.getByRole('button', { name: /sign in/i })).toBeVisible();
    
    // Check social login options
    await expect(modal.getByRole('button', { name: /google/i })).toBeVisible();
    await expect(modal.getByRole('button', { name: /github/i })).toBeVisible();
    
    // Check switch to signup
    await expect(modal.getByRole('button', { name: /sign up/i })).toBeVisible();
    
    // Close modal
    await modal.getByLabel(/close/i).click();
    await expect(modal).not.toBeVisible();
    
    await page.screenshot({ path: 'tests/screenshots/auth-login-modal.png', fullPage: true });
  });

  test('Sign Up modal opens and displays correctly', async ({ page }) => {
    // Click Sign Up button
    await page.getByRole('button', { name: /sign up/i }).first().click();
    
    // Verify modal appears
    const modal = page.getByRole('dialog');
    await expect(modal).toBeVisible();
    await expect(modal.getByText('Join Web3 Jobs')).toBeVisible();
    
    // Check form elements inside modal only
    await expect(modal.getByLabel(/email address/i)).toBeVisible();
    await expect(modal.getByLabel(/password/i)).toBeVisible();
    await expect(modal.getByRole('button', { name: /create account/i })).toBeVisible();
    
    // Check switch to login
    await expect(modal.getByRole('button', { name: /sign in/i })).toBeVisible();
    
    // Close modal
    await modal.getByLabel(/close/i).click();
    await expect(modal).not.toBeVisible();
    
    await page.screenshot({ path: 'tests/screenshots/auth-signup-modal.png', fullPage: true });
  });

  test('can switch between login and signup modes', async ({ page }) => {
    await page.getByRole('button', { name: /login/i }).first().click();
    
    const modal = page.getByRole('dialog');
    await expect(modal.getByText('Welcome Back')).toBeVisible();
    
    // Switch to signup
    await modal.getByRole('button', { name: /sign up/i }).click();
    await expect(modal.getByText('Join Web3 Jobs')).toBeVisible();
    
    // Switch back to login
    await modal.getByRole('button', { name: /sign in/i }).click();
    await expect(modal.getByText('Welcome Back')).toBeVisible();
  });

});