import {
  expect,
  type Locator,
  type Page,
} from '@playwright/test';

import { CartItem } from '../components/cart-item.component';
import type { CartExpectation } from '../data/models/product.model';

export class CartPage {
  readonly page: Page;
  readonly cartTable: Locator;
  readonly cartRows: Locator;
  readonly proceedToCheckoutButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.cartTable = page.locator('#cart_info_table');

    this.cartRows = page.locator(
      '#cart_info_table tbody tr',
    );

    this.proceedToCheckoutButton = page.locator(
      'a.check_out',
    );
  }

  async validateLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(
      /\/view_cart(?:[?#]|$)/,
    );

    await expect(this.cartTable).toBeVisible();
  }

  async getItemCount(): Promise<number> {
    return this.cartRows.count();
  }

  itemByName(name: string): CartItem {
    const row = this.cartRows
      .filter({
        hasText: name,
      })
      .first();

    return new CartItem(row);
  }

  async validateItem(
    expected: CartExpectation,
  ): Promise<void> {
    const item = this.itemByName(expected.name);

    await item.validate(expected);
  }

  async proceedToCheckout(): Promise<void> {
    await expect(
      this.proceedToCheckoutButton,
    ).toBeVisible();

    await this.proceedToCheckoutButton.click();

    await expect(this.page).toHaveURL(
      /\/checkout(?:[?#]|$)/,
    );
  }
}
