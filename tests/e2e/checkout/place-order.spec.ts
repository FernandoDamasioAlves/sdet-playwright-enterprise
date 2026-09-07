import { PaymentFactory } from '../../../src/data/factories/payment.factory';

import {
  test,
} from '../../../src/fixtures/test.fixture';

test.describe('Checkout - Pedido completo', () => {
  test(
    'deve concluir pedido com usuário autenticado',
    {
      tag: [
        '@smoke',
        '@checkout',
        '@e2e',
      ],
    },
    async ({
      homePage,
      authenticationPage,
      registeredUser,
      productsPage,
      cartModal,
      cartPage,
      checkoutPage,
      paymentPage,
    }) => {
      await test.step(
        'Autenticar usuário',
        async () => {
          await homePage.open();

          await homePage.goToAuthentication();

          await authenticationPage.login(
            registeredUser.email,
            registeredUser.password,
          );

          await authenticationPage.validateAuthenticatedUser(
            registeredUser.name,
          );
        },
      );

      await test.step(
        'Adicionar produto ao carrinho',
        async () => {
          await homePage.goToProducts();

          await productsPage.validateLoaded();

          const product =
            productsPage.productAt(0);

          await product.addToCart();

          await cartModal.viewCart();

          await cartPage.validateLoaded();
        },
      );

      await test.step(
        'Validar checkout e endereços',
        async () => {
          await cartPage.proceedToCheckout();

          await checkoutPage.validateLoaded();

          await checkoutPage.validateAddresses(
            registeredUser,
          );
        },
      );

      await test.step(
        'Enviar pedido para pagamento',
        async () => {
          await checkoutPage.addOrderComment(
            'Pedido automatizado pela suíte de Quality Engineering.',
          );

          await checkoutPage.placeOrder();
        },
      );

      await test.step(
        'Realizar pagamento',
        async () => {
          const payment =
            PaymentFactory.create();

          await paymentPage.validateLoaded();

          await paymentPage.fillPayment(
            payment,
          );

          await paymentPage.confirmOrder();

          await paymentPage.validateOrderConfirmed();
        },
      );

      await test.step(
        'Baixar e validar invoice',
        async () => {
          await paymentPage.downloadAndValidateInvoice();
        },
      );
    },
  );
});
