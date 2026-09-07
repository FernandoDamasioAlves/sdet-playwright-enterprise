import {
  expect,
  type Locator,
  type Page,
} from '@playwright/test';

import { ProductCard } from '../components/product-card.component';

export class ProductsPage {
  readonly page: Page;

  readonly allProductsTitle: Locator;
  readonly searchedProductsTitle: Locator;

  readonly searchInput: Locator;
  readonly searchButton: Locator;

  readonly productCards: Locator;

  readonly categorySection: Locator;
  readonly brandsSection: Locator;

  constructor(page: Page) {
    this.page = page;

    this.allProductsTitle = page.getByRole('heading', {
      name: 'All Products',
    });

    this.searchedProductsTitle = page.getByRole('heading', {
      name: 'Searched Products',
    });

    this.searchInput = page.locator('#search_product');
    this.searchButton = page.locator('#submit_search');

    this.productCards = page.locator(
      '.features_items .product-image-wrapper',
    );

    this.categorySection = page.getByRole('heading', {
      name: 'Category',
    });

    this.brandsSection = page.getByRole('heading', {
      name: 'Brands',
    });
  }

  async validateLoaded(): Promise<void> {
    await expect(this.allProductsTitle).toBeVisible();
    await expect(this.searchInput).toBeVisible();
    await expect(this.searchButton).toBeVisible();
    await expect(this.categorySection).toBeVisible();
    await expect(this.brandsSection).toBeVisible();

    await expect(this.productCards.first()).toBeVisible();
  }

  async getProductCount(): Promise<number> {
    return this.productCards.count();
  }

  productAt(index: number): ProductCard {
    return new ProductCard(this.productCards.nth(index));
  }

  async search(productName: string): Promise<void> {
    await this.searchInput.fill(productName);
    await this.searchButton.click();
  }

  async validateSearchResults(): Promise<void> {
    await expect(this.searchedProductsTitle).toBeVisible();
    await expect(this.productCards.first()).toBeVisible();
  }

  async validateAllResultsContain(
    expectedText: string,
  ): Promise<void> {
    const count = await this.productCards.count();

    expect(count).toBeGreaterThan(0);

    for (let index = 0; index < count; index += 1) {
      const product = this.productAt(index);
      const name = await product.getName();

      expect(name.toLowerCase()).toContain(
        expectedText.toLowerCase(),
      );
    }
  }

  async openFirstProduct(): Promise<void> {
    const firstProduct = this.productAt(0);

    await firstProduct.validateVisible();
    await firstProduct.openDetails();
  }
}
