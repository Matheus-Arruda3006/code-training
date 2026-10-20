# Replay idempotente de saldo

Linguagem: C# + .NET

## Pré-requisitos
C#, HTTP, JSON e locks. Para este projeto adicional, instale SDK .NET 10.

## 1. Problema
Reproduzir eventos únicos sobre saldo inicial zero. Duplicata idêntica é ignorada; mesmo ID com delta diferente é erro. Saída: saldo após cada evento.

## 2. Decisão de arquitetura
Replay deve ser determinístico e distinguir duplicação de corrupção. O histórico é fonte de verdade, a projeção é reconstruível. ASP.NET Core Minimal API, DTO de entrada, status HTTP e domínio sem dependência de HTTP. Entradas inválidas retornam 400; uma chamada usa apenas estado local.

## Contrato de dados

TSV com cabeçalho e até 200 registros. Cada campo é um inteiro dentro dos limites inclusivos. Na API .NET, envie as linhas como arrays em data.

| Índice | Campo | Mínimo | Máximo |
|---|---|---|---|
| 0 | event_id | 0 | 99 |
| 1 | delta | -10000 | 10000 |

## Roteiro guiado

1. Defina o contrato: Reproduzir eventos únicos sobre saldo inicial zero. Duplicata idêntica é ignorada; mesmo ID com delta diferente é erro. Saída: saldo após cada evento.

2. Crie os arquivos de domínio e leia a decisão: Replay deve ser determinístico e distinguir duplicação de corrupção. O histórico é fonte de verdade, a projeção é reconstruível.

3. Implemente o adaptador da linguagem: ASP.NET Core Minimal API, DTO de entrada, status HTTP e domínio sem dependência de HTTP. Entradas inválidas retornam 400; uma chamada usa apenas estado local.

4. Execute os testes antes de usar input.tsv. Os valores esperados são fixos e independentes do retorno calculado.

5. Faça uma extensão autoral: Adicione snapshots com posição do log e comprove equivalência entre replay total e parcial.

## 3. Crie os arquivos
- Domain.cs
- Tests.cs
- InputReader.cs
- Program.cs
- Project.csproj
- NuGet.Config
- input.tsv
- request.json

## 4. Execute na pasta do projeto
```sh
dotnet run --project Project.csproj -- --test
dotnet run --project Project.csproj --urls http://localhost:5080
```


Em outro terminal, com o servidor iniciado:

curl -X POST http://localhost:5080/solve -H "Content-Type: application/json" --data-binary @request.json
No Windows PowerShell, use curl.exe no lugar do alias curl.

## 5. Resultado esperado
```
{"result":[100,70,70]}
```

## 6. Critérios de aceite
- Caso 1: entrada [[1,100],[2,-30],[1,100]] deve produzir [100,70,70].
- Caso 2: a entrada inválida deve falhar, sem resposta parcial.
- Caso 3: entrada [] deve produzir [].
- Rejeitar colunas incorretas, valores fora dos limites e mais de 200 registros.

## 7. Leitura do código
### Domain.cs
Linhas 1: Núcleo de domínio: using System;. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 2: Núcleo de domínio: using System.Collections.Generic;. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 3: Núcleo de domínio: public static class Domain {. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 4: Núcleo de domínio: static long cell(long[][] data, long row, long col) => data[(int)row][(int)col];. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 5: Núcleo de domínio: static long minv(long a,long b) => Math.Min(a,b);. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 6: Núcleo de domínio: static long maxv(long a,long b) => Math.Max(a,b);. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 7: Núcleo de domínio: static long absv(long a) => Math.Abs(a);. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 8: Núcleo de domínio: static long quotient(long a,long b) => a/b;. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 9: Núcleo de domínio: public static long[] Solve(long[][] data) {. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 10: Núcleo de domínio: if (data is null || data.Length>200) throw new ArgumentException("Até 200 registros");. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 11: Núcleo de domínio: long[][] bounds = new long[][] { new long[] { 0, 99 }, new long[] { -10000, 10000 } };. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 12: Núcleo de domínio: foreach(var row in data) {. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 13: Núcleo de domínio: if(row is null || row.Length!=bounds.Length) throw new ArgumentException("Colunas inválidas");. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 14: Núcleo de domínio: for(int col=0;col<row.Length;col++). Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 15: Núcleo de domínio: if(row[col]<bounds[col][0] || row[col]>bounds[col][1]) throw new ArgumentException("Valor fora do contrato");. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 16: Núcleo de domínio: }. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 17: Núcleo de domínio: int n=data.Length;. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 18: Núcleo de domínio: var output=new List<long>();. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 19: Crie um vetor de inteiros inicializado com zeros (seen 100); nenhum estado deve vazar entre chamadas.

Linhas 20: Crie um vetor de inteiros inicializado com zeros (deltas 100); nenhum estado deve vazar entre chamadas.

Linhas 21: Inicialize a variável local: balance = 0. Ela guarda estado intermediário desta regra.

Linhas 22: Repita i in 0..n; o limite final é exclusivo. O índice identifica a posição, não um ID de negócio.

Linhas 23: Inicialize a variável local: id = event_id[i]. Ela guarda estado intermediário desta regra.

Linhas 24: Verifique seen[id] == 1. Este ramo só altera o estado quando a condição é verdadeira.

Linhas 25: Verifique deltas[id] != delta[i]. Este ramo só altera o estado quando a condição é verdadeira.

Linhas 26: Interrompa a operação com erro de validação; a resposta parcial não pode ser apresentada como sucesso.

Linhas 27: Finalize o bloco atual. Variáveis e alterações pertencem à responsabilidade descrita nas linhas anteriores.

Linhas 28: Finalize o bloco atual. Variáveis e alterações pertencem à responsabilidade descrita nas linhas anteriores.

Linhas 29: Trate explicitamente o caminho alternativo; ele só executa quando a condição anterior é falsa.

Linhas 30: Atualize o estado com seen[id] = 1. Confira o invariante e o exemplo de mesa no roteiro do projeto.

Linhas 31: Atualize o estado com deltas[id] = delta[i]. Confira o invariante e o exemplo de mesa no roteiro do projeto.

Linhas 32: Atualize o estado com balance = balance+delta[i]. Confira o invariante e o exemplo de mesa no roteiro do projeto.

Linhas 33: Finalize o bloco atual. Variáveis e alterações pertencem à responsabilidade descrita nas linhas anteriores.

Linhas 34: Acrescente balance à resposta, preservando a ordem definida no contrato de saída.

Linhas 35: Finalize o bloco atual. Variáveis e alterações pertencem à responsabilidade descrita nas linhas anteriores.

Linhas 36: Núcleo de domínio: return output.ToArray();. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 37: Núcleo de domínio: }. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 38: Núcleo de domínio: }. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

### Tests.cs
Linhas 1: Testes: exceção esperada é diferente de resultado incorreto: using System;. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 2: Testes: exceção esperada é diferente de resultado incorreto: using System.Linq;. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 3: Testes: exceção esperada é diferente de resultado incorreto: public static class Tests {. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 4: Testes: exceção esperada é diferente de resultado incorreto: static void Check(long[][] input,long[]? expected) {. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 5: Testes: exceção esperada é diferente de resultado incorreto: try {. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 6: Testes: exceção esperada é diferente de resultado incorreto: var actual=Domain.Solve(input);. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 7: Testes: exceção esperada é diferente de resultado incorreto: if(expected is null || !actual.SequenceEqual(expected)) throw new Exception("Resultado inesperado");. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 8: Testes: exceção esperada é diferente de resultado incorreto: } catch(ArgumentException) { if(expected is not null) throw; }. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 9: Testes: exceção esperada é diferente de resultado incorreto: }. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 10: Testes: exceção esperada é diferente de resultado incorreto: public static void Run() {. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 11: Testes: exceção esperada é diferente de resultado incorreto: Check(new long[][] { new long[] { 1, 100 }, new long[] { 2, -30 }, new long[] { 1, 100 } },new long[] { 100, 70, 70 });. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 12: Testes: exceção esperada é diferente de resultado incorreto: Check(new long[][] { new long[] { 1, 1 }, new long[] { 1, 2 } },null);. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 13: Testes: exceção esperada é diferente de resultado incorreto: Check(new long[0][],new long[] {  });. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 14: Testes: exceção esperada é diferente de resultado incorreto: Check(new long[][] { new long[] { -1, -10000 } },null);. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 15: Testes: exceção esperada é diferente de resultado incorreto: Check(new long[][]{Array.Empty<long>()},null);. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 16: Testes: exceção esperada é diferente de resultado incorreto: Check(Enumerable.Range(0,201).Select(_=>new long[] { 0, -10000 }).ToArray(),null);. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 17: Testes: exceção esperada é diferente de resultado incorreto: Console.WriteLine("Todos os casos passaram.");. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 18: Testes: exceção esperada é diferente de resultado incorreto: }. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 19: Testes: exceção esperada é diferente de resultado incorreto: }. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

### InputReader.cs
Linhas 1: Adaptador de entrada: cabeçalho e inteiros estritos: using System;. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 2: Adaptador de entrada: cabeçalho e inteiros estritos: using System.IO;. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 3: Adaptador de entrada: cabeçalho e inteiros estritos: using System.Linq;. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 4: Adaptador de entrada: cabeçalho e inteiros estritos: using System.Globalization;. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 5: Adaptador de entrada: cabeçalho e inteiros estritos: using System.Text.RegularExpressions;. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 6: Adaptador de entrada: cabeçalho e inteiros estritos: public static class InputReader {. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 7: Adaptador de entrada: cabeçalho e inteiros estritos: public static long[][] Read(string path) {. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 8: Adaptador de entrada: cabeçalho e inteiros estritos: var lines=File.ReadAllLines(path);. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 9: Adaptador de entrada: cabeçalho e inteiros estritos: if(lines.Length==0 || lines[0]!="event_id\tdelta") throw new ArgumentException("Cabeçalho inválido");. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 10: Adaptador de entrada: cabeçalho e inteiros estritos: return lines.Skip(1).Where(line=>line.Length>0).Select(line=>line.Split('\t').Select(value=>{. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 11: Adaptador de entrada: cabeçalho e inteiros estritos: if(!Regex.IsMatch(value,@"^-?[0-9]+$") || !long.TryParse(value,NumberStyles.AllowLeadingSign,CultureInfo.InvariantCulture,out var number)). Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 12: Adaptador de entrada: cabeçalho e inteiros estritos: throw new ArgumentException("Inteiro inválido");. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 13: Adaptador de entrada: cabeçalho e inteiros estritos: return number;. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 14: Adaptador de entrada: cabeçalho e inteiros estritos: }).ToArray()).ToArray();. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 15: Adaptador de entrada: cabeçalho e inteiros estritos: }. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 16: Adaptador de entrada: cabeçalho e inteiros estritos: }. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

### Program.cs
Linhas 1: Ponto de entrada: testa ou expõe a regra com tratamento de falhas: using System.Text.Json;. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 2: Ponto de entrada: testa ou expõe a regra com tratamento de falhas: if(args.Contains("--test")) { Tests.Run(); return; }. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 3: Ponto de entrada: testa ou expõe a regra com tratamento de falhas: var builder=WebApplication.CreateBuilder(args);. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 4: Ponto de entrada: testa ou expõe a regra com tratamento de falhas: var app=builder.Build();. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 5: Ponto de entrada: testa ou expõe a regra com tratamento de falhas: app.MapGet("/health",()=>Results.Ok(new {status="ok"}));. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 6: Ponto de entrada: testa ou expõe a regra com tratamento de falhas: app.MapPost("/solve",(SolveRequest request)=>{. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 7: Ponto de entrada: testa ou expõe a regra com tratamento de falhas: try { return Results.Ok(new {result=Domain.Solve(request.Data)}); }. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 8: Ponto de entrada: testa ou expõe a regra com tratamento de falhas: catch(ArgumentException error) { return Results.BadRequest(new {error=error.Message}); }. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 9: Ponto de entrada: testa ou expõe a regra com tratamento de falhas: });. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 10: Ponto de entrada: testa ou expõe a regra com tratamento de falhas: app.Run();. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 11: Ponto de entrada: testa ou expõe a regra com tratamento de falhas: record SolveRequest(long[][] Data);. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

### Project.csproj
Linhas 1: Projeto .NET 10 sem dependências externas: <Project Sdk="Microsoft.NET.Sdk.Web">. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 2: Projeto .NET 10 sem dependências externas: <PropertyGroup>. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 3: Projeto .NET 10 sem dependências externas: <OutputType>Exe</OutputType>. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 4: Projeto .NET 10 sem dependências externas: <TargetFramework>net10.0</TargetFramework>. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 5: Projeto .NET 10 sem dependências externas: <ImplicitUsings>enable</ImplicitUsings>. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 6: Projeto .NET 10 sem dependências externas: <Nullable>enable</Nullable>. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 7: Projeto .NET 10 sem dependências externas: <CheckForOverflowUnderflow>true</CheckForOverflowUnderflow>. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 8: Projeto .NET 10 sem dependências externas: </PropertyGroup>. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 9: Projeto .NET 10 sem dependências externas: </Project>. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

### NuGet.Config
Linhas 1: Sem pacotes: build usa apenas os reference packs do SDK .NET 10 instalado: <configuration><packageSources><clear /></packageSources></configuration>. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

### input.tsv
Linhas 1: Fixture de entrada: a primeira linha nomeia as colunas; registros usam TAB: event_id	delta. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 2: Fixture de entrada: a primeira linha nomeia as colunas; registros usam TAB: 1	100. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 3: Fixture de entrada: a primeira linha nomeia as colunas; registros usam TAB: 2	-30. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 4: Fixture de entrada: a primeira linha nomeia as colunas; registros usam TAB: 1	100. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

### request.json
Linhas 1: Corpo JSON para POST /solve: {. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 2: Corpo JSON para POST /solve: "data": [. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 3: Corpo JSON para POST /solve: [. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 4: Corpo JSON para POST /solve: 1,. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 5: Corpo JSON para POST /solve: 100. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 6: Corpo JSON para POST /solve: ],. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 7: Corpo JSON para POST /solve: [. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 8: Corpo JSON para POST /solve: 2,. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 9: Corpo JSON para POST /solve: -30. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 10: Corpo JSON para POST /solve: ],. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 11: Corpo JSON para POST /solve: [. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 12: Corpo JSON para POST /solve: 1,. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 13: Corpo JSON para POST /solve: 100. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 14: Corpo JSON para POST /solve: ]. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 15: Corpo JSON para POST /solve: ]. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 16: Corpo JSON para POST /solve: }. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

## 8. Limites
O(n); saldo pode ser negativo e não representa uma conta bancária pronta para produção. A API é um laboratório local sem autenticação, persistência ou controle de abuso; não a exponha diretamente como serviço público.

## 9. Apresente no portfólio
Aplicação: Arquitetura. Este componente resolve uma decisão recorrente de produto ou infraestrutura; o valor do portfólio está em demonstrar invariantes, testes e os limites da solução.

Extensão sugerida: Adicione snapshots com posição do log e comprove equivalência entre replay total e parcial.

Explique o problema, registre a execução dos testes e mostre os contratos de entrada e saída. Inclua uma decisão descartada, a análise de complexidade e as limitações acima. Implemente uma extensão sua e documente como a validou.

