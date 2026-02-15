import { test, expect } from '../POM/fixtures/fixtures';

//Skipping test because each time I get A/B test.
test.skip('Pricing page visual test', async ({ preparePricingPage, page, pricingPage }) => {
  const timeout = 10000;

  await pricingPage.page.keyboard.press('End');
  await pricingPage.page.waitForTimeout(timeout);
  await pricingPage.page.keyboard.press('Home');
  await pricingPage.page.waitForTimeout(timeout);

  await expect(pricingPage.page).toHaveScreenshot({
    fullPage: true,
    maxDiffPixelRatio: 0.3,
  });
});
