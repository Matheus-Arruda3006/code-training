# Autorização por atributos e limite

Linguagem: C#

## Pré-requisitos
Classes, métodos, coleções e exceções em C#. Para este projeto adicional, instale SDK .NET 10.

## 1. Problema
Permitir aprovação apenas na mesma equipe, até o limite do aprovador e sem suspensão. Saída: 1 permitido, 0 negado.

## 2. Decisão de arquitetura
A autorização combina contexto do ator e do recurso. Uma regra isolada de valor não impede acesso entre equipes. Métodos estáticos puros, long, List<long> e exceções de contrato. Overflow é verificado pelo projeto; os adaptadores não contêm regras de negócio.

## Contrato de dados

TSV com cabeçalho e até 200 registros. Cada campo é um inteiro dentro dos limites inclusivos. Na API .NET, envie as linhas como arrays em data.

| Índice | Campo | Mínimo | Máximo |
|---|---|---|---|
| 0 | actor_team | 0 | 99 |
| 1 | resource_team | 0 | 99 |
| 2 | amount | 0 | 10000 |
| 3 | approval_limit | 0 | 10000 |
| 4 | suspended | 0 | 1 |

## Roteiro guiado

1. Defina o contrato: Permitir aprovação apenas na mesma equipe, até o limite do aprovador e sem suspensão. Saída: 1 permitido, 0 negado.

2. Crie os arquivos de domínio e leia a decisão: A autorização combina contexto do ator e do recurso. Uma regra isolada de valor não impede acesso entre equipes.

3. Implemente o adaptador da linguagem: Métodos estáticos puros, long, List<long> e exceções de contrato. Overflow é verificado pelo projeto; os adaptadores não contêm regras de negócio.

4. Execute os testes antes de usar input.tsv. Os valores esperados são fixos e independentes do retorno calculado.

5. Faça uma extensão autoral: Registre motivos da negativa e escreva testes de matriz de permissões.

## 3. Crie os arquivos
- Domain.cs
- Tests.cs
- InputReader.cs
- Program.cs
- Project.csproj
- NuGet.Config
- input.tsv

## 4. Execute na pasta do projeto
```sh
dotnet run --project Project.csproj -- --test
dotnet run --project Project.csproj -- input.tsv
```


## 5. Resultado esperado
```
[1,0,0]
```

## 6. Critérios de aceite
- Caso 1: entrada [[1,1,100,100,0],[1,2,1,100,0],[1,1,10,100,1]] deve produzir [1,0,0].
- Caso 2: entrada [[0,0,101,100,0]] deve produzir [0].
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

Linhas 11: Núcleo de domínio: long[][] bounds = new long[][] { new long[] { 0, 99 }, new long[] { 0, 99 }, new long[] { 0, 10000 }, new long[] { 0, 10000 }, new long[] { . Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 12: Núcleo de domínio: foreach(var row in data) {. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 13: Núcleo de domínio: if(row is null || row.Length!=bounds.Length) throw new ArgumentException("Colunas inválidas");. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 14: Núcleo de domínio: for(int col=0;col<row.Length;col++). Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 15: Núcleo de domínio: if(row[col]<bounds[col][0] || row[col]>bounds[col][1]) throw new ArgumentException("Valor fora do contrato");. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 16: Núcleo de domínio: }. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 17: Núcleo de domínio: int n=data.Length;. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 18: Núcleo de domínio: var output=new List<long>();. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 19: Repita i in 0..n; o limite final é exclusivo. O índice identifica a posição, não um ID de negócio.

Linhas 20: Verifique actor_team[i] == resource_team[i] && amount[i] <= approval_limit[i] && suspended[i] == 0. Este ramo só altera o estado quando a condição é verdadeira.

Linhas 21: Acrescente 1 à resposta, preservando a ordem definida no contrato de saída.

Linhas 22: Finalize o bloco atual. Variáveis e alterações pertencem à responsabilidade descrita nas linhas anteriores.

Linhas 23: Trate explicitamente o caminho alternativo; ele só executa quando a condição anterior é falsa.

Linhas 24: Acrescente 0 à resposta, preservando a ordem definida no contrato de saída.

Linhas 25: Finalize o bloco atual. Variáveis e alterações pertencem à responsabilidade descrita nas linhas anteriores.

Linhas 26: Finalize o bloco atual. Variáveis e alterações pertencem à responsabilidade descrita nas linhas anteriores.

Linhas 27: Núcleo de domínio: return output.ToArray();. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 28: Núcleo de domínio: }. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 29: Núcleo de domínio: }. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

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

Linhas 11: Testes: exceção esperada é diferente de resultado incorreto: Check(new long[][] { new long[] { 1, 1, 100, 100, 0 }, new long[] { 1, 2, 1, 100, 0 }, new long[] { 1, 1, 10, 100, 1 } },new long[] { 1, 0, . Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 12: Testes: exceção esperada é diferente de resultado incorreto: Check(new long[][] { new long[] { 0, 0, 101, 100, 0 } },new long[] { 0 });. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 13: Testes: exceção esperada é diferente de resultado incorreto: Check(new long[0][],new long[] {  });. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 14: Testes: exceção esperada é diferente de resultado incorreto: Check(new long[][] { new long[] { -1, 0, 0, 0, 0 } },null);. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 15: Testes: exceção esperada é diferente de resultado incorreto: Check(new long[][]{Array.Empty<long>()},null);. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 16: Testes: exceção esperada é diferente de resultado incorreto: Check(Enumerable.Range(0,201).Select(_=>new long[] { 0, 0, 0, 0, 0 }).ToArray(),null);. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

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

Linhas 9: Adaptador de entrada: cabeçalho e inteiros estritos: if(lines.Length==0 || lines[0]!="actor_team\tresource_team\tamount\tapproval_limit\tsuspended") throw new ArgumentException("Cabeçalho invál. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

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

Linhas 3: Ponto de entrada: testa ou expõe a regra com tratamento de falhas: try { Console.WriteLine(JsonSerializer.Serialize(Domain.Solve(InputReader.Read(args.Length>0?args[0]:"input.tsv")))); }. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 4: Ponto de entrada: testa ou expõe a regra com tratamento de falhas: catch(ArgumentException error) { Console.Error.WriteLine(error.Message); Environment.ExitCode=1; }. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

### Project.csproj
Linhas 1: Projeto .NET 10 sem dependências externas: <Project Sdk="Microsoft.NET.Sdk">. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

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
Linhas 1: Fixture de entrada: a primeira linha nomeia as colunas; registros usam TAB: actor_team	resource_team	amount	approval_limit	suspended. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 2: Fixture de entrada: a primeira linha nomeia as colunas; registros usam TAB: 1	1	100	100	0. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 3: Fixture de entrada: a primeira linha nomeia as colunas; registros usam TAB: 1	2	1	100	0. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 4: Fixture de entrada: a primeira linha nomeia as colunas; registros usam TAB: 1	1	10	100	1. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

## 8. Limites
O(n); política fictícia. Atributos devem vir de fonte confiável no servidor. O projeto é um componente executável de escopo definido; não é uma plataforma empresarial pronta.

## 9. Apresente no portfólio
Aplicação: Acesso. Este componente resolve uma decisão recorrente de produto ou infraestrutura; o valor do portfólio está em demonstrar invariantes, testes e os limites da solução.

Extensão sugerida: Registre motivos da negativa e escreva testes de matriz de permissões.

Explique o problema, registre a execução dos testes e mostre os contratos de entrada e saída. Inclua uma decisão descartada, a análise de complexidade e as limitações acima. Implemente uma extensão sua e documente como a validou.

