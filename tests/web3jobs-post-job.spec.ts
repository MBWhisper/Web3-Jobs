import { test, expect } from '@playwright/test';

const BASE_URL = 'https://web3-jobs-hazel.vercel.app';

test('post a job basic flow (UI only)', async ({ page }) => {
  await page.goto(BASE_URL, { waitUntil: 'networkidle' });

  // اضغط زر Post a Job من الهيرو أو navbar
  const postJobButton = page.getByRole('button', { name: /post a job/i }).first();
  await expect(postJobButton).toBeVisible();
  await postJobButton.click();

  // انتظر أي modal أو صفحة جديدة (عدل حسب سلوك موقعك)
  // مثال: إن كان يفتح modal بعنوان Post a Job
  // await expect(page.getByText(/post a job/i)).toBeVisible();

  // لو توجد حقول في الفورم:
  // const titleInput = page.getByLabel(/job title/i);
  // await titleInput.fill('Senior Web3 Developer');

  // const companyInput = page.getByLabel(/company/i);
  // await companyInput.fill('Test Company');

  // const submitFormButton = page.getByRole('button', { name: /submit/i });
  // await submitFormButton.click();

  // تحقق من ظهور رسالة نجاح أو error validation
  // await expect(page.getByText(/thank you/i)).toBeVisible();

  // Screenshot للتوثيق
  await page.screenshot({ path: 'tests/screenshots/post-job.png', fullPage: true });
});