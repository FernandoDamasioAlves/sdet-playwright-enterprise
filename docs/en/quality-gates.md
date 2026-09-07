# Quality Gates

Changes must satisfy:

~~~bash
npm run typecheck
npm test
git diff --check
~~~

Critical flows must execute successfully across:

- Chromium
- Firefox
- WebKit

Known defects remain monitored through explicit expected-failure behavior.

Failures should be diagnosed using available evidence before retries, timeouts or locators are changed.
