import { test, expect } from '@playwright/test';

test('Play game of Connect 4', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByRole('button', { name: 'New Game' }).click();
  await page.locator('[id="\\30 "]').click();
  await page.locator('[id="\\30 "]').click();
  await page.locator('[id="\\31 "]').click();
  await page.locator('[id="\\31 "]').click();
  await page.locator('[id="\\32 "]').click();
  await page.locator('[id="\\32 "]').click();
  page.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });
  await page.locator('[id="\\33 "]').click();
});
