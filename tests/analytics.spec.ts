import { test, expect } from '../POM/fixtures/fixtures';

test.describe('Analytics tests', () => {
  test('GTM events test', async ({ preparePricingPage, page, pricingPage }) => {
    const isGtmLoaded = await page.evaluate(() => {
      const dataLayer = (window as any).dataLayer || [];
      return dataLayer.some((e: any) => e.event === 'gtm.load');
    });

    expect(isGtmLoaded).toBe(true);

    await pricingPage.selectPlusPlan();
    await pricingPage.waitForLoad();
    const dataLayer: any[] = await page.evaluate(() => (window as any).dataLayer || []);
    const hasEvent = (eventName: string) => dataLayer.some((e: any) => Object.values(e).includes(eventName));

    const expectedEvents = [
      'plans_displayed',
      'plans_preselected',
      'payments_preselected',
      'payments_loaded',
      'taxes_preselected',
    ];

    for (const event of expectedEvents) {
      expect(hasEvent(event)).toBe(true);
    }
  });

  test('Measure page load performance', async ({ baseURL, page, pricingPage }) => {
    const start = Date.now();
    const pricingUrl = `${baseURL}/pricing`;
    await page.goto(pricingUrl);
    await pricingPage.waitForLoad();
    const loadTime = Date.now() - start;

    expect(loadTime).toBeLessThan(5000);
  });
});
