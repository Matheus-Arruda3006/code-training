# Registro de idempotência com conflito

Linguagem: TypeScript

## Pré-requisitos
JavaScript, interfaces, generics e narrowing.

## 1. Problema
Aceitar a primeira chave (1), reconhecer repetição com mesmo payload (0) e rejeitar reutilização com payload diferente (-1).

## 2. Decisão de arquitetura
Uma chave sozinha não basta: o payload precisa ser comparado para detectar conflito de intenção. Tipos explícitos no núcleo, strict no compilador e validação em runtime. Uma anotação TypeScript não valida JSON recebido.

## Contrato de dados

TSV com cabeçalho e até 200 registros. Cada campo é um inteiro dentro dos limites inclusivos. Na API .NET, envie as linhas como arrays em data.

| Índice | Campo | Mínimo | Máximo |
|---|---|---|---|
| 0 | key | 0 | 99 |
| 1 | payload | 0 | 10000 |

## Roteiro guiado

1. Defina o contrato: Aceitar a primeira chave (1), reconhecer repetição com mesmo payload (0) e rejeitar reutilização com payload diferente (-1).

2. Crie os arquivos de domínio e leia a decisão: Uma chave sozinha não basta: o payload precisa ser comparado para detectar conflito de intenção.

3. Implemente o adaptador da linguagem: Tipos explícitos no núcleo, strict no compilador e validação em runtime. Uma anotação TypeScript não valida JSON recebido.

4. Execute os testes antes de usar input.tsv. Os valores esperados são fixos e independentes do retorno calculado.

5. Faça uma extensão autoral: Persista chave, digest do payload, status e resposta numa transação com TTL.

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
[1,0,-1,1]
```

## 6. Critérios de aceite
- Caso 1: entrada [[1,10],[1,10],[1,20],[2,20]] deve produzir [1,0,-1,1].
- Caso 2: entrada [[0,0],[0,0]] deve produzir [1,0].
- Caso 3: entrada [] deve produzir [].
- Rejeitar colunas incorretas, valores fora dos limites e mais de 200 registros.

## 7. Leitura do código
### domain.ts
Linhas 1: Núcleo de domínio: const cell = (data: number[][], row: number, col: number) => data[row][col];. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 2: Núcleo de domínio: const minv = Math.min, maxv = Math.max, absv = Math.abs;. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 3: Núcleo de domínio: const quotient = (a: number, b: number) => Math.trunc(a / b);. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 4: Núcleo de domínio: export function solve(data: number[][]): number[] {. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 5: Núcleo de domínio: if (!Array.isArray(data) || data.length > 200) throw new RangeError('Até 200 registros');. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 6: Núcleo de domínio: const bounds = [[0,99],[0,10000]];. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 7: Núcleo de domínio: for (const row of data) {. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 8: Núcleo de domínio: if (!Array.isArray(row) || row.length !== bounds.length) throw new RangeError('Colunas inválidas');. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 9: Núcleo de domínio: row.forEach((value, index) => {. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 10: Núcleo de domínio: if (!Number.isSafeInteger(value) || value < bounds[index][0] || value > bounds[index][1]) throw new RangeError('Valor fora do contrato');. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 11: Núcleo de domínio: });. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 12: Núcleo de domínio: }. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 13: Núcleo de domínio: const n = data.length;. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 14: Núcleo de domínio: const out: number[] = [];. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 15: Crie um vetor de inteiros inicializado com zeros (seen 100); nenhum estado deve vazar entre chamadas.

Linhas 16: Crie um vetor de inteiros inicializado com zeros (payloads 100); nenhum estado deve vazar entre chamadas.

Linhas 17: Repita i in 0..n; o limite final é exclusivo. O índice identifica a posição, não um ID de negócio.

Linhas 18: Inicialize a variável local: key = key[i]. Ela guarda estado intermediário desta regra.

Linhas 19: Verifique seen[key] == 0. Este ramo só altera o estado quando a condição é verdadeira.

Linhas 20: Atualize o estado com seen[key] = 1. Confira o invariante e o exemplo de mesa no roteiro do projeto.

Linhas 21: Atualize o estado com payloads[key] = payload[i]. Confira o invariante e o exemplo de mesa no roteiro do projeto.

Linhas 22: Acrescente 1 à resposta, preservando a ordem definida no contrato de saída.

Linhas 23: Finalize o bloco atual. Variáveis e alterações pertencem à responsabilidade descrita nas linhas anteriores.

Linhas 24: Trate explicitamente o caminho alternativo; ele só executa quando a condição anterior é falsa.

Linhas 25: Verifique payloads[key] == payload[i]. Este ramo só altera o estado quando a condição é verdadeira.

Linhas 26: Acrescente 0 à resposta, preservando a ordem definida no contrato de saída.

Linhas 27: Finalize o bloco atual. Variáveis e alterações pertencem à responsabilidade descrita nas linhas anteriores.

Linhas 28: Trate explicitamente o caminho alternativo; ele só executa quando a condição anterior é falsa.

Linhas 29: Acrescente -1 à resposta, preservando a ordem definida no contrato de saída.

Linhas 30: Finalize o bloco atual. Variáveis e alterações pertencem à responsabilidade descrita nas linhas anteriores.

Linhas 31: Finalize o bloco atual. Variáveis e alterações pertencem à responsabilidade descrita nas linhas anteriores.

Linhas 32: Finalize o bloco atual. Variáveis e alterações pertencem à responsabilidade descrita nas linhas anteriores.

Linhas 33: Núcleo de domínio: return out;. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 34: Núcleo de domínio: }. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

### main.ts
Linhas 1: Adaptador CLI: parsing estrito de TSV, execução e serialização JSON: import { readFileSync } from 'node:fs';. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 2: Adaptador CLI: parsing estrito de TSV, execução e serialização JSON: import { solve } from './domain.js';. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 3: Adaptador CLI: parsing estrito de TSV, execução e serialização JSON: const text = readFileSync(process.argv[2] || 'input.tsv', 'utf8').replaceAll('\r', '').trimEnd();. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 4: Adaptador CLI: parsing estrito de TSV, execução e serialização JSON: const [header, ...rows] = text.split('\n');. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 5: Adaptador CLI: parsing estrito de TSV, execução e serialização JSON: if (header !== "key\tpayload") throw new Error('Cabeçalho inválido');. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

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

Linhas 8: Testes independentes: os resultados esperados foram escritos no contrato: 1,. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 9: Testes independentes: os resultados esperados foram escritos no contrato: 10. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 10: Testes independentes: os resultados esperados foram escritos no contrato: ],. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 11: Testes independentes: os resultados esperados foram escritos no contrato: [. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 12: Testes independentes: os resultados esperados foram escritos no contrato: 1,. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 13: Testes independentes: os resultados esperados foram escritos no contrato: 10. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 14: Testes independentes: os resultados esperados foram escritos no contrato: ],. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 15: Testes independentes: os resultados esperados foram escritos no contrato: [. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 16: Testes independentes: os resultados esperados foram escritos no contrato: 1,. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 17: Testes independentes: os resultados esperados foram escritos no contrato: 20. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 18: Testes independentes: os resultados esperados foram escritos no contrato: ],. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 19: Testes independentes: os resultados esperados foram escritos no contrato: [. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 20: Testes independentes: os resultados esperados foram escritos no contrato: 2,. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 21: Testes independentes: os resultados esperados foram escritos no contrato: 20. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 22: Testes independentes: os resultados esperados foram escritos no contrato: ]. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 23: Testes independentes: os resultados esperados foram escritos no contrato: ],. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 24: Testes independentes: os resultados esperados foram escritos no contrato: "expected": [. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 25: Testes independentes: os resultados esperados foram escritos no contrato: 1,. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 26: Testes independentes: os resultados esperados foram escritos no contrato: 0,. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 27: Testes independentes: os resultados esperados foram escritos no contrato: -1,. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 28: Testes independentes: os resultados esperados foram escritos no contrato: 1. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 29: Testes independentes: os resultados esperados foram escritos no contrato: ]. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 30: Testes independentes: os resultados esperados foram escritos no contrato: },. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 31: Testes independentes: os resultados esperados foram escritos no contrato: {. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 32: Testes independentes: os resultados esperados foram escritos no contrato: "input": [. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 33: Testes independentes: os resultados esperados foram escritos no contrato: [. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 34: Testes independentes: os resultados esperados foram escritos no contrato: 0,. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 35: Testes independentes: os resultados esperados foram escritos no contrato: 0. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 36: Testes independentes: os resultados esperados foram escritos no contrato: ],. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 37: Testes independentes: os resultados esperados foram escritos no contrato: [. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 38: Testes independentes: os resultados esperados foram escritos no contrato: 0,. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 39: Testes independentes: os resultados esperados foram escritos no contrato: 0. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 40: Testes independentes: os resultados esperados foram escritos no contrato: ]. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 41: Testes independentes: os resultados esperados foram escritos no contrato: ],. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 42: Testes independentes: os resultados esperados foram escritos no contrato: "expected": [. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 43: Testes independentes: os resultados esperados foram escritos no contrato: 1,. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 44: Testes independentes: os resultados esperados foram escritos no contrato: 0. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

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

Linhas 57: Testes independentes: os resultados esperados foram escritos no contrato: assert.throws(()=>solve([[-1,0]]));. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 58: Testes independentes: os resultados esperados foram escritos no contrato: assert.throws(()=>solve([[]]));. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 59: Testes independentes: os resultados esperados foram escritos no contrato: assert.throws(()=>solve(Array.from({length:201},()=>[0,0])));. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 60: Testes independentes: os resultados esperados foram escritos no contrato: });. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

### package.json
Linhas 1: Manifesto de dependências: {. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 2: Manifesto de dependências: "name": "idempotency",. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

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
Linhas 1: Fixture de entrada: a primeira linha nomeia as colunas; registros usam TAB: key	payload. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 2: Fixture de entrada: a primeira linha nomeia as colunas; registros usam TAB: 1	10. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 3: Fixture de entrada: a primeira linha nomeia as colunas; registros usam TAB: 1	10. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 4: Fixture de entrada: a primeira linha nomeia as colunas; registros usam TAB: 1	20. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 5: Fixture de entrada: a primeira linha nomeia as colunas; registros usam TAB: 2	20. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

## 8. Limites
O(n), memória de 100 chaves; payload é uma representação numérica do conteúdo, sem hash criptográfico. O projeto é um componente executável de escopo definido; não é uma plataforma empresarial pronta.

## 9. Apresente no portfólio
Aplicação: Confiabilidade. Este componente resolve uma decisão recorrente de produto ou infraestrutura; o valor do portfólio está em demonstrar invariantes, testes e os limites da solução.

Extensão sugerida: Persista chave, digest do payload, status e resposta numa transação com TTL.

Explique o problema, registre a execução dos testes e mostre os contratos de entrada e saída. Inclua uma decisão descartada, a análise de complexidade e as limitações acima. Implemente uma extensão sua e documente como a validou.

