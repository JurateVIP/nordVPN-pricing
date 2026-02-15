import { OrderPaymentPage } from '../order-payment-page';
import { PricingPage } from '../pricing-page';
import { test } from '@playwright/test';

export type POMFixtures = {
  pricingPage: PricingPage;
  orderPaymentPage: OrderPaymentPage;
};

export const pomFixtures: Parameters<typeof test.extend<POMFixtures>>[0] = {
  pricingPage: async ({ page }, use) => {
    await use(new PricingPage(page));
  },
  orderPaymentPage: async ({ page }, use) => {
    await use(new OrderPaymentPage(page));
  },
};
