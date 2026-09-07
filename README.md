# SDET Playwright Enterprise

[![Quality Gate](https://github.com/FernandoDamasioAlves/sdet-playwright-enterprise/actions/workflows/playwright.yml/badge.svg)](https://github.com/FernandoDamasioAlves/sdet-playwright-enterprise/actions/workflows/playwright.yml)

Framework de automação desenvolvido para demonstrar práticas modernas de **Quality Engineering, QA Automation e SDET** utilizando Playwright e TypeScript.

[English version](README.en.md)

## Visão geral

Este projeto foi construído para demonstrar uma arquitetura de automação próxima de ambientes corporativos, com foco em legibilidade, isolamento, reutilização, diagnóstico e execução cross-browser.

O ambiente funcional utilizado é o **Automation Exercise**, uma aplicação pública destinada à prática de automação de testes.

## Stack

- Playwright
- TypeScript
- Node.js
- GitHub Actions
- Chromium
- Firefox
- WebKit

## Engenharia aplicada

- Page Object Model
- Component Objects
- Fixtures customizadas
- Test Data Factories
- preparação de massa via API
- cleanup automático de dados
- execução paralela
- testes cross-browser
- smoke e regression suites
- known-defect monitoring
- controle de conteúdo third-party
- validação real de downloads
- TypeScript strict

## Cobertura atual

### Página inicial

- carregamento da aplicação
- validação dos principais elementos

### Autenticação

- login válido
- login inválido
- logout
- criação dinâmica de usuário
- cleanup automático

### Cadastro

- cadastro completo pela interface
- tentativa de cadastro com e-mail existente

### Catálogo

- listagem de produtos
- detalhes do produto
- busca
- monitoramento de defeito conhecido

### Carrinho

- inclusão de múltiplos produtos
- validação de preço
- quantidade
- total
- validação matemática do total

### Checkout E2E

- autenticação
- produto
- carrinho
- checkout
- endereço de entrega
- endereço de cobrança
- pagamento sintético
- confirmação do pedido
- download e validação da invoice

## Execução cross-browser

A suíte completa suporta três engines:

- Chromium
- Firefox
- WebKit

Em execução local, a regressão completa possui:

~~~text
12 cenários
x 3 engines
= 36 execuções
~~~

### Quality Gate obrigatório

Em `push` e `pull_request` para `main`, o GitHub Actions executa:

~~~text
TypeScript Quality Gate
        |
        v
Chromium Regression
~~~

O Chromium é utilizado como engine do gate obrigatório por fornecer uma execução estável contra o ambiente público utilizado pelo projeto.

### Validação cross-browser externa

Firefox e WebKit permanecem cobertos pelo framework e podem ser executados individualmente pelo workflow `Cross-Browser Validation`.

Essa validação é executada sob demanda porque o sistema utilizado nos testes é uma aplicação pública de terceiros. Durante a implantação do CI foram observadas respostas de proteção anti-bot e páginas intermediárias do ambiente externo em runners públicos do GitHub Actions.

A separação evita classificar indisponibilidade ou proteção do ambiente externo como defeito do framework, sem remover a cobertura cross-browser.

## Arquitetura

~~~text
tests
  |
  v
custom fixtures
  |
  +--------------------+
  |                    |
  v                    v
Page Objects      Test Data Factories
  |                    |
  v                    v
Component Objects    API Services
  |                    |
  +----------+---------+
             |
             v
        Playwright
             |
      +------+------+
      |      |      |
      v      v      v
 Chromium Firefox WebKit
~~~

## Instalação

Pré-requisitos:

~~~text
Node.js 24+
npm
Git
~~~

Instale as dependências:

~~~bash
npm ci
npx playwright install
~~~

## Executando os testes

Regressão completa:

~~~bash
npm test
~~~

Smoke:

~~~bash
npm run test:smoke
~~~

Autenticação:

~~~bash
npm run test:auth
~~~

Cadastro:

~~~bash
npm run test:registration
~~~

Catálogo:

~~~bash
npm run test:catalog
~~~

Carrinho:

~~~bash
npm run test:cart
~~~

Checkout:

~~~bash
npm run test:checkout
~~~

Somente Chromium:

~~~bash
npm run test:chromium
~~~

Modo visual:

~~~bash
npm run test:headed
~~~

Playwright UI:

~~~bash
npm run test:ui
~~~

Validação TypeScript:

~~~bash
npm run typecheck
~~~

Relatório HTML:

~~~bash
npm run report
~~~

## Gestão de massa

Os testes que precisam de usuários não dependem de contas cadastradas manualmente.

~~~text
UserFactory
    |
    v
dados sintéticos
    |
    v
Account API
    |
    v
usuário criado
    |
    v
teste UI
    |
    v
cleanup automático
~~~

Isso aumenta o isolamento dos testes e reduz a dependência de massa estática.

## Known Defects

Defeitos reais detectados pela automação permanecem monitorados em vez de terem suas assertions enfraquecidas apenas para manter a suíte verde.

O cenário atual **KD-001** monitora o comportamento da busca que retorna produtos não relacionados ao termo pesquisado.

Veja: [Defeitos conhecidos](docs/pt-BR/defeitos-conhecidos.md)

## Diagnóstico de falhas

Quando um teste falha, o framework pode preservar automaticamente:

- screenshot
- vídeo
- trace em retry
- contexto de erro
- relatório HTML

## Estrutura do projeto

~~~text
src/
├── components/
├── config/
├── data/
│   ├── factories/
│   └── models/
├── fixtures/
├── pages/
├── services/
└── utils/

tests/
└── e2e/
    ├── authentication/
    ├── cart/
    ├── catalog/
    └── checkout/

docs/
├── pt-BR/
└── en/
~~~

## Objetivo

Este projeto faz parte de um portfólio voltado a posições de:

- QA Engineer
- QA Automation Engineer
- SDET
- Quality Engineer
- Test Automation Engineer

O foco é demonstrar automação como disciplina de engenharia, e não apenas como execução de scripts de teste.

## Autor

**Fernando Damasio**

Quality Engineering | QA | SDET
