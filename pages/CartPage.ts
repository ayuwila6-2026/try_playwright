import { Page, Locator } from '@playwright/test';

export class CartPage {
  readonly items: Locator;
  readonly checkoutButton: Locator;

  constructor(private page: Page) {
    this.items = page.getByTestId('inventory-item');
    this.checkoutButton = page.getByTestId('checkout');
  }

  async remove(productSlug: string) {
    await this.page.getByTestId(`remove-${productSlug}`).click();
  }

  async checkout() {
    await this.checkoutButton.click();
  }
}