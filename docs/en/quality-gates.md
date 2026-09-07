# Quality Gates

The project uses automated and manual quality checks to protect the framework without confusing code failures with external environment availability.

## Required Quality Gate

The `Quality Gate` workflow runs automatically on every `push` and `pull_request` targeting the `main` branch.

### TypeScript

~~~bash
npm run typecheck
~~~

The validation must finish with zero compilation errors.

### Chromium regression

~~~bash
npx playwright test --project=chromium --workers=1
~~~

Scenarios must reach their expected states.

This is the mandatory E2E gate for the main CI pipeline.

## Complete local regression

The entire supported matrix can be executed with:

~~~bash
npm test
~~~

The current suite contains:

~~~text
12 scenarios
x 3 browser engines
= 36 executions
~~~

Supported engines:

- Chromium
- Firefox
- WebKit

## External cross-browser validation

Firefox and WebKit remain supported by the framework.

In GitHub Actions, these engines can be executed individually through the on-demand `Cross-Browser Validation` workflow.

The system under test is a public third-party application. During CI implementation, public runners occasionally received anti-bot HTML responses where JSON was normally expected, as well as the intermediary `One moment, please...` page.

For this reason, external environment availability and protection mechanisms are not part of the required branch gate.

This separation preserves cross-browser coverage without treating third-party instability as a false framework defect.

## Git

Before committing changes:

~~~bash
git diff --check
~~~

The command must report no whitespace errors.

## Known defects

Known defects remain explicitly monitored through expected-failure behavior.

If an expected failure starts passing, its classification must be reviewed.

Assertions must not be weakened only to keep the pipeline green.

## Diagnose before changing

Failures must be investigated using available evidence before:

- increasing timeouts;
- increasing retries;
- changing locators;
- weakening assertions;
- classifying a failure as a framework defect.

Screenshots, videos, traces, HTML reports and CI logs are part of this investigation process.
