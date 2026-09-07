import { expect, type Locator } from '@playwright/test';

import type { CartExpectation } from '../data/models/product.model';
import { formatRupees } from '../utils/currency';

export class CartItem {
  readonly root: Locator;

  readonly name: Locator;
  readonly price: Locator;
  readonly quantity: Locator;
  readonly total: Locator;
  readonly removeButton: Locator;

  constructor(root: Locator) {
    this.root = root;

    this.name = root.locator('.cart_description h4 a');
    this.price = root.locator('.cart_price p');
    this.quantity = root.locator('.cart_quantity button');
    this.total = root.locator('.cart_total_price');
    this.removeButton = root.locator('.cart_delete a');
  }

  async validate(expected: CartExpectation): Promise<void> {
    await expect(this.root).toBeVisible();

    await expect(this.name).toHaveText(expected.name);

    await expect(this.price).toHaveText(
      formatRupees(expected.price),
    );

    await expect(this.quantity).toHaveText(
      String(expected.quantity),
    );

    await expect(this.total).toHaveText(
      formatRupees(expected.total),
    );
  }

  async remove(): Promise<void> {
    await this.removeButton.click();
    await expect(this.root).toBeHidden();
  }
}
