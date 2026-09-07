import {
  expect,
  type APIRequestContext,
  type APIResponse,
} from '@playwright/test';

import type { TestUser } from '../data/models/user.model';

type AutomationExerciseResponse = {
  responseCode: number;
  message: string;
};

export class AccountApi {
  constructor(private readonly request: APIRequestContext) {}

  async createAccount(user: TestUser): Promise<void> {
    const response = await this.request.post('/api/createAccount', {
      form: this.toAccountForm(user),
    });

    const body = await this.parseResponse(response);

    expect(
      body.responseCode,
      `Falha ao criar usuário: ${body.message}`,
    ).toBe(201);

    expect(body.message).toBe('User created!');
  }

  async deleteAccount(user: TestUser): Promise<void> {
    const response = await this.request.delete('/api/deleteAccount', {
      form: {
        email: user.email,
        password: user.password,
      },
    });

    const body = await this.parseResponse(response);

    expect(
      body.responseCode,
      `Falha ao excluir usuário: ${body.message}`,
    ).toBe(200);

    expect(body.message).toBe('Account deleted!');
  }

  private toAccountForm(user: TestUser): Record<string, string> {
    return {
      name: user.name,
      email: user.email,
      password: user.password,
      title: user.title,
      birth_date: user.birthDate,
      birth_month: user.birthMonth,
      birth_year: user.birthYear,
      firstname: user.firstName,
      lastname: user.lastName,
      company: user.company,
      address1: user.address1,
      address2: user.address2,
      country: user.country,
      zipcode: user.zipcode,
      state: user.state,
      city: user.city,
      mobile_number: user.mobileNumber,
    };
  }

  private async parseResponse(
    response: APIResponse,
  ): Promise<AutomationExerciseResponse> {
    expect(response.ok()).toBeTruthy();

    return (await response.json()) as AutomationExerciseResponse;
  }
}
