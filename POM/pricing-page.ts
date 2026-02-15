import { Page, Locator } from '@playwright/test';

export class PricingPage {
  private readonly getPlusPlanButton: Locator;
  private readonly planDurationDropdown: Locator;
  private readonly oneMonthDurationPlanDropdown: Locator;
  private readonly oneMonthDurationPlanDropdownValue: Locator;
  private readonly oneMonthDurationPlanCompareDropdownValue: Locator;
  private readonly languageDropdown: Locator;
  readonly oneMonthBasicPlanPrice: Locator;
  readonly planTotalPrice: Locator;

  constructor(readonly page: Page) {
    this.getPlusPlanButton = this.page.getByTestId('MultipleHighlightedCards-PlanCard-cta').nth(1);
    this.planDurationDropdown = this.page.locator('#select-s3000000-trigger');
    this.oneMonthDurationPlanDropdown = this.page.getByTestId('PricingDropdownOption-1-MONTH');
    this.oneMonthDurationPlanDropdownValue = this.page.locator('#select-s5000000-value');
    this.oneMonthDurationPlanCompareDropdownValue = this.page.locator('#select-s2000000-value');
    this.oneMonthBasicPlanPrice = this.page.getByTestId('SelectedCartSummaryCard-atomic-price').nth(9);
    this.planTotalPrice = this.page.getByTestId('PlanCard-total-price');
    this.languageDropdown = this.page.getByTestId('language-select-header').nth(0);
  }

  async waitForLoad() {
    await this.page.waitForLoadState('networkidle');
  }

  async selectPlusPlan() {
    await this.getPlusPlanButton.click();
  }

  async selectOneMonthDuration() {
    await this.planDurationDropdown.click();
    await this.oneMonthDurationPlanDropdown.click();
  }
  async getDropdownValue(): Promise<null | string> {
    return await this.oneMonthDurationPlanDropdownValue.textContent();
  }

  async getCompareDropdownValue(): Promise<null | string> {
    return await this.oneMonthDurationPlanCompareDropdownValue.textContent();
  }

  async getPlusPlanTotalPrice(): Promise<number> {
    const priceText = (await this.planTotalPrice.nth(1).innerText()).trim();
    const numericText = priceText.slice(1).trim();
    const priceNumber = parseFloat(numericText.replace(',', ''));

    if (isNaN(priceNumber)) {
      throw new Error(`Could not parse price from text: "${priceText}"`);
    }

    return priceNumber;
  }

  async selectLanguage(country: string) {
    await this.languageDropdown.selectOption(`/${country}/pricing/`);
  }
}
