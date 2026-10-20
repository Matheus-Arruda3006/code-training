# Fila circular de telemetria

Linguagem: C

## Pré-requisitos
Ponteiros, structs, compilação e arrays.

## 1. Problema
Construa uma fila FIFO de capacidade 3. Ao remover um item e inserir outro, reutilize o espaço liberado sem deslocar o array.

## 2. Decisão de arquitetura
Um ring buffer reaproveita um array fixo. head aponta para o próximo elemento a sair; size distingue vazio de cheio. Não há alocação por operação.

## 3. Crie os arquivos
- ring.h
- ring.c
- main.c

## 4. Execute na pasta do projeto
```sh
cc -std=c17 -Wall -Wextra -Werror ring.c main.c -o telemetry
./telemetry
```

## 5. Resultado esperado
```
20
30
40
Testes passaram.
```

## 6. Critérios de aceite
- A quarta inserção em fila cheia retorna false
- Depois de remover 10 e inserir 40, saem 20, 30, 40
- Remover de fila vazia retorna false

## 7. Leitura do código
### ring.h
Linhas 1–2: O include guard impede definições duplicadas.

Linhas 3–6: Declare tipos e capacidade fixa; head e size são índices não negativos.

Linhas 7–9: A API explicita sucesso ou falha em bool; saída é escrita por ponteiro.

### ring.c
Linhas 1: Inclua o contrato público para verificar as assinaturas.

Linhas 3–9: Recuse ponteiro nulo ou fila cheia; o módulo faz tail voltar ao início do array.

Linhas 11–17: Verifique os dois ponteiros antes de acessá-los. Copie a saída antes de avançar head e diminuir size.

### main.c
Linhas 1–3: Use o contrato e assertions da biblioteca padrão. Compile os testes sem NDEBUG.

Linhas 5–7: Inicialização com zero garante os invariantes head=0 e size=0.

Linhas 8–13: Cubra capacidade, overflow e reutilização de espaço.

Linhas 14–20: Verifique ordem FIFO e underflow; retorne sucesso ao sistema operacional.

## 8. Limites
push e pop são O(1), e o armazenamento é limitado. A implementação rejeita novas leituras quando cheia. Não é thread-safe: múltiplos produtores exigem sincronização.

## 9. Apresente no portfólio
Explique o problema, registre a execução dos testes e mostre os contratos de entrada e saída. Inclua uma decisão descartada, a análise de complexidade e as limitações acima. Implemente uma extensão sua e documente como a validou.

