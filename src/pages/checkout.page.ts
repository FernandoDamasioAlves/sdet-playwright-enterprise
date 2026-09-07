import {
  expect,
  type Locator,
  type Page,
} from '@playwright/test';

import type { TestUser } from '../data/models/user.model';

export class CheckoutPage {
  readonly page: Page;

  readonly addressDetailsTitle: Locator;
  readonly reviewOrderTitle: Locator;

  readonly deliveryAddress: Locator;
  readonly billingAddress: Locator;

  readonly commentInput: Locator;
  readonly placeOrderButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.addressDetailsTitle = page.getByText(
      'Address Details',
      { exact: true },
    );

    this.reviewOrderTitle = page.getByText(
      'Review Your Order',
      { exact: true },
    );

    this.deliveryAddress = page.locator(
      '#address_delivery',
    );

    this.billingAddress = page.locator(
      '#address_invoice',
    );

    this.commentInput = page.locator(
      'textarea[name="message"]',
    );

    this.placeOrderButton = page.getByRole('link', {
      name: 'Place Order',
    });
  }

  async validateLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(
      /\/checkout(?:[?#]|$)/,
    );

    await expect(
      this.addressDetailsTitle,
    ).toBeVisible();

    await expect(
      this.reviewOrderTitle,
    ).toBeVisible();

    await expect(
      this.deliveryAddress,
    ).toBeVisible();

    await expect(
      this.billingAddress,
    ).toBeVisible();
  }

  async validateAddresses(user: TestUser): Promise<void> {
    await this.validateAddress(
      this.deliveryAddress,
      user,
    );

    await this.validateAddress(
      this.billingAddress,
      user,
    );
  }

  async addOrderComment(comment: string): Promise<void> {
    await this.commentInput.fill(comment);

    await expect(this.commentInput).toHaveValue(comment);
  }

  async placeOrder(): Promise<void> {
    await this.placeOrderButton.click();

    await expect(this.page).toHaveURL(
      /\/payment(?:[?#]|$)/,
    );
  }

  private async validateAddress(
    address: Locator,
    user: TestUser,
  ): Promise<void> {
    await expect(address).toContainText(
      user.firstName,
    );

    await expect(address).toContainText(
      user.lastName,
    );

    await expect(address).toContainText(
      user.company,
    );

    await expect(address).toContainText(
      user.address1,
    );

    await expect(address).toContainText(
      user.address2,
    );

    await expect(address).toContainText(
      user.city,
    );

    await expect(address).toContainText(
      user.state,
    );

    await expect(address).toContainText(
      user.zipcode,
    );

    await expect(address).toContainText(
      user.country,
    );

    await expect(address).toContainText(
      user.mobileNumber,
    );
  }
}
