import {
  expect,
  test,
} from '../../../src/fixtures/test.fixture';

test.describe('Catálogo - Produtos', () => {
  test(
    'deve exibir a listagem de produtos',
    {
      tag: ['@smoke', '@catalog'],
    },
    async ({
      homePage,
      productsPage,
    }) => {
      await homePage.open();
      await homePage.goToProducts();

      await productsPage.validateLoaded();

      const productCount = await productsPage.getProductCount();

      expect(productCount).toBeGreaterThan(0);
    },
  );

  test(
    'deve exibir os detalhes do primeiro produto',
    {
      tag: ['@regression', '@catalog'],
    },
    async ({
      homePage,
      productsPage,
      productDetailsPage,
    }) => {
      await homePage.open();
      await homePage.goToProducts();

      await productsPage.validateLoaded();
      await productsPage.openFirstProduct();

      await productDetailsPage.validateLoaded();
      await productDetailsPage.validateFirstProduct();
    },
  );

  test(
    'deve pesquisar produtos por nome',
    {
      tag: ['@smoke', '@catalog', '@search', '@known-defect'],
    },
    async ({
      homePage,
      productsPage,
    }) => {
      test.fail(
        true,
        'Defeito conhecido: a busca retorna produtos não relacionados ao termo pesquisado.',
      );

      await homePage.open();
      await homePage.goToProducts();

      await productsPage.validateLoaded();

      await productsPage.search('top');

      await productsPage.validateSearchResults();

      await productsPage.validateAllResultsContain('top');
    },
  );
});
