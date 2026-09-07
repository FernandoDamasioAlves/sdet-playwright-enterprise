import { test } from '../../src/fixtures/test.fixture';

test.describe('Página inicial', () => {
  test(
    '@smoke deve carregar os principais elementos da aplicação',
    async ({ homePage }) => {
      await homePage.open();

      await homePage.validateLoaded();
    },
  );
});
