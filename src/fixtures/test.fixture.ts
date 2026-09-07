import { test as base, expect } from '@playwright/test';

import type { TestUser } from '../data/models/user.model';
import { UserFactory } from '../data/factories/user.factory';

import { AccountApi } from '../services/account.api';

import { AuthenticationPage } from '../pages/authentication.page';
import { HomePage } from '../pages/home.page';

type ApplicationFixtures = {
  homePage: HomePage;
  authenticationPage: AuthenticationPage;
  accountApi: AccountApi;
  registeredUser: TestUser;
};

export const test = base.extend<ApplicationFixtures>({
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },

  authenticationPage: async ({ page }, use) => {
    await use(new AuthenticationPage(page));
  },

  accountApi: async ({ request }, use) => {
    await use(new AccountApi(request));
  },

  registeredUser: async ({ accountApi }, use) => {
    const user = UserFactory.create();

    await accountApi.createAccount(user);

    await use(user);

    await accountApi.deleteAccount(user);
  },
});

export { expect };
