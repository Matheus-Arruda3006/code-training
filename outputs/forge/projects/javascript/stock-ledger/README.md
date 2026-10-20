# Razão de estoque e reservas

Linguagem: JavaScript

## Pré-requisitos
Funções, arrays, Promise e async/await.

## 1. Problema
Interpretar action 0 como entrada, 1 como saída e 2 como consulta. Rejeitar saída sem saldo, sem alterá-lo. Saída: saldo após cada evento ou -1 na rejeição.

## 2. Decisão de arquitetura
Separe comandos que alteram estado de consultas. A quantidade é obrigatória no protocolo, mas é ignorada na consulta. Módulos ESM, Number.isSafeInteger, arrays e testes node:test. Separar IO da função pura permite reutilizar o núcleo em um servidor.

## Contrato de dados

TSV com cabeçalho e até 200 registros. Cada campo é um inteiro dentro dos limites inclusivos. Na API .NET, envie as linhas como arrays em data.

| Índice | Campo | Mínimo | Máximo |
|---|---|---|---|
| 0 | sku | 0 | 99 |
| 1 | action | 0 | 2 |
| 2 | quantity | 1 | 10000 |

## Roteiro guiado

1. Defina o contrato: Interpretar action 0 como entrada, 1 como saída e 2 como consulta. Rejeitar saída sem saldo, sem alterá-lo. Saída: saldo após cada evento ou -1 na rejeição.

2. Crie os arquivos de domínio e leia a decisão: Separe comandos que alteram estado de consultas. A quantidade é obrigatória no protocolo, mas é ignorada na consulta.

3. Implemente o adaptador da linguagem: Módulos ESM, Number.isSafeInteger, arrays e testes node:test. Separar IO da função pura permite reutilizar o núcleo em um servidor.

4. Execute os testes antes de usar input.tsv. Os valores esperados são fixos e independentes do retorno calculado.

5. Faça uma extensão autoral: Acrescente idempotency keys para impedir dupla baixa após repetição de mensagens.

## 3. Crie os arquivos
- domain.mjs
- main.mjs
- domain.test.mjs
- package.json
- input.tsv

## 4. Execute na pasta do projeto
```sh
node --test domain.test.mjs
node main.mjs input.tsv
```


## 5. Resultado esperado
```
[10,-1,6,6]
```

## 6. Critérios de aceite
- Caso 1: entrada [[1,0,10],[1,1,12],[1,1,4],[1,2,1]] deve produzir [10,-1,6,6].
- Caso 2: entrada [[0,1,1]] deve produzir [-1].
- Caso 3: entrada [] deve produzir [].
- Rejeitar colunas incorretas, valores fora dos limites e mais de 200 registros.

## 7. Leitura do código
### domain.mjs
Linhas 1: Núcleo de domínio: const cell = (data, row, col) => data[row][col];. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 2: Núcleo de domínio: const minv = Math.min, maxv = Math.max, absv = Math.abs;. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 3: Núcleo de domínio: const quotient = (a, b) => Math.trunc(a / b);. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 4: Núcleo de domínio: export function solve(data) {. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 5: Núcleo de domínio: if (!Array.isArray(data) || data.length > 200) throw new RangeError('Até 200 registros');. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 6: Núcleo de domínio: const bounds = [[0,99],[0,2],[1,10000]];. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 7: Núcleo de domínio: for (const row of data) {. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 8: Núcleo de domínio: if (!Array.isArray(row) || row.length !== bounds.length) throw new RangeError('Colunas inválidas');. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 9: Núcleo de domínio: row.forEach((value, index) => {. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 10: Núcleo de domínio: if (!Number.isSafeInteger(value) || value < bounds[index][0] || value > bounds[index][1]) throw new RangeError('Valor fora do contrato');. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 11: Núcleo de domínio: });. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 12: Núcleo de domínio: }. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 13: Núcleo de domínio: const n = data.length;. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 14: Núcleo de domínio: const out = [];. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 15: Crie um vetor de inteiros inicializado com zeros (stock 100); nenhum estado deve vazar entre chamadas.

Linhas 16: Repita i in 0..n; o limite final é exclusivo. O índice identifica a posição, não um ID de negócio.

Linhas 17: Inicialize a variável local: sku = sku[i]. Ela guarda estado intermediário desta regra.

Linhas 18: Inicialize a variável local: action = action[i]. Ela guarda estado intermediário desta regra.

Linhas 19: Inicialize a variável local: quantity = quantity[i]. Ela guarda estado intermediário desta regra.

Linhas 20: Verifique action == 0. Este ramo só altera o estado quando a condição é verdadeira.

Linhas 21: Atualize o estado com stock[sku] = stock[sku]+quantity. Confira o invariante e o exemplo de mesa no roteiro do projeto.

Linhas 22: Finalize o bloco atual. Variáveis e alterações pertencem à responsabilidade descrita nas linhas anteriores.

Linhas 23: Verifique action == 1 && quantity > stock[sku]. Este ramo só altera o estado quando a condição é verdadeira.

Linhas 24: Acrescente -1 à resposta, preservando a ordem definida no contrato de saída.

Linhas 25: Finalize o bloco atual. Variáveis e alterações pertencem à responsabilidade descrita nas linhas anteriores.

Linhas 26: Trate explicitamente o caminho alternativo; ele só executa quando a condição anterior é falsa.

Linhas 27: Verifique action == 1. Este ramo só altera o estado quando a condição é verdadeira.

Linhas 28: Atualize o estado com stock[sku] = stock[sku]-quantity. Confira o invariante e o exemplo de mesa no roteiro do projeto.

Linhas 29: Finalize o bloco atual. Variáveis e alterações pertencem à responsabilidade descrita nas linhas anteriores.

Linhas 30: Acrescente stock[sku] à resposta, preservando a ordem definida no contrato de saída.

Linhas 31: Finalize o bloco atual. Variáveis e alterações pertencem à responsabilidade descrita nas linhas anteriores.

Linhas 32: Finalize o bloco atual. Variáveis e alterações pertencem à responsabilidade descrita nas linhas anteriores.

Linhas 33: Núcleo de domínio: return out;. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 34: Núcleo de domínio: }. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

### main.mjs
Linhas 1: Adaptador CLI: parsing estrito de TSV, execução e serialização JSON: import { readFileSync } from 'node:fs';. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 2: Adaptador CLI: parsing estrito de TSV, execução e serialização JSON: import { solve } from './domain.mjs';. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 3: Adaptador CLI: parsing estrito de TSV, execução e serialização JSON: const text = readFileSync(process.argv[2] || 'input.tsv', 'utf8').replaceAll('\r', '').trimEnd();. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 4: Adaptador CLI: parsing estrito de TSV, execução e serialização JSON: const [header, ...rows] = text.split('\n');. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 5: Adaptador CLI: parsing estrito de TSV, execução e serialização JSON: if (header !== "sku\taction\tquantity") throw new Error('Cabeçalho inválido');. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 6: Adaptador CLI: parsing estrito de TSV, execução e serialização JSON: const data = rows.filter(Boolean).map(row => row.split('\t').map(value => {. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 7: Adaptador CLI: parsing estrito de TSV, execução e serialização JSON: if (!/^-?\d+$/.test(value)) throw new Error('Inteiro inválido');. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 8: Adaptador CLI: parsing estrito de TSV, execução e serialização JSON: return Number(value);. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 9: Adaptador CLI: parsing estrito de TSV, execução e serialização JSON: }));. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 10: Adaptador CLI: parsing estrito de TSV, execução e serialização JSON: console.log(JSON.stringify(solve(data)));. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

### domain.test.mjs
Linhas 1: Testes independentes: os resultados esperados foram escritos no contrato: import test from 'node:test';. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 2: Testes independentes: os resultados esperados foram escritos no contrato: import assert from 'node:assert/strict';. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 3: Testes independentes: os resultados esperados foram escritos no contrato: import { solve } from './domain.mjs';. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 4: Testes independentes: os resultados esperados foram escritos no contrato: const cases = [. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 5: Testes independentes: os resultados esperados foram escritos no contrato: {. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 6: Testes independentes: os resultados esperados foram escritos no contrato: "input": [. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 7: Testes independentes: os resultados esperados foram escritos no contrato: [. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 8: Testes independentes: os resultados esperados foram escritos no contrato: 1,. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 9: Testes independentes: os resultados esperados foram escritos no contrato: 0,. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 10: Testes independentes: os resultados esperados foram escritos no contrato: 10. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 11: Testes independentes: os resultados esperados foram escritos no contrato: ],. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 12: Testes independentes: os resultados esperados foram escritos no contrato: [. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 13: Testes independentes: os resultados esperados foram escritos no contrato: 1,. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 14: Testes independentes: os resultados esperados foram escritos no contrato: 1,. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 15: Testes independentes: os resultados esperados foram escritos no contrato: 12. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 16: Testes independentes: os resultados esperados foram escritos no contrato: ],. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 17: Testes independentes: os resultados esperados foram escritos no contrato: [. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 18: Testes independentes: os resultados esperados foram escritos no contrato: 1,. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 19: Testes independentes: os resultados esperados foram escritos no contrato: 1,. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 20: Testes independentes: os resultados esperados foram escritos no contrato: 4. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 21: Testes independentes: os resultados esperados foram escritos no contrato: ],. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 22: Testes independentes: os resultados esperados foram escritos no contrato: [. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 23: Testes independentes: os resultados esperados foram escritos no contrato: 1,. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 24: Testes independentes: os resultados esperados foram escritos no contrato: 2,. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 25: Testes independentes: os resultados esperados foram escritos no contrato: 1. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 26: Testes independentes: os resultados esperados foram escritos no contrato: ]. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 27: Testes independentes: os resultados esperados foram escritos no contrato: ],. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 28: Testes independentes: os resultados esperados foram escritos no contrato: "expected": [. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 29: Testes independentes: os resultados esperados foram escritos no contrato: 10,. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 30: Testes independentes: os resultados esperados foram escritos no contrato: -1,. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 31: Testes independentes: os resultados esperados foram escritos no contrato: 6,. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 32: Testes independentes: os resultados esperados foram escritos no contrato: 6. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 33: Testes independentes: os resultados esperados foram escritos no contrato: ]. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 34: Testes independentes: os resultados esperados foram escritos no contrato: },. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 35: Testes independentes: os resultados esperados foram escritos no contrato: {. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 36: Testes independentes: os resultados esperados foram escritos no contrato: "input": [. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 37: Testes independentes: os resultados esperados foram escritos no contrato: [. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 38: Testes independentes: os resultados esperados foram escritos no contrato: 0,. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 39: Testes independentes: os resultados esperados foram escritos no contrato: 1,. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 40: Testes independentes: os resultados esperados foram escritos no contrato: 1. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 41: Testes independentes: os resultados esperados foram escritos no contrato: ]. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 42: Testes independentes: os resultados esperados foram escritos no contrato: ],. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 43: Testes independentes: os resultados esperados foram escritos no contrato: "expected": [. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 44: Testes independentes: os resultados esperados foram escritos no contrato: -1. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 45: Testes independentes: os resultados esperados foram escritos no contrato: ]. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 46: Testes independentes: os resultados esperados foram escritos no contrato: },. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 47: Testes independentes: os resultados esperados foram escritos no contrato: {. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 48: Testes independentes: os resultados esperados foram escritos no contrato: "input": [],. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 49: Testes independentes: os resultados esperados foram escritos no contrato: "expected": []. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 50: Testes independentes: os resultados esperados foram escritos no contrato: }. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 51: Testes independentes: os resultados esperados foram escritos no contrato: ];. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 52: Testes independentes: os resultados esperados foram escritos no contrato: cases.forEach((item,index)=>test('caso '+index,()=>{. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 53: Testes independentes: os resultados esperados foram escritos no contrato: if (item.expected === null) assert.throws(()=>solve(item.input));. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 54: Testes independentes: os resultados esperados foram escritos no contrato: else assert.deepEqual(solve(item.input),item.expected);. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 55: Testes independentes: os resultados esperados foram escritos no contrato: }));. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 56: Testes independentes: os resultados esperados foram escritos no contrato: test('valida limites e forma',()=>{. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 57: Testes independentes: os resultados esperados foram escritos no contrato: assert.throws(()=>solve([[-1,0,1]]));. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 58: Testes independentes: os resultados esperados foram escritos no contrato: assert.throws(()=>solve([[]]));. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 59: Testes independentes: os resultados esperados foram escritos no contrato: assert.throws(()=>solve(Array.from({length:201},()=>[0,0,1])));. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 60: Testes independentes: os resultados esperados foram escritos no contrato: });. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

### package.json
Linhas 1: Comandos do projeto; usa apenas módulos nativos: {. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 2: Comandos do projeto; usa apenas módulos nativos: "name": "stock-ledger",. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 3: Comandos do projeto; usa apenas módulos nativos: "private": true,. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 4: Comandos do projeto; usa apenas módulos nativos: "type": "module",. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 5: Comandos do projeto; usa apenas módulos nativos: "scripts": {. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 6: Comandos do projeto; usa apenas módulos nativos: "test": "node --test domain.test.mjs",. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 7: Comandos do projeto; usa apenas módulos nativos: "start": "node main.mjs". Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 8: Comandos do projeto; usa apenas módulos nativos: }. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 9: Comandos do projeto; usa apenas módulos nativos: }. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

### input.tsv
Linhas 1: Fixture de entrada: a primeira linha nomeia as colunas; registros usam TAB: sku	action	quantity. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 2: Fixture de entrada: a primeira linha nomeia as colunas; registros usam TAB: 1	0	10. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 3: Fixture de entrada: a primeira linha nomeia as colunas; registros usam TAB: 1	1	12. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 4: Fixture de entrada: a primeira linha nomeia as colunas; registros usam TAB: 1	1	4. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 5: Fixture de entrada: a primeira linha nomeia as colunas; registros usam TAB: 1	2	1. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

## 8. Limites
O(n); não possui persistência, unidades fracionárias nem controle de concorrência entre processos. O projeto é um componente executável de escopo definido; não é uma plataforma empresarial pronta.

## 9. Apresente no portfólio
Aplicação: Operações. Este componente resolve uma decisão recorrente de produto ou infraestrutura; o valor do portfólio está em demonstrar invariantes, testes e os limites da solução.

Extensão sugerida: Acrescente idempotency keys para impedir dupla baixa após repetição de mensagens.

Explique o problema, registre a execução dos testes e mostre os contratos de entrada e saída. Inclua uma decisão descartada, a análise de complexidade e as limitações acima. Implemente uma extensão sua e documente como a validou.

