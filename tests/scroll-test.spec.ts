import { test, expect } from '@playwright/test';

test('scrolling reveals header background', async ({ page }) => {
  await page.goto('/');
  const header = page.locator('header');
  await expect(header).toHaveClass(/bg-transparent/);

  await page.mouse.wheel(0, 500);
  await page.waitForTimeout(500);

  await expect(header).toHaveClass(/bg-white/);
});
