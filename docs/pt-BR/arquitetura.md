# Arquitetura da Automação

## Objetivo

A arquitetura foi desenhada para separar intenção de teste, interação com interface, geração de dados e integração com APIs.

## Camadas

~~~text
Test Specifications
       |
       v
Custom Fixtures
       |
       +----------------------+
       |                      |
       v                      v
Page Objects           Test Data
       |                Factories
       v                      |
Component Objects             v
       |                 API Services
       +-----------+----------+
                   |
                   v
               Playwright
~~~

## Page Objects

Representam páginas completas da aplicação.

Responsabilidades:

- locators
- navegação
- interações
- validações específicas da página

## Component Objects

Representam componentes reutilizáveis.

Exemplos atuais:

- ProductCard
- CartItem
- CartModal

Isso evita concentrar toda a lógica em Page Objects muito grandes.

## Fixtures

As fixtures são utilizadas como camada de injeção de dependências e gerenciamento de lifecycle.

Elas podem:

- criar Page Objects
- criar componentes
- criar serviços
- preparar massa
- executar cleanup
- aplicar configuração automática ao browser

## Test Data Factories

Dados sintéticos são criados dinamicamente.

Os testes não dependem de usuários pessoais ou contas cadastradas manualmente.

## API Services

A API pode ser utilizada para preparar ou limpar dados quando a API não é o objeto principal da validação.

Exemplo:

~~~text
API cria usuário
      |
      v
UI valida login
      |
      v
API remove usuário
~~~

## Princípios

A arquitetura prioriza:

- legibilidade
- isolamento
- reutilização
- baixo acoplamento
- diagnóstico
- paralelismo
- manutenção previsível
