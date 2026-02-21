import { test, expect } from '@playwright/test';

test.describe('FAST COLD Content Verification', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');
  });

  test('should have the correct title', async ({ page }) => {
    await expect(page).toHaveTitle(/FAST COLD E.I.R.L./);
  });

  test('should display the hero section', async ({ page }) => {
    await expect(page.locator('h1')).toContainText('Transporte Refrigerado');
  });

  test('should have the AI Assistant button', async ({ page }) => {
    const aiButton = page.locator('button').filter({ has: page.locator('svg') }).last();
    await expect(aiButton).toBeVisible();
  });

  test('should show services section', async ({ page }) => {
    await expect(page.locator('#servicios')).toBeVisible();
  });
});
