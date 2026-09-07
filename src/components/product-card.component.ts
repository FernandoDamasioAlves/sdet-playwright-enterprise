import { expect, type Locator } from '@playwright/test';

import type { ProductReference } from '../data/models/product.model';
import { parseRupees } from '../utils/currency';

export class ProductCard {
  readonly root: Locator;
  readonly name: Locator;
  readonly price: Locator;
  readonly viewProductLink: Locator;
  readonly addToCartButton: Locator;

  constructor(root: Locator) {
    this.root = root;

    this.name = root.locator('.productinfo p');
    this.price = root.locator('.productinfo h2');

    this.viewProductLink = root.getByRole('link', {
      name: /View Product/i,
    });

    this.addToCartButton = root.locator(
      '.overlay-content .add-to-cart',
    );
  }

  async getName(): Promise<string> {
    return (await this.name.textContent())?.trim() ?? '';
  }

  async getReference(): Promise<ProductReference> {
    const name = await this.getName();
    const priceText = (await this.price.textContent())?.trim() ?? '';

    return {
      name,
      price: parseRupees(priceText),
    };
  }

  async validateVisible(): Promise<void> {
    await expect(this.root).toBeVisible();
    await expect(this.name).toBeVisible();
    await expect(this.price).toBeVisible();
  }

  async addToCart(): Promise<void> {
    await this.root.hover();
    await expect(this.addToCartButton).toBeVisible();
    await this.addToCartButton.click();
  }

  async openDetails(): Promise<void> {
    await this.viewProductLink.click();
  }
}
