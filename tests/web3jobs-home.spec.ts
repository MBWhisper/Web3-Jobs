// tests/web3jobs-home.spec.ts
import { test, expect } from '@playwright/test';

const BASE_URL = 'https://web3-jobs-hazel.vercel.app';

test('home page basic flow', async ({ page }) => {
  // 1) افتح الهوم
  await page.goto(BASE_URL, { waitUntil: 'networkidle' });

  // 2) تأكد أن عنوان الهيرو موجود
  await expect(page.getByText('WEB3 IS ALIVE')).toBeVisible();

  // 3) اضغط على زر Browse Jobs
  const browseJobsButton = page.getByRole('button', { name: /browse jobs/i });
  await expect(browseJobsButton).toBeVisible();
  await browseJobsButton.click();

  // هنا لو فيه navigations أو scroll ممكن تضيف expect إضافي
  // 4) املأ إيميل في حقل Subscribe
  const emailInput = page.getByPlaceholder('Type your email');
  await emailInput.fill('test@example.com');

  const subscribeButton = page.getByRole('button', { name: /subscribe/i });
  await subscribeButton.click();

  // 5) خذ Screenshot بعد التفاعل
  await page.screenshot({ path: 'tests/screenshots/home-flow.png', fullPage: true });
});