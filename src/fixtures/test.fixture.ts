import { test as base, expect } from '@playwright/test';

import type { TestUser } from '../data/models/user.model';
import { UserFactory } from '../data/factories/user.factory';

import { shouldBlockThirdPartyRequest } from '../config/third-party-network';

import { AccountApi } from '../services/account.api';

import { AuthenticationPage } from '../pages/authentication.page';
import { HomePage } from '../pages/home.page';
import { ProductDetailsPage } from '../pages/product-details.page';
import { ProductsPage } from '../pages/products.page';
import { RegistrationPage } from '../pages/registration.page';

type ApplicationFixtures = {
  homePage: HomePage;
  authenticationPage: AuthenticationPage;
  registrationPage: RegistrationPage;
  productsPage: ProductsPage;
  productDetailsPage: ProductDetailsPage;
  accountApi: AccountApi;

  testUser: TestUser;
  registeredUser: TestUser;

  thirdPartyNetworkControl: void;
};

export const test = base.extend<ApplicationFixtures>({
  thirdPartyNetworkControl: [
    async ({ page }, use) => {
      await page.route('**/*', async (route) => {
        const requestUrl = route.request().url();

        if (shouldBlockThirdPartyRequest(requestUrl)) {
          await route.abort();
          return;
        }

        await route.continue();
      });

      await use();
    },
    {
      auto: true,
    },
  ],

  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },

  authenticationPage: async ({ page }, use) => {
    await use(new AuthenticationPage(page));
  },

  registrationPage: async ({ page }, use) => {
    await use(new RegistrationPage(page));
  },

  productsPage: async ({ page }, use) => {
    await use(new ProductsPage(page));
  },

  productDetailsPage: async ({ page }, use) => {
    await use(new ProductDetailsPage(page));
  },

  accountApi: async ({ request }, use) => {
    await use(new AccountApi(request));
  },

  testUser: async ({ accountApi }, use) => {
    const user = UserFactory.create();

    await use(user);

    await accountApi.deleteAccountIfExists(user);
  },

  registeredUser: async ({ accountApi }, use) => {
    const user = UserFactory.create();

    await accountApi.createAccount(user);

    await use(user);

    await accountApi.deleteAccount(user);
  },
});

export { expect };
