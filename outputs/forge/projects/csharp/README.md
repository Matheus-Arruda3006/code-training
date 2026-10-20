# Motor de precificação

Linguagem: C#

## Pré-requisitos
Classes, métodos, coleções e exceções em C#.

## 1. Problema
Implemente uma cotação com desconto percentual entre 0 e 30%. Rejeite preços negativos e quantidades não positivas, sem modificar os itens originais.

## 2. Decisão de arquitetura
Separe dados imutáveis de regras de cálculo. decimal é apropriado para dinheiro; records tornam a intenção de valor explícita. Um serviço puro permite testar sem banco ou servidor.

## 3. Crie os arquivos
- Pricing.csproj
- Program.cs

## 4. Execute na pasta do projeto
```sh
dotnet run --project Pricing.csproj
```

## 5. Resultado esperado
```
Total: 35.82
3 verificações passaram.
```

## 6. Critérios de aceite
- Dois itens de 19.90 com 10% de desconto custam 35.82
- Quantidade zero e desconto acima de 30% lançam erro
- Uma lista vazia custa zero

## 7. Leitura do código
### Pricing.csproj
Linhas 1–8: Projeto console .NET 8 com imports comuns e análise de nulos; não depende de pacotes externos.

### Program.cs
Linhas 1: Fixe a cultura de apresentação para a saída ser reproduzível.

Linhas 3–11: Execute verificações sem dependência de framework de testes. Capture apenas a exceção esperada.

Linhas 13: record representa um valor; as propriedades posicionais são init-only.

Linhas 15–18: A regra de desconto pertence ao domínio e é validada antes do cálculo.

Linhas 19–24: Enumere uma vez, valide cada item e acumule com decimal.

Linhas 25–27: Arredonde uma vez ao final e torne explícita a política para meios centavos.

## 8. Limites
Calculamos o desconto sobre o subtotal e arredondamos uma única vez. Essa regra precisa estar documentada: arredondar por item pode produzir outro resultado. Dinheiro é considerado em uma única moeda.

## 9. Apresente no portfólio
Explique o problema, registre a execução dos testes e mostre os contratos de entrada e saída. Inclua uma decisão descartada, a análise de complexidade e as limitações acima. Implemente uma extensão sua e documente como a validou.

