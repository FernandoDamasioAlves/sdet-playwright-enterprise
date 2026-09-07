# Defeitos conhecidos

## KD-001 — Busca de produtos retorna itens não relacionados

**Status:** Aberto  
**Severidade:** Média  
**Área:** Catálogo / Busca  
**Detectado por:** Automação Playwright

### Cenário

Ao pesquisar produtos utilizando o termo `top`, a aplicação exibe a seção
`SEARCHED PRODUCTS`.

### Resultado esperado

Todos os produtos retornados devem estar relacionados ao termo pesquisado.

### Resultado observado

Além de produtos relacionados a `top`, a aplicação retorna produtos sem
relação com o termo, como:

- Little Girls Mr. Panda Shirt

### Impacto

O mecanismo de busca retorna resultados irrelevantes e não atende ao
comportamento esperado descrito no cenário oficial de testes da aplicação.

### Automação

O cenário permanece ativo e marcado com:

- `@search`
- `@known-defect`

A falha é tratada como esperada pelo Playwright até que o comportamento da
aplicação seja corrigido.

Quando o defeito for corrigido, o teste passará inesperadamente e indicará
que a marcação de defeito conhecido deve ser removida.
