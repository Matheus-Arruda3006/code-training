# Pipeline de transações

Linguagem: Python

## Pré-requisitos
Funções, dicionários, módulos e leitura de arquivos.

## 1. Problema
Agregue transações por categoria sem carregar o CSV inteiro. Rejeite valores negativos, NaN e cabeçalhos inválidos; preserve os centavos.

## 2. Decisão de arquitetura
Um generator entrega um registro por vez. Isso permite processar arquivos maiores que a memória. Use Decimal para dinheiro: float não representa exatamente valores como 0,1.

## 3. Crie os arquivos
- pipeline.py
- transactions.csv
- test_pipeline.py

## 4. Execute na pasta do projeto
```sh
python -m unittest -v
python pipeline.py transactions.csv
```

## 5. Resultado esperado
```
books: 40.00
food: 34.90
```

## 6. Critérios de aceite
- food = 34.90 e books = 40.00 no arquivo fornecido
- CSV com valor negativo deve falhar
- Cabeçalho incompleto deve falhar antes do processamento

## 7. Leitura do código
### pipeline.py
Linhas 1–3: csv interpreta campos com aspas corretamente; sys lê a CLI; Decimal mantém aritmética decimal.

Linhas 5–9: Abra com newline vazio para o módulo csv controlar quebras; valide o contrato antes de iterar.

Linhas 10–15: Numere a partir de 2 para apontar a linha física após o cabeçalho e encadeie a causa do erro.

Linhas 16–20: Rejeite categoria vazia, infinito, NaN, negativos e frações de centavo. yield suspende a função sem materializar o arquivo.

Linhas 22–26: O dicionário funciona como acumulador por categoria; a soma é incremental.

Linhas 28–32: O guard separa importação de execução. Ordenar só as categorias torna a saída determinística.

### transactions.csv
Linhas 1: O cabeçalho é o contrato entre produtor e consumidor.

Linhas 2–4: Duas transações da mesma categoria demonstram a agregação.

### test_pipeline.py
Linhas 1–5: Importe ferramentas da biblioteca padrão e as funções do módulo, sem executar a CLI.

Linhas 7–9: Teste centavos conhecidos para detectar a troca acidental de Decimal por float.

Linhas 11–17: Crie arquivos isolados e force o consumo do generator com list para observar a validação.

Linhas 19–20: Permita executar diretamente ou por descoberta do unittest.

## 8. Limites
O processamento é O(n) no número de linhas e O(k) na quantidade de categorias. O relatório acumula apenas os totais. A política aqui é falhar na primeira linha inválida; em produção, uma quarentena de erros pode ser preferível.

## 9. Apresente no portfólio
Explique o problema, registre a execução dos testes e mostre os contratos de entrada e saída. Inclua uma decisão descartada, a análise de complexidade e as limitações acima. Implemente uma extensão sua e documente como a validou.

