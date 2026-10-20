# API de reservas de estoque

Linguagem: C# + .NET

## Pré-requisitos
C#, HTTP, JSON e locks.

## 1. Problema
Crie uma API que reserve unidades sem permitir estoque negativo sob concorrência. Diferencie entrada inválida, produto ausente e conflito.

## 2. Decisão de arquitetura
Validar estoque e decrementá-lo precisa ser uma única operação atômica. Um lock protege esse trecho dentro do processo. HTTP 409 expressa conflito de disponibilidade, enquanto 400 sinaliza entrada inválida.

## 3. Crie os arquivos
- Stock.csproj
- Program.cs
- verify.py

## 4. Execute na pasta do projeto
```sh
dotnet run --project Stock.csproj --urls http://localhost:5080
# Em outro terminal:
curl http://localhost:5080/stock/book
curl -X POST http://localhost:5080/reserve -H "Content-Type: application/json" -d '{"sku":"book","quantity":3}'
```

## 5. Resultado esperado
```
{"sku":"book","available":10}
{"sku":"book","reserved":3,"remaining":7}
```

## 6. Critérios de aceite
- GET /stock/book retorna 10 unidades inicialmente
- POST /reserve com 3 unidades deixa 7
- Quantidade 0 retorna 400; excesso retorna 409

## 7. Leitura do código
### Stock.csproj
Linhas 1–7: O SDK Web inclui ASP.NET Core; defina o runtime alvo e validação de nulos.

### Program.cs
Linhas 1–4: Inicialize o host, o estado de demonstração e um único objeto de sincronização.

Linhas 6–12: A leitura também compartilha o lock: Dictionary não suporta leitura concorrente com escrita sem proteção.

Linhas 14–16: O binding converte JSON em record; valide antes de entrar na seção crítica.

Linhas 17–24: Leia, compare e escreva sob o mesmo lock. Retorne códigos HTTP conforme a causa.

Linhas 25–27: Inicie o servidor e declare o contrato de entrada.

### verify.py
Linhas 1–4: O cliente usa apenas Python padrão para gerar requisições concorrentes.

Linhas 6–13: Converta tanto sucesso quanto erro HTTP em status verificável.

Linhas 15–20: Execute com o servidor recém-iniciado e estoque 10, antes dos curls. Exatamente dez reservas devem vencer.

## 8. Limites
Este laboratório usa memória e um processo. Reiniciar restaura o estoque; múltiplas réplicas precisam de transação no banco ou atualização condicional atômica. O lock não coordena máquinas diferentes.

## 9. Apresente no portfólio
Explique o problema, registre a execução dos testes e mostre os contratos de entrada e saída. Inclua uma decisão descartada, a análise de complexidade e as limitações acima. Implemente uma extensão sua e documente como a validou.

