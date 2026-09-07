import {
  expect,
  type Locator,
  type Page,
} from '@playwright/test';

export class ProductDetailsPage {
  readonly page: Page;

  readonly productName: Locator;
  readonly category: Locator;
  readonly price: Locator;
  readonly availability: Locator;
  readonly condition: Locator;
  readonly brand: Locator;

  constructor(page: Page) {
    this.page = page;

    this.productName = page.locator('.product-information h2');

    this.category = page
      .locator('.product-information p')
      .filter({ hasText: 'Category:' });

    this.price = page
      .locator('.product-information span span');

    this.availability = page
      .locator('.product-information p')
      .filter({ hasText: 'Availability:' });

    this.condition = page
      .locator('.product-information p')
      .filter({ hasText: 'Condition:' });

    this.brand = page
      .locator('.product-information p')
      .filter({ hasText: 'Brand:' });
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
}
