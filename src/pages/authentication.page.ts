import { expect, type Locator, type Page } from '@playwright/test';

export class AuthenticationPage {
  readonly page: Page;

  readonly loginTitle: Locator;
  readonly loginEmailInput: Locator;
  readonly loginPasswordInput: Locator;
  readonly loginButton: Locator;

  readonly invalidCredentialsMessage: Locator;
  readonly loggedInIndicator: Locator;
  readonly logoutLink: Locator;

  constructor(page: Page) {
    this.page = page;

    this.loginTitle = page.getByText('Login to your account', {
      exact: true,
    });

    this.loginEmailInput = page.locator('[data-qa="login-email"]');
    this.loginPasswordInput = page.locator('[data-qa="login-password"]');
    this.loginButton = page.locator('[data-qa="login-button"]');

    this.invalidCredentialsMessage = page.getByText(
      'Your email or password is incorrect!',
      { exact: true },
    );

    this.loggedInIndicator = page.getByText(/Logged in as/i);

    this.logoutLink = page.getByRole('link', {
      name: 'Logout',
    });
  }

  async validateLoaded(): Promise<void> {
    await expect(this.loginTitle).toBeVisible();
    await expect(this.loginEmailInput).toBeVisible();
    await expect(this.loginPasswordInput).toBeVisible();
    await expect(this.loginButton).toBeVisible();
  }

  async login(email: string, password: string): Promise<void> {
    await this.loginEmailInput.fill(email);
    await this.loginPasswordInput.fill(password);
    await this.loginButton.click();
  }

  async validateAuthenticatedUser(name: string): Promise<void> {
    await expect(this.loggedInIndicator).toContainText(name);
    await expect(this.logoutLink).toBeVisible();
  }

  async validateInvalidCredentials(): Promise<void> {
    await expect(this.invalidCredentialsMessage).toBeVisible();
  }

  async logout(): Promise<void> {
    await this.logoutLink.click();
  }
}
