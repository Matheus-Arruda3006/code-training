# Fila de tarefas assíncronas

Linguagem: JavaScript

## Pré-requisitos
Funções, arrays, Promise e async/await.

## 1. Problema
Escreva mapLimit(items, limit, handler), com limite de concorrência e saída na ordem original, mesmo com tempos distintos.

## 2. Decisão de arquitetura
Promise.all aguarda promises; ele não limita a concorrência de operações já iniciadas. Para limitar concorrência, adie a criação: workers retiram um índice e só então chamam o handler. O cursor avança antes do await.

## 3. Crie os arquivos
- queue.mjs
- demo.mjs
- queue.test.mjs

## 4. Execute na pasta do projeto
```sh
node --test queue.test.mjs
node demo.mjs
```

## 5. Resultado esperado
```
[ 6, 2, 4 ]
```

## 6. Critérios de aceite
- Pico de execução simultânea nunca passa de 2
- Saída para [3,1,2] é [6,2,4]
- Limite 0 é rejeitado e erro do handler é propagado

## 7. Leitura do código
### queue.mjs
Linhas 1–2: Valide o limite: valores fracionários ou não positivos não representam workers.

Linhas 3–4: Reserve posições de saída e compartilhe o cursor dentro da chamada.

Linhas 5–10: Reserve o índice antes de ceder o event loop com await. Cada worker espera sua própria tarefa.

Linhas 11–14: Inicie no máximo limit workers e aguarde todos, inclusive os que falharam.

Linhas 15–16: A lista final mantém a ordem da entrada.

### demo.mjs
Linhas 1–6: Delays diferentes demonstram que ordem de conclusão e ordem do resultado são independentes.

### queue.test.mjs
Linhas 1–3: O runner nativo elimina dependências de teste.

Linhas 5–15: Meça o pico real, usando tarefas que duram tempos diferentes.

Linhas 16–20: Cubra validação, lista vazia e propagação de rejeição.

## 8. Limites
A ordem de saída é preservada por índice, não por tempo de conclusão. A implementação aguarda todos os workers antes de propagar uma falha; não cancela operações já iniciadas.

## 9. Apresente no portfólio
Explique o problema, registre a execução dos testes e mostre os contratos de entrada e saída. Inclua uma decisão descartada, a análise de complexidade e as limitações acima. Implemente uma extensão sua e documente como a validou.

