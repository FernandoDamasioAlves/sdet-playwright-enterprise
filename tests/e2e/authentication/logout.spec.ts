import { test } from '../../../src/fixtures/test.fixture';

test.describe('Autenticação - Logout', () => {
  test(
    'deve encerrar a sessão do usuário autenticado',
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

      await authenticationPage.login(
        registeredUser.email,
        registeredUser.password,
      );

      await authenticationPage.validateAuthenticatedUser(
        registeredUser.name,
      );

      await authenticationPage.logout();

      await authenticationPage.validateLoaded();
    },
  );
});
