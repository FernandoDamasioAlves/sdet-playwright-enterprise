import { test } from '../../../src/fixtures/test.fixture';

test.describe('Autenticação - Cadastro', () => {
  test(
    'deve cadastrar um novo usuário pela interface',
    {
      tag: ['@smoke', '@authentication', '@registration'],
    },
    async ({
      homePage,
      registrationPage,
      authenticationPage,
      testUser,
    }) => {
      await homePage.open();
      await homePage.goToAuthentication();

      await registrationPage.validateSignupLoaded();

      await registrationPage.startSignup(testUser);

      await registrationPage.validateAccountInformationLoaded();

      await registrationPage.fillAccountInformation(testUser);

      await registrationPage.createAccount();

      await registrationPage.validateAccountCreated();

      await registrationPage.continueAfterCreation();

      await authenticationPage.validateAuthenticatedUser(
        testUser.name,
      );
    },
  );

  test(
    'deve rejeitar cadastro com e-mail já existente',
    {
      tag: ['@regression', '@authentication', '@registration'],
    },
    async ({
      homePage,
      registrationPage,
      registeredUser,
    }) => {
      await homePage.open();
      await homePage.goToAuthentication();

      await registrationPage.validateSignupLoaded();

      await registrationPage.startSignup(registeredUser);

      await registrationPage.validateExistingEmailError();
    },
  );
});
