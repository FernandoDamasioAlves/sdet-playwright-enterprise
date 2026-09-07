# Estratégia de Testes

## Objetivo

Validar fluxos críticos de negócio com diferentes níveis de cobertura e priorização.

## Smoke

Tag:

~~~text
@smoke
~~~

Representa fluxos essenciais da aplicação.

## Regression

Tag:

~~~text
@regression
~~~

Representa cenários de maior profundidade funcional.

## Tags por domínio

A suíte utiliza tags como:

~~~text
@authentication
@registration
@catalog
@search
@cart
@quantity
@checkout
@e2e
~~~

## Cross-browser

Os cenários principais executam nos engines:

- Chromium
- Firefox
- WebKit

## Isolamento

Cada teste utiliza seu próprio contexto de navegador.

Quando necessário, usuários são criados dinamicamente para evitar dependência de estado compartilhado.

## Dados

Dados pessoais reais não são utilizados.

As factories geram exclusivamente dados sintéticos.

## Known Defects

Defeitos comprovados da aplicação podem permanecer ativos como falhas esperadas.

Isso permite detectar automaticamente quando o comportamento for corrigido.

## Diagnóstico

As falhas podem gerar:

- screenshot
- vídeo
- trace
- error context
- HTML report
