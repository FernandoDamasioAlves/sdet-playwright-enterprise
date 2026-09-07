import { expect, type Locator, type Page } from '@playwright/test';

export class CartModal {
  readonly root: Locator;
  readonly continueShoppingButton: Locator;
  readonly viewCartLink: Locator;

  constructor(page: Page) {
    this.root = page.locator('#cartModal');

    this.continueShoppingButton = this.root.getByRole('button', {
      name: 'Continue Shopping',
    });

    this.viewCartLink = this.root.getByRole('link', {
      name: 'View Cart',
    });
  }

  async validateOpened(): Promise<void> {
    await expect(this.root).toBeVisible();
  }

  async continueShopping(): Promise<void> {
    await this.validateOpened();
    await this.continueShoppingButton.click();
    await expect(this.root).toBeHidden();
  }

  async viewCart(): Promise<void> {
    await this.validateOpened();
    await this.viewCartLink.click();
  }
}
