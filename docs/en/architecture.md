# Test Architecture

The framework separates test intent from implementation details.

~~~text
Tests
  |
Custom Fixtures
  |
  +------------------+
  |                  |
Page Objects      Test Data
  |               Factories
Components           |
  |               API Services
  +--------+---------+
           |
       Playwright
~~~

The architecture prioritizes:

- readability
- isolation
- reusability
- low coupling
- diagnostics
- parallel execution
- maintainability
