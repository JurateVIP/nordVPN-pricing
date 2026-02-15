import { Page, Locator } from '@playwright/test';

export class OrderPaymentPage {
  private readonly creditCardPaymentMethod: Locator;
  private readonly googlePayPaymentMethod: Locator;
  private readonly payPalPaymentMethod: Locator;
  private readonly cryptoPaymentMethod: Locator;
  readonly createAccountBlock: Locator;
  readonly orderSummaryBlock: Locator;
  readonly planPrice: Locator;
  readonly taxesSum: Locator;
  readonly orderTotalSum: Locator;

  constructor(readonly page: Page) {
    this.createAccountBlock = this.page.getByTestId('create-account-container');
    this.creditCardPaymentMethod = this.page.getByTestId('nordsec_payments').nth(0);
    this.googlePayPaymentMethod = this.page.getByTestId('adyen_google_pay_credit_card');
    this.payPalPaymentMethod = this.page.getByTestId('paypal_rest_redirect');
    this.cryptoPaymentMethod = this.page.getByTestId('coin_gate');
    this.orderSummaryBlock = this.page.locator('[data-section="MainOrderSummary"]');
    this.planPrice = this.page.getByTestId('SelectedCartSummaryCard-total-price');
    this.taxesSum = this.page.getByTestId('TaxSelector-amount');
    this.orderTotalSum = this.page.getByTestId('CartSummary-total-amount');
  }

  getPaymentMethods(): Locator[] {
    return [
      this.creditCardPaymentMethod,
      this.googlePayPaymentMethod,
      this.payPalPaymentMethod,
      this.cryptoPaymentMethod,
    ];
  }

  private formatPrice(priceText: string): number {
    const numericText = priceText.slice(1).trim();
    const priceNumber = parseFloat(numericText.replace(',', ''));

    if (isNaN(priceNumber)) {
      throw new Error(`Could not parse price from text: "${numericText}"`);
    }
    return priceNumber;
  }

  async getPlusPlanOrderPrice(): Promise<number> {
    const priceText = (await this.planPrice.innerText()).trim();
    return this.formatPrice(priceText);
  }

  async getTaxesSum(): Promise<number> {
    const taxesText = (await this.taxesSum.innerText()).trim();
    return this.formatPrice(taxesText);
  }

  async getOrderTotalSum(): Promise<number> {
    const orderTotalText = (await this.orderTotalSum.innerText()).trim();
    return this.formatPrice(orderTotalText);
  }
}
