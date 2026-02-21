import { test, expect } from '@playwright/test';

test.describe('FAST COLD Scroll Behavior', () => {
  test('should change header background on scroll', async ({ page }) => {
    await page.goto('http://localhost:3000');

    const header = page.locator('header');
    await expect(header).toHaveClass(/bg-transparent/);

    await page.evaluate(() => window.scrollTo(0, 100));
    await page.waitForTimeout(500);

    await expect(header).toHaveClass(/bg-white/);
  });
});
