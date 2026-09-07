# Known Issues

## KD-001 — Product search returns unrelated items

**Status:** Open  
**Severity:** Medium  
**Area:** Catalog / Search  
**Detected by:** Playwright automation

### Scenario

When searching for products using the term `top`, the application displays
the `SEARCHED PRODUCTS` section.

### Expected result

Every returned product should be related to the search term.

### Actual result

The application also returns products unrelated to `top`, such as:

- Little Girls Mr. Panda Shirt

### Impact

The search engine returns irrelevant results and does not meet the expected
behavior described by the application's official test scenario.

### Automation

The automated scenario remains active and is tagged with:

- `@search`
- `@known-defect`

The failure is declared as expected until the application behavior is fixed.

If the defect is corrected, the test will unexpectedly pass, signaling that
the known-defect declaration must be removed.
