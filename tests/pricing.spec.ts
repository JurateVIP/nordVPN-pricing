import { test, expect } from '../POM/fixtures/fixtures';

test.describe('Pricing page tests', () => {
  test('Plan duration dropdown test', async ({ preparePricingPage, page, pricingPage }) => {
    const oneMonthPlanPrice = pricingPage.oneMonthBasicPlanPrice;
    const dropdownValue = await pricingPage.getDropdownValue();
    const compareDropdownValue = await pricingPage.getCompareDropdownValue();

    await expect(oneMonthPlanPrice).toBeHidden();

    await pricingPage.selectOneMonthDuration();

    expect(dropdownValue).toEqual(compareDropdownValue);
    await expect(oneMonthPlanPrice).toBeVisible();
  });

  test('Add plan to the cart test', async ({ preparePricingPage, page, pricingPage, orderPaymentPage }) => {
    await pricingPage.selectPlusPlan();
    await expect(page).toHaveURL(/order\.nordvpn\.com\/payment/);
    await expect(orderPaymentPage.createAccountBlock).toBeVisible();
    await expect(orderPaymentPage.orderSummaryBlock).toBeVisible();

    const paymentMethods = orderPaymentPage.getPaymentMethods();

    for (const method of paymentMethods) {
      await expect(method).toBeVisible();
    }
  });

  test('Price check test', async ({ preparePricingPage, page, pricingPage, orderPaymentPage }) => {
    const plusPlanPrice = await pricingPage.getPlusPlanTotalPrice();
    await pricingPage.selectPlusPlan();
    await pricingPage.waitForLoad();
    const plusPlanOrderPrice = await orderPaymentPage.getPlusPlanOrderPrice();

    expect(plusPlanPrice).toEqual(plusPlanOrderPrice);

    const taxesSum = await orderPaymentPage.getTaxesSum();
    const orderTotalSum = await orderPaymentPage.getOrderTotalSum();

    expect(plusPlanOrderPrice + taxesSum).toEqual(orderTotalSum);
  });

  test('Language selection test', async ({ preparePricingPage, page, pricingPage, baseURL }) => {
    const country = 'fr';
    const pricingUrlRegex = new RegExp(`${baseURL}\\/${country}\\/pricing\\/`);
    await pricingPage.selectLanguage(country);
    await expect(page).toHaveURL(pricingUrlRegex);
    await expect(page).toHaveTitle('Abonnement VPN mensuel ou annuel par carte, crypto ou PayPal');
  });
});
