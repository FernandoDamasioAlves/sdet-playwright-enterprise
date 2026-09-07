import {
  expect,
  type Locator,
  type Page,
} from '@playwright/test';

import type { TestUser } from '../data/models/user.model';

export class RegistrationPage {
  readonly page: Page;

  readonly signupTitle: Locator;
  readonly signupNameInput: Locator;
  readonly signupEmailInput: Locator;
  readonly signupButton: Locator;

  readonly accountInformationTitle: Locator;
  readonly passwordInput: Locator;
  readonly daysSelect: Locator;
  readonly monthsSelect: Locator;
  readonly yearsSelect: Locator;
  readonly newsletterCheckbox: Locator;
  readonly offersCheckbox: Locator;

  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly companyInput: Locator;
  readonly address1Input: Locator;
  readonly address2Input: Locator;
  readonly countrySelect: Locator;
  readonly stateInput: Locator;
  readonly cityInput: Locator;
  readonly zipcodeInput: Locator;
  readonly mobileNumberInput: Locator;

  readonly createAccountButton: Locator;
  readonly accountCreatedTitle: Locator;
  readonly continueButton: Locator;
  readonly existingEmailMessage: Locator;

  constructor(page: Page) {
    this.page = page;

    this.signupTitle = page.getByText('New User Signup!', {
      exact: true,
    });

    this.signupNameInput = page.locator('[data-qa="signup-name"]');
    this.signupEmailInput = page.locator('[data-qa="signup-email"]');
    this.signupButton = page.locator('[data-qa="signup-button"]');

    this.accountInformationTitle = page.getByText(
      'Enter Account Information',
      { exact: false },
    );

    this.passwordInput = page.locator('#password');
    this.daysSelect = page.locator('#days');
    this.monthsSelect = page.locator('#months');
    this.yearsSelect = page.locator('#years');

    this.newsletterCheckbox = page.locator('#newsletter');
    this.offersCheckbox = page.locator('#optin');

    this.firstNameInput = page.locator('#first_name');
    this.lastNameInput = page.locator('#last_name');
    this.companyInput = page.locator('#company');
    this.address1Input = page.locator('#address1');
    this.address2Input = page.locator('#address2');
    this.countrySelect = page.locator('#country');
    this.stateInput = page.locator('#state');
    this.cityInput = page.locator('#city');
    this.zipcodeInput = page.locator('#zipcode');
    this.mobileNumberInput = page.locator('#mobile_number');

    this.createAccountButton = page.locator(
      '[data-qa="create-account"]',
    );

    this.accountCreatedTitle = page.getByText(
      'Account Created!',
      { exact: true },
    );

    this.continueButton = page.locator(
      '[data-qa="continue-button"]',
    );

    this.existingEmailMessage = page.getByText(
      'Email Address already exist!',
      { exact: true },
    );
  }

  async validateSignupLoaded(): Promise<void> {
    await expect(this.signupTitle).toBeVisible();
    await expect(this.signupNameInput).toBeVisible();
    await expect(this.signupEmailInput).toBeVisible();
  }

  async startSignup(user: TestUser): Promise<void> {
    await this.signupNameInput.fill(user.name);
    await this.signupEmailInput.fill(user.email);
    await this.signupButton.click();
  }

  async validateAccountInformationLoaded(): Promise<void> {
    await expect(this.accountInformationTitle).toBeVisible();
  }

  async fillAccountInformation(user: TestUser): Promise<void> {
    if (user.title === 'Mr') {
      await this.page.locator('#id_gender1').check();
    } else {
      await this.page.locator('#id_gender2').check();
    }

    await this.passwordInput.fill(user.password);

    await this.daysSelect.selectOption(user.birthDate);
    await this.monthsSelect.selectOption(user.birthMonth);
    await this.yearsSelect.selectOption(user.birthYear);

    await this.newsletterCheckbox.check();
    await this.offersCheckbox.check();

    await this.firstNameInput.fill(user.firstName);
    await this.lastNameInput.fill(user.lastName);
    await this.companyInput.fill(user.company);
    await this.address1Input.fill(user.address1);
    await this.address2Input.fill(user.address2);

    await this.countrySelect.selectOption({
      label: user.country,
    });

    await this.stateInput.fill(user.state);
    await this.cityInput.fill(user.city);
    await this.zipcodeInput.fill(user.zipcode);
    await this.mobileNumberInput.fill(user.mobileNumber);
  }

  async createAccount(): Promise<void> {
    await this.createAccountButton.click();
  }

  async validateAccountCreated(): Promise<void> {
    await expect(this.accountCreatedTitle).toBeVisible();
  }

  async continueAfterCreation(): Promise<void> {
    await this.continueButton.click();
  }

  async validateExistingEmailError(): Promise<void> {
    await expect(this.existingEmailMessage).toBeVisible();
  }
}
