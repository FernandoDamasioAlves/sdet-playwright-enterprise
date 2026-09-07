import { expect, type Locator, type Page } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly logo: Locator;
  readonly productsLink: Locator;
  readonly signupLoginLink: Locator;
  readonly cartLink: Locator;

  constructor(page: Page) {
    this.page = page;

    this.logo = page.getByAltText('Website for automation practice');

    this.productsLink = page.getByRole('link', {
      name: 'Products',
    });

    this.signupLoginLink = page.getByRole('link', {
      name: /Signup \/ Login/i,
    });

    this.cartLink = page.getByRole('link', {
      name: /Cart/i,
    });
  }

  async open(): Promise<void> {
    await this.page.goto('/');
  }

  async validateLoaded(): Promise<void> {
    await expect(this.page).toHaveTitle(/Automation Exercise/i);
    await expect(this.logo).toBeVisible();
    await expect(this.productsLink).toBeVisible();
    await expect(this.signupLoginLink).toBeVisible();
  }

  async goToAuthentication(): Promise<void> {
    await this.signupLoginLink.click();
  }
}
