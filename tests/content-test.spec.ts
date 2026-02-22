import { test, expect } from '@playwright/test';

test('has title and main sections', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/FAST COLD E.I.R.L./);

  await expect(page.locator('text=Transporte Refrigerado y Congelado Seguro')).toBeVisible();
  await expect(page.locator('#servicios')).toBeVisible();
  await expect(page.locator('#contacto')).toBeVisible();
});

test('AIAssistant is present', async ({ page }) => {
  await page.goto('/');
  const assistant = page.locator('button >> .lucide-message-square');
  await expect(assistant).toBeVisible();
});
