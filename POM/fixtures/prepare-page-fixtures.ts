import { Page, test } from '@playwright/test';

export type PreparePageFixtures = {
  preparePricingPage: Page;
};

export const preparePageFixtures: Parameters<typeof test.extend<PreparePageFixtures>>[0] = {
  preparePricingPage: async ({ page, baseURL }, use) => {
    const pricingUrl = `${baseURL}/pricing`;
    await page.goto(pricingUrl);
    await page.waitForLoadState('networkidle');
    await page.getByTestId('consent-widget-accept-all').click();
    await use(page);
  },
};
