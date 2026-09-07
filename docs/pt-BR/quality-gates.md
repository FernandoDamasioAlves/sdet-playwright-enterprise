# Quality Gates

O projeto utiliza verificações mínimas antes da integração de mudanças.

## TypeScript

~~~bash
npm run typecheck
~~~

Deve finalizar com zero erros.

## Regressão

~~~bash
npm test
~~~

Todos os cenários devem atingir seu estado esperado.

## Cross-browser

Os principais fluxos devem executar em:

- Chromium
- Firefox
- WebKit

## Git

Antes de um commit:

~~~bash
git diff --check
~~~

O comando não deve indicar problemas de whitespace.

## Known Defects

Cenários classificados como defeitos conhecidos permanecem monitorados.

Se um cenário marcado como falha esperada começar a passar, sua classificação deve ser revisada.

## Diagnóstico antes da correção

Falhas devem ser investigadas usando evidências antes de aumentar timeouts, retries ou alterar locators.
