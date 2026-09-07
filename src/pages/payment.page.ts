import { stat } from 'node:fs/promises';

import {
  expect,
  type Locator,
  type Page,
} from '@playwright/test';

import type { PaymentData } from '../data/models/payment.model';

export class PaymentPage {
  readonly page: Page;

  readonly nameOnCardInput: Locator;
  readonly cardNumberInput: Locator;
  readonly cvcInput: Locator;
  readonly expiryMonthInput: Locator;
  readonly expiryYearInput: Locator;

  readonly payButton: Locator;
  readonly confirmationMessage: Locator;
  readonly downloadInvoiceButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.nameOnCardInput = page.locator(
      '[data-qa="name-on-card"]',
    );

    this.cardNumberInput = page.locator(
      '[data-qa="card-number"]',
    );

    this.cvcInput = page.locator(
      '[data-qa="cvc"]',
    );

    this.expiryMonthInput = page.locator(
      '[data-qa="expiry-month"]',
    );

    this.expiryYearInput = page.locator(
      '[data-qa="expiry-year"]',
    );

    this.payButton = page.locator(
      '[data-qa="pay-button"]',
    );

    this.confirmationMessage = page.getByText(
      'Congratulations! Your order has been confirmed!',
      {
        exact: true,
      },
    );

    this.downloadInvoiceButton = page.getByText(
      'Download Invoice',
      {
        exact: true,
      },
    );
  }

  async validateLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(
      /\/payment(?:[?#]|$)/,
    );

    await expect(
      this.nameOnCardInput,
    ).toBeVisible();

    await expect(
      this.cardNumberInput,
    ).toBeVisible();

    await expect(this.payButton).toBeVisible();
  }

  async fillPayment(data: PaymentData): Promise<void> {
    await this.nameOnCardInput.fill(
      data.nameOnCard,
    );

    await this.cardNumberInput.fill(
      data.cardNumber,
    );

    await this.cvcInput.fill(data.cvc);

    await this.expiryMonthInput.fill(
      data.expiryMonth,
    );

    await this.expiryYearInput.fill(
      data.expiryYear,
    );
  }

  async confirmOrder(): Promise<void> {
    await this.payButton.click();
  }

  async validateOrderConfirmed(): Promise<void> {
    await expect(
      this.confirmationMessage,
    ).toBeVisible();
  }

  async downloadAndValidateInvoice(): Promise<void> {
    await expect(
      this.downloadInvoiceButton,
    ).toBeVisible();

    const downloadPromise =
      this.page.waitForEvent('download');

    await this.downloadInvoiceButton.click();

    const download = await downloadPromise;

    const suggestedFilename =
      download.suggestedFilename();

    expect(
      suggestedFilename.toLowerCase(),
    ).toContain('invoice');

    const downloadPath = await download.path();

    expect(downloadPath).not.toBeNull();

    if (!downloadPath) {
      throw new Error(
        'O arquivo de invoice não foi disponibilizado pelo navegador.',
      );
    }

    const fileStats = await stat(downloadPath);

    expect(fileStats.size).toBeGreaterThan(0);
  }
}
