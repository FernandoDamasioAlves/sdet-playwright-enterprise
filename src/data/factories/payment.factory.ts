import type { PaymentData } from '../models/payment.model';

export class PaymentFactory {
  static create(): PaymentData {
    return {
      nameOnCard: 'QA Automation',
      cardNumber: '4111111111111111',
      cvc: '123',
      expiryMonth: '12',
      expiryYear: '2030',
    };
  }
}
