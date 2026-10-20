# Avaliador de implantação canário

Linguagem: TypeScript

## Pré-requisitos
JavaScript, interfaces, generics e narrowing.

## 1. Problema
Aprovar canário se sua taxa de erro não ultrapassar a do baseline por mais de 1 ponto percentual. Saída: 1 aprovar, 0 interromper.

## 2. Decisão de arquitetura
Compare taxas normalizadas por volume; comparar apenas número de erros favorece grupos menores. Tipos explícitos no núcleo, strict no compilador e validação em runtime. Uma anotação TypeScript não valida JSON recebido.

## Contrato de dados

TSV com cabeçalho e até 200 registros. Cada campo é um inteiro dentro dos limites inclusivos. Na API .NET, envie as linhas como arrays em data.

| Índice | Campo | Mínimo | Máximo |
|---|---|---|---|
| 0 | baseline_requests | 1 | 10000 |
| 1 | baseline_errors | 0 | 10000 |
| 2 | canary_requests | 1 | 10000 |
| 3 | canary_errors | 0 | 10000 |

## Roteiro guiado

1. Defina o contrato: Aprovar canário se sua taxa de erro não ultrapassar a do baseline por mais de 1 ponto percentual. Saída: 1 aprovar, 0 interromper.

2. Crie os arquivos de domínio e leia a decisão: Compare taxas normalizadas por volume; comparar apenas número de erros favorece grupos menores.

3. Implemente o adaptador da linguagem: Tipos explícitos no núcleo, strict no compilador e validação em runtime. Uma anotação TypeScript não valida JSON recebido.

4. Execute os testes antes de usar input.tsv. Os valores esperados são fixos e independentes do retorno calculado.

5. Faça uma extensão autoral: Inclua amostra mínima, intervalo de confiança e métricas de latência e conversão.

## 3. Crie os arquivos
- domain.ts
- main.ts
- domain.test.ts
- package.json
- tsconfig.json
- input.tsv

## 4. Execute na pasta do projeto
```sh
npm install
npm test
node dist/main.js input.tsv
```


## 5. Resultado esperado
```
[1,0]
```

## 6. Critérios de aceite
- Caso 1: entrada [[100,1,100,2],[100,1,100,3]] deve produzir [1,0].
- Caso 2: a entrada inválida deve falhar, sem resposta parcial.
- Caso 3: entrada [] deve produzir [].
- Rejeitar colunas incorretas, valores fora dos limites e mais de 200 registros.

## 7. Leitura do código
### domain.ts
Linhas 1: Núcleo de domínio: const cell = (data: number[][], row: number, col: number) => data[row][col];. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 2: Núcleo de domínio: const minv = Math.min, maxv = Math.max, absv = Math.abs;. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 3: Núcleo de domínio: const quotient = (a: number, b: number) => Math.trunc(a / b);. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 4: Núcleo de domínio: export function solve(data: number[][]): number[] {. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 5: Núcleo de domínio: if (!Array.isArray(data) || data.length > 200) throw new RangeError('Até 200 registros');. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 6: Núcleo de domínio: const bounds = [[1,10000],[0,10000],[1,10000],[0,10000]];. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 7: Núcleo de domínio: for (const row of data) {. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 8: Núcleo de domínio: if (!Array.isArray(row) || row.length !== bounds.length) throw new RangeError('Colunas inválidas');. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 9: Núcleo de domínio: row.forEach((value, index) => {. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 10: Núcleo de domínio: if (!Number.isSafeInteger(value) || value < bounds[index][0] || value > bounds[index][1]) throw new RangeError('Valor fora do contrato');. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 11: Núcleo de domínio: });. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 12: Núcleo de domínio: }. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 13: Núcleo de domínio: const n = data.length;. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 14: Núcleo de domínio: const out: number[] = [];. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 15: Repita i in 0..n; o limite final é exclusivo. O índice identifica a posição, não um ID de negócio.

Linhas 16: Inicialize a variável local: baselineTotal = baseline_requests[i]. Ela guarda estado intermediário desta regra.

Linhas 17: Inicialize a variável local: baseErrors = baseline_errors[i]. Ela guarda estado intermediário desta regra.

Linhas 18: Inicialize a variável local: canary = canary_requests[i]. Ela guarda estado intermediário desta regra.

Linhas 19: Inicialize a variável local: canaryErrors = canary_errors[i]. Ela guarda estado intermediário desta regra.

Linhas 20: Verifique baseErrors > baselineTotal || canaryErrors > canary. Este ramo só altera o estado quando a condição é verdadeira.

Linhas 21: Interrompa a operação com erro de validação; a resposta parcial não pode ser apresentada como sucesso.

Linhas 22: Finalize o bloco atual. Variáveis e alterações pertencem à responsabilidade descrita nas linhas anteriores.

Linhas 23: Verifique canaryErrors*baselineTotal*100 <= baseErrors*canary*100+baselineTotal*canary. Este ramo só altera o estado quando a condição é verdadeira.

Linhas 24: Acrescente 1 à resposta, preservando a ordem definida no contrato de saída.

Linhas 25: Finalize o bloco atual. Variáveis e alterações pertencem à responsabilidade descrita nas linhas anteriores.

Linhas 26: Trate explicitamente o caminho alternativo; ele só executa quando a condição anterior é falsa.

Linhas 27: Acrescente 0 à resposta, preservando a ordem definida no contrato de saída.

Linhas 28: Finalize o bloco atual. Variáveis e alterações pertencem à responsabilidade descrita nas linhas anteriores.

Linhas 29: Finalize o bloco atual. Variáveis e alterações pertencem à responsabilidade descrita nas linhas anteriores.

Linhas 30: Núcleo de domínio: return out;. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 31: Núcleo de domínio: }. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

### main.ts
Linhas 1: Adaptador CLI: parsing estrito de TSV, execução e serialização JSON: import { readFileSync } from 'node:fs';. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 2: Adaptador CLI: parsing estrito de TSV, execução e serialização JSON: import { solve } from './domain.js';. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 3: Adaptador CLI: parsing estrito de TSV, execução e serialização JSON: const text = readFileSync(process.argv[2] || 'input.tsv', 'utf8').replaceAll('\r', '').trimEnd();. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 4: Adaptador CLI: parsing estrito de TSV, execução e serialização JSON: const [header, ...rows] = text.split('\n');. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 5: Adaptador CLI: parsing estrito de TSV, execução e serialização JSON: if (header !== "baseline_requests\tbaseline_errors\tcanary_requests\tcanary_errors") throw new Error('Cabeçalho inválido');. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 6: Adaptador CLI: parsing estrito de TSV, execução e serialização JSON: const data = rows.filter(Boolean).map(row => row.split('\t').map(value => {. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 7: Adaptador CLI: parsing estrito de TSV, execução e serialização JSON: if (!/^-?\d+$/.test(value)) throw new Error('Inteiro inválido');. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 8: Adaptador CLI: parsing estrito de TSV, execução e serialização JSON: return Number(value);. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 9: Adaptador CLI: parsing estrito de TSV, execução e serialização JSON: }));. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 10: Adaptador CLI: parsing estrito de TSV, execução e serialização JSON: console.log(JSON.stringify(solve(data)));. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

### domain.test.ts
Linhas 1: Testes independentes: os resultados esperados foram escritos no contrato: import test from 'node:test';. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 2: Testes independentes: os resultados esperados foram escritos no contrato: import assert from 'node:assert/strict';. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 3: Testes independentes: os resultados esperados foram escritos no contrato: import { solve } from './domain.js';. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 4: Testes independentes: os resultados esperados foram escritos no contrato: const cases = [. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 5: Testes independentes: os resultados esperados foram escritos no contrato: {. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 6: Testes independentes: os resultados esperados foram escritos no contrato: "input": [. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 7: Testes independentes: os resultados esperados foram escritos no contrato: [. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 8: Testes independentes: os resultados esperados foram escritos no contrato: 100,. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 9: Testes independentes: os resultados esperados foram escritos no contrato: 1,. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 10: Testes independentes: os resultados esperados foram escritos no contrato: 100,. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 11: Testes independentes: os resultados esperados foram escritos no contrato: 2. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 12: Testes independentes: os resultados esperados foram escritos no contrato: ],. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 13: Testes independentes: os resultados esperados foram escritos no contrato: [. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 14: Testes independentes: os resultados esperados foram escritos no contrato: 100,. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 15: Testes independentes: os resultados esperados foram escritos no contrato: 1,. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 16: Testes independentes: os resultados esperados foram escritos no contrato: 100,. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 17: Testes independentes: os resultados esperados foram escritos no contrato: 3. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 18: Testes independentes: os resultados esperados foram escritos no contrato: ]. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 19: Testes independentes: os resultados esperados foram escritos no contrato: ],. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 20: Testes independentes: os resultados esperados foram escritos no contrato: "expected": [. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 21: Testes independentes: os resultados esperados foram escritos no contrato: 1,. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 22: Testes independentes: os resultados esperados foram escritos no contrato: 0. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 23: Testes independentes: os resultados esperados foram escritos no contrato: ]. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 24: Testes independentes: os resultados esperados foram escritos no contrato: },. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 25: Testes independentes: os resultados esperados foram escritos no contrato: {. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 26: Testes independentes: os resultados esperados foram escritos no contrato: "input": [. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 27: Testes independentes: os resultados esperados foram escritos no contrato: [. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 28: Testes independentes: os resultados esperados foram escritos no contrato: 10,. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 29: Testes independentes: os resultados esperados foram escritos no contrato: 11,. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 30: Testes independentes: os resultados esperados foram escritos no contrato: 10,. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 31: Testes independentes: os resultados esperados foram escritos no contrato: 0. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 32: Testes independentes: os resultados esperados foram escritos no contrato: ]. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 33: Testes independentes: os resultados esperados foram escritos no contrato: ],. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 34: Testes independentes: os resultados esperados foram escritos no contrato: "expected": null. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 35: Testes independentes: os resultados esperados foram escritos no contrato: },. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 36: Testes independentes: os resultados esperados foram escritos no contrato: {. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 37: Testes independentes: os resultados esperados foram escritos no contrato: "input": [],. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 38: Testes independentes: os resultados esperados foram escritos no contrato: "expected": []. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 39: Testes independentes: os resultados esperados foram escritos no contrato: }. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 40: Testes independentes: os resultados esperados foram escritos no contrato: ];. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 41: Testes independentes: os resultados esperados foram escritos no contrato: cases.forEach((item,index)=>test('caso '+index,()=>{. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 42: Testes independentes: os resultados esperados foram escritos no contrato: if (item.expected === null) assert.throws(()=>solve(item.input));. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 43: Testes independentes: os resultados esperados foram escritos no contrato: else assert.deepEqual(solve(item.input),item.expected);. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 44: Testes independentes: os resultados esperados foram escritos no contrato: }));. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 45: Testes independentes: os resultados esperados foram escritos no contrato: test('valida limites e forma',()=>{. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 46: Testes independentes: os resultados esperados foram escritos no contrato: assert.throws(()=>solve([[0,0,1,0]]));. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 47: Testes independentes: os resultados esperados foram escritos no contrato: assert.throws(()=>solve([[]]));. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 48: Testes independentes: os resultados esperados foram escritos no contrato: assert.throws(()=>solve(Array.from({length:201},()=>[1,0,1,0])));. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 49: Testes independentes: os resultados esperados foram escritos no contrato: });. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

### package.json
Linhas 1: Manifesto de dependências: {. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 2: Manifesto de dependências: "name": "canary",. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 3: Manifesto de dependências: "private": true,. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 4: Manifesto de dependências: "type": "module",. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 5: Manifesto de dependências: "scripts": {. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 6: Manifesto de dependências: "build": "tsc",. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 7: Manifesto de dependências: "test": "tsc && node --test dist/domain.test.js",. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 8: Manifesto de dependências: "start": "node dist/main.js". Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 9: Manifesto de dependências: },. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 10: Manifesto de dependências: "devDependencies": {. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 11: Manifesto de dependências: "typescript": "5.9.3",. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 12: Manifesto de dependências: "@types/node": "22.19.19". Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 13: Manifesto de dependências: }. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 14: Manifesto de dependências: }. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

### tsconfig.json
Linhas 1: Configuração do compilador: {. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 2: Configuração do compilador: "compilerOptions": {. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 3: Configuração do compilador: "target": "ES2022",. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 4: Configuração do compilador: "module": "NodeNext",. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 5: Configuração do compilador: "moduleResolution": "NodeNext",. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 6: Configuração do compilador: "strict": true,. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 7: Configuração do compilador: "outDir": "dist",. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 8: Configuração do compilador: "skipLibCheck": true. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 9: Configuração do compilador: },. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 10: Configuração do compilador: "include": [. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 11: Configuração do compilador: "*.ts". Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 12: Configuração do compilador: ]. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 13: Configuração do compilador: }. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

### input.tsv
Linhas 1: Fixture de entrada: a primeira linha nomeia as colunas; registros usam TAB: baseline_requests	baseline_errors	canary_requests	canary_errors. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 2: Fixture de entrada: a primeira linha nomeia as colunas; registros usam TAB: 100	1	100	2. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 3: Fixture de entrada: a primeira linha nomeia as colunas; registros usam TAB: 100	1	100	3. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

## 8. Limites
O(n); regra operacional simplificada, sem teste estatístico ou garantia de causalidade. O projeto é um componente executável de escopo definido; não é uma plataforma empresarial pronta.

## 9. Apresente no portfólio
Aplicação: Entrega. Este componente resolve uma decisão recorrente de produto ou infraestrutura; o valor do portfólio está em demonstrar invariantes, testes e os limites da solução.

Extensão sugerida: Inclua amostra mínima, intervalo de confiança e métricas de latência e conversão.

Explique o problema, registre a execução dos testes e mostre os contratos de entrada e saída. Inclua uma decisão descartada, a análise de complexidade e as limitações acima. Implemente uma extensão sua e documente como a validou.

