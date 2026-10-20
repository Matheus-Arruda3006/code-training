# Máquina de estados de entrega

Linguagem: TypeScript

## Pré-requisitos
JavaScript, interfaces, generics e narrowing.

## 1. Problema
Modele draft → paid → shipped. Rejeite envio antes do pagamento e exija tracking não vazio. Torne o switch de eventos exaustivo.

## 2. Decisão de arquitetura
Uma union discriminada liga campos obrigatórios ao estado. Um pedido enviado exige tracking, enquanto um pedido rascunho não o possui. Tipos ajudam dentro do programa, mas dados JSON ainda precisam ser validados em runtime.

## 3. Crie os arquivos
- package.json
- tsconfig.json
- machine.ts
- main.ts
- test.ts

## 4. Execute na pasta do projeto
```sh
npm install
npm test
npm start
```

## 5. Resultado esperado
```
{ status: 'shipped', id: '42', tracking: 'BR123' }
```

## 6. Critérios de aceite
- pay seguido de ship termina em shipped com tracking
- ship em draft lança erro
- Tracking vazio nunca gera estado shipped

## 7. Leitura do código
### package.json
Linhas 1–7: Declare ESM, scripts reproduzíveis e compilador com versão fixa.

### tsconfig.json
Linhas 1–10: strict habilita checagens de nulos e tipos; NodeNext mantém imports compatíveis com Node ESM.

### machine.ts
Linhas 1–5: Cada discriminante seleciona os campos válidos. Eventos e estados são contratos distintos.

Linhas 7–9: never faz o compilador apontar eventos adicionados sem tratamento no switch.

Linhas 10–14: A transição de pagamento exige draft e retorna um novo objeto.

Linhas 15–18: Valide o estado e o conteúdo antes de construir shipped.

Linhas 19–22: O branch default verifica exaustividade; não é um sucesso silencioso.

### main.ts
Linhas 1–3: Imports terminam em .js porque esse será o arquivo emitido. Componha transições sem mutar a entrada.

### test.ts
Linhas 1–7: Helpers mínimos tornam falhas observáveis por código de saída não zero.

Linhas 8–12: Verifique o caminho válido e que a entrada permanece inalterada.

Linhas 13–16: Teste cada transição proibida e o tracking vazio.

## 8. Limites
A transição lança erro quando o evento não é permitido. Uma alternativa é retornar Result para modelar a falha como dado. Esta máquina não persiste nem processa eventos de múltiplos clientes.

## 9. Apresente no portfólio
Explique o problema, registre a execução dos testes e mostre os contratos de entrada e saída. Inclua uma decisão descartada, a análise de complexidade e as limitações acima. Implemente uma extensão sua e documente como a validou.

