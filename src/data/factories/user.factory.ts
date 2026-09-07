import type { TestUser } from '../models/user.model';

export class UserFactory {
  static create(): TestUser {
    const uniqueId = `${Date.now()}-${Math.floor(Math.random() * 1_000_000)}`;

    return {
      name: 'QA Automation',
      email: `qa.automation.${uniqueId}@example.com`,
      password: 'Test@12345',
      title: 'Mr',
      birthDate: '15',
      birthMonth: '6',
      birthYear: '1990',
      firstName: 'QA',
      lastName: 'Automation',
      company: 'Quality Engineering Lab',
      address1: '123 Automation Street',
      address2: 'Quality District',
      country: 'Canada',
      zipcode: '10000',
      state: 'Ontario',
      city: 'Toronto',
      mobileNumber: '5551234567',
    };
  }
}
