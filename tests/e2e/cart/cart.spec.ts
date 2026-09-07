import {
  expect,
  test,
} from '../../../src/fixtures/test.fixture';

test.describe('Carrinho de compras', () => {
  test(
    'deve adicionar dois produtos e validar preço, quantidade e total',
    {
      tag: ['@smoke', '@cart'],
    },
    async ({
      homePage,
      productsPage,
      cartModal,
      cartPage,
    }) => {
      await homePage.open();
      await homePage.goToProducts();

      await productsPage.validateLoaded();

      const firstProduct = productsPage.productAt(0);

      const firstReference =
        await firstProduct.getReference();

      await firstProduct.addToCart();

      await cartModal.continueShopping();

      const secondProduct = productsPage.productAt(1);

      const secondReference =
        await secondProduct.getReference();

      await secondProduct.addToCart();

      await cartModal.viewCart();

      await cartPage.validateLoaded();

      expect(await cartPage.getItemCount()).toBe(2);

      await cartPage.validateItem({
        ...firstReference,
        quantity: 1,
        total: firstReference.price,
      });

      await cartPage.validateItem({
        ...secondReference,
        quantity: 1,
        total: secondReference.price,
      });
    },
  );

  test(
    'deve manter no carrinho a quantidade selecionada no detalhe do produto',
    {
      tag: ['@regression', '@cart', '@quantity'],
    },
    async ({
      homePage,
      productsPage,
      productDetailsPage,
      cartModal,
      cartPage,
    }) => {
      const quantity = 4;

      await homePage.open();
      await homePage.goToProducts();

      await productsPage.validateLoaded();
      await productsPage.openFirstProduct();

      await productDetailsPage.validateLoaded();

      const product =
        await productDetailsPage.getReference();

      await productDetailsPage.setQuantity(quantity);

      await productDetailsPage.addToCart();

      await cartModal.viewCart();

      await cartPage.validateLoaded();

      await cartPage.validateItem({
        ...product,
        quantity,
        total: product.price * quantity,
      });
    },
  );
});
