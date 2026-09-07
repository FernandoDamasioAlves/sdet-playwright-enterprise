# Quality Gates

O projeto utiliza verificações automáticas e manuais para proteger a qualidade do framework sem confundir falhas do código com indisponibilidade do ambiente externo.

## Quality Gate obrigatório

O workflow `Quality Gate` é executado automaticamente em `push` e `pull_request` para a branch `main`.

### TypeScript

~~~bash
npm run typecheck
~~~

A validação deve finalizar com zero erros de compilação.

### Regressão Chromium

~~~bash
npx playwright test --project=chromium --workers=1
~~~

Os cenários devem atingir seus estados esperados.

Esse é o gate E2E obrigatório do pipeline principal.

## Regressão local completa

Para executar toda a matriz suportada:

~~~bash
npm test
~~~

A suíte atual possui:

~~~text
12 cenários
x 3 engines
= 36 execuções
~~~

Engines suportadas:

- Chromium
- Firefox
- WebKit

## Validação cross-browser externa

Firefox e WebKit permanecem cobertos pelo framework.

No GitHub Actions, essas engines são executadas individualmente através do workflow `Cross-Browser Validation`, acionado sob demanda.

O sistema sob teste é uma aplicação pública de terceiros. Durante a implantação do CI foram observadas respostas HTML de proteção anti-bot em chamadas que normalmente retornam JSON, além da página intermediária `One moment, please...`.

Por esse motivo, disponibilidade e mecanismos de proteção do ambiente externo não fazem parte do gate obrigatório da branch.

Essa separação mantém a cobertura cross-browser sem transformar instabilidade de um sistema externo em falso defeito do framework.

## Git

Antes de um commit:

~~~bash
git diff --check
~~~

O comando não deve indicar problemas de whitespace.

## Known Defects

Cenários classificados como defeitos conhecidos permanecem monitorados explicitamente.

Se um cenário marcado como falha esperada começar a passar, sua classificação deve ser revisada.

Assertions não devem ser enfraquecidas apenas para manter o pipeline verde.

## Diagnóstico antes da correção

Falhas devem ser investigadas com as evidências disponíveis antes de:

- aumentar timeouts;
- aumentar retries;
- alterar locators;
- flexibilizar assertions;
- classificar uma falha como problema do framework.

Screenshots, vídeos, traces, relatórios HTML e logs do CI fazem parte desse processo.
