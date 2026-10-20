# Processador concorrente de pedidos

Linguagem: Java

## Pré-requisitos
Classes, interfaces, listas e exceções.

## 1. Problema
Processe pedidos em duas threads, retorne os resultados na ordem de entrada e rejeite quantidades não positivas.

## 2. Decisão de arquitetura
Um executor limita as tarefas em execução. Future separa submissão de coleta e transporta falhas ao chamador. BigDecimal evita arredondamentos binários no cálculo financeiro.

## 3. Crie os arquivos
- Main.java

## 4. Execute na pasta do projeto
```sh
javac --release 17 Main.java
java Main
```

## 5. Resultado esperado
```
A: 39.80
B: 15.00
```

## 6. Critérios de aceite
- Pedidos A e B geram 39.80 e 15.00
- Ordem da saída é A, B, independentemente da conclusão
- O executor encerra mesmo quando houver falha

## 7. Leitura do código
### Main.java
Linhas 1–5: Importe tipos numéricos e abstrações de concorrência.

Linhas 7–14: O construtor compacto de record valida invariantes antes de atribuir componentes.

Linhas 16–19: Multiplique com BigDecimal e estabeleça duas casas com arredondamento explícito.

Linhas 21–26: Crie entradas imutáveis e converta cada pedido em Callable. invokeAll preserva ordem na lista de futures.

Linhas 27–30: get pode propagar ExecutionException; não esconda falhas como resultado de sucesso.

Linhas 31–36: Teste valor exato e rejeição de entradas inválidas.

Linhas 37–41: finally garante encerramento ordenado em sucesso ou falha.

## 8. Limites
O pool tem duas threads, mas invokeAll espera todas as tarefas. Este exemplo não implementa timeout ou retry. O shutdown no finally impede vazamento de threads quando uma tarefa falha.

## 9. Apresente no portfólio
Explique o problema, registre a execução dos testes e mostre os contratos de entrada e saída. Inclua uma decisão descartada, a análise de complexidade e as limitações acima. Implemente uma extensão sua e documente como a validou.

