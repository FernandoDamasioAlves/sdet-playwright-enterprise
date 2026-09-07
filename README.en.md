# SDET Playwright Enterprise

[![Quality Gate](https://github.com/FernandoDamasioAlves/sdet-playwright-enterprise/actions/workflows/playwright.yml/badge.svg)](https://github.com/FernandoDamasioAlves/sdet-playwright-enterprise/actions/workflows/playwright.yml)

Quality Engineering and test automation framework built with **Playwright and TypeScript**.

[Versão em Português](README.md)

## Overview

This project demonstrates a test automation architecture designed around real Quality Engineering and SDET practices.

The goal is not simply to automate test cases, but to build a maintainable, observable and reusable testing framework.

The functional target is **Automation Exercise**, a public application designed for test automation practice.

## Stack

- Playwright
- TypeScript
- Node.js
- GitHub Actions
- Chromium
- Firefox
- WebKit

## Engineering practices

- Page Object Model
- Component Objects
- Custom Fixtures
- Test Data Factories
- API-driven test setup
- Automatic test-data cleanup
- Parallel execution
- Cross-browser testing
- Smoke and regression suites
- Known-defect monitoring
- Third-party network control
- Download validation
- Strict TypeScript

## Current coverage

The suite currently covers:

- Home
- Authentication
- User registration
- Product catalog
- Search
- Shopping cart
- Checkout
- Payment
- Invoice download

## Cross-browser execution

The complete suite supports three browser engines:

- Chromium
- Firefox
- WebKit

When executed locally, the complete regression contains:

~~~text
12 scenarios
x 3 browser engines
= 36 executions
~~~

### Required Quality Gate

On every `push` and `pull_request` targeting `main`, GitHub Actions executes:

~~~text
TypeScript Quality Gate
        |
        v
Chromium Regression
~~~

Chromium is used as the required gate engine because it provides a stable execution against the public environment used by this project.

### External cross-browser validation

Firefox and WebKit remain fully supported by the framework and can be executed individually through the `Cross-Browser Validation` workflow.

This validation is triggered on demand because the system under test is a public third-party application. During CI implementation, public GitHub Actions runners occasionally received anti-bot protection responses and intermediary pages from the external environment.

Separating these executions prevents third-party environment availability or protection mechanisms from being classified as framework defects while preserving cross-browser coverage.

## Architecture

~~~text
Tests
  |
  v
Custom Fixtures
  |
  +--------------------+
  |                    |
  v                    v
Page Objects      Test Data Factories
  |                    |
  v                    v
Components          API Services
  |                    |
  +---------+----------+
            |
            v
       Playwright
            |
      +-----+-----+
      |     |     |
      v     v     v
 Chromium Firefox WebKit
~~~

## Installation

Requirements:

~~~text
Node.js 24+
npm
Git
~~~

Install dependencies:

~~~bash
npm ci
npx playwright install
~~~

## Running tests

Full regression:

~~~bash
npm test
~~~

Smoke:

~~~bash
npm run test:smoke
~~~

Authentication:

~~~bash
npm run test:auth
~~~

Catalog:

~~~bash
npm run test:catalog
~~~

Shopping cart:

~~~bash
npm run test:cart
~~~

Checkout:

~~~bash
npm run test:checkout
~~~

TypeScript validation:

~~~bash
npm run typecheck
~~~

Playwright UI:

~~~bash
npm run test:ui
~~~

HTML report:

~~~bash
npm run report
~~~

## Test data management

Synthetic users are dynamically generated and can be created through the application's API before UI validation.

~~~text
UserFactory
    |
    v
Synthetic data
    |
    v
Account API
    |
    v
User created
    |
    v
UI test
    |
    v
Automatic cleanup
~~~

## Known defects

Real application defects detected by the suite remain actively monitored instead of weakening assertions simply to keep tests green.

Current known defect:

**KD-001 — Product search returns unrelated items.**

See:

[Known Issues](docs/en/known-issues.md)

## Failure diagnostics

Failed tests can preserve:

- screenshots
- videos
- traces
- error context
- HTML reports

## Goal

This repository is part of a Quality Engineering portfolio aimed at roles such as:

- QA Engineer
- QA Automation Engineer
- SDET
- Quality Engineer
- Test Automation Engineer

The project demonstrates test automation as an engineering discipline rather than a collection of test scripts.

## Author

**Fernando Damasio**

Quality Engineering | QA | SDET
