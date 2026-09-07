import { test } from '../../../src/fixtures/test.fixture';

test.describe('Autenticação - Login', () => {
  test(
    'deve autenticar usuário com credenciais válidas',
    {
      tag: ['@smoke', '@authentication'],
    },
    async ({
      homePage,
      authenticationPage,
      registeredUser,
    }) => {
      await homePage.open();
      await homePage.goToAuthentication();

      await authenticationPage.validateLoaded();

      await authenticationPage.login(
        registeredUser.email,
        registeredUser.password,
      );

      await authenticationPage.validateAuthenticatedUser(
        registeredUser.name,
      );
    },
  );

  test(
    'deve rejeitar credenciais inválidas',
    {
      tag: ['@regression', '@authentication'],
    },
    async ({
      homePage,
      authenticationPage,
    }) => {
      await homePage.open();
      await homePage.goToAuthentication();

      await authenticationPage.validateLoaded();

      await authenticationPage.login(
        `invalid.${Date.now()}@example.com`,
        'InvalidPassword123!',
      );

      await authenticationPage.validateInvalidCredentials();
    },
  );
});
