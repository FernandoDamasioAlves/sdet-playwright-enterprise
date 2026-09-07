import {
  expect,
  type Locator,
  type Page,
} from '@playwright/test';

import type { ProductReference } from '../data/models/product.model';
import { parseRupees } from '../utils/currency';

export class ProductDetailsPage {
  readonly page: Page;

  readonly productName: Locator;
  readonly category: Locator;
  readonly price: Locator;
  readonly availability: Locator;
  readonly condition: Locator;
  readonly brand: Locator;

  readonly quantityInput: Locator;
  readonly addToCartButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.productName = page.locator('.product-information h2');

    this.category = page
      .locator('.product-information p')
      .filter({ hasText: 'Category:' });

    this.price = page.locator('.product-information span span');

    this.availability = page
      .locator('.product-information p')
      .filter({ hasText: 'Availability:' });

    this.condition = page
      .locator('.product-information p')
      .filter({ hasText: 'Condition:' });

    this.brand = page
      .locator('.product-information p')
      .filter({ hasText: 'Brand:' });

    this.quantityInput = page.locator('#quantity');

    this.addToCartButton = page.locator(
      'button.cart',
    );
  }

  async validateLoaded(): Promise<void> {
    await expect(this.productName).toBeVisible();
    await expect(this.category).toBeVisible();
    await expect(this.price).toBeVisible();
    await expect(this.availability).toBeVisible();
    await expect(this.condition).toBeVisible();
    await expect(this.brand).toBeVisible();
  }

  async validateFirstProduct(): Promise<void> {
    await expect(this.productName).toHaveText('Blue Top');

    await expect(this.category).toContainText(
      'Category: Women > Tops',
    );

    await expect(this.price).toContainText('Rs. 500');
    await expect(this.availability).toContainText('In Stock');
    await expect(this.condition).toContainText('New');
    await expect(this.brand).toContainText('Polo');
  }

  async getReference(): Promise<ProductReference> {
    const name =
      (await this.productName.textContent())?.trim() ?? '';

    const priceText =
      (await this.price.textContent())?.trim() ?? '';

    return {
      name,
      price: parseRupees(priceText),
    };
  }

  async setQuantity(quantity: number): Promise<void> {
    if (quantity < 1) {
      throw new Error(
        'A quantidade do produto deve ser maior que zero.',
      );
    }

    await this.quantityInput.fill(String(quantity));
  }

  async addToCart(): Promise<void> {
    await this.addToCartButton.click();
  }
}
