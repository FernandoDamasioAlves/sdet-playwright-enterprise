import { expect, type Locator } from '@playwright/test';

export class ProductCard {
  readonly root: Locator;
  readonly name: Locator;
  readonly price: Locator;
  readonly viewProductLink: Locator;

  constructor(root: Locator) {
    this.root = root;
    this.name = root.locator('.productinfo p');
    this.price = root.locator('.productinfo h2');
    this.viewProductLink = root.getByRole('link', {
      name: /View Product/i,
    });
  }

  async getName(): Promise<string> {
    return (await this.name.textContent())?.trim() ?? '';
  }

  async validateVisible(): Promise<void> {
    await expect(this.root).toBeVisible();
    await expect(this.name).toBeVisible();
    await expect(this.price).toBeVisible();
  }

  async openDetails(): Promise<void> {
    await this.viewProductLink.click();
  }
}
