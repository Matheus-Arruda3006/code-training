# Cotas por usuário e organização

Linguagem: Java

## Pré-requisitos
Classes, interfaces, listas e exceções.

## 1. Problema
Aceitar consumo até 50 por usuário e 120 na organização. Rejeições preservam ambas as cotas. Saída: decisões e consumo global final.

## 2. Decisão de arquitetura
As duas verificações precisam ocorrer antes de qualquer débito, senão uma falha parcial corrompe o saldo. Tipos long, arrays, ArrayList e exceções. O núcleo não acessa arquivo nem estado global, facilitando testes e integração futura com serviços.

## Contrato de dados

TSV com cabeçalho e até 200 registros. Cada campo é um inteiro dentro dos limites inclusivos. Na API .NET, envie as linhas como arrays em data.

| Índice | Campo | Mínimo | Máximo |
|---|---|---|---|
| 0 | user | 0 | 99 |
| 1 | cost | 1 | 100 |

## Roteiro guiado

1. Defina o contrato: Aceitar consumo até 50 por usuário e 120 na organização. Rejeições preservam ambas as cotas. Saída: decisões e consumo global final.

2. Crie os arquivos de domínio e leia a decisão: As duas verificações precisam ocorrer antes de qualquer débito, senão uma falha parcial corrompe o saldo.

3. Implemente o adaptador da linguagem: Tipos long, arrays, ArrayList e exceções. O núcleo não acessa arquivo nem estado global, facilitando testes e integração futura com serviços.

4. Execute os testes antes de usar input.tsv. Os valores esperados são fixos e independentes do retorno calculado.

5. Faça uma extensão autoral: Adicione organizações e implemente uma transação atômica com expiração de janela.

## 3. Crie os arquivos
- Domain.java
- Main.java
- Tests.java
- input.tsv

## 4. Execute na pasta do projeto
```sh
javac --release 17 Domain.java Main.java Tests.java
java Tests
java Main input.tsv
```


## 5. Resultado esperado
```
[1,1,0,1,0,120]
```

## 6. Critérios de aceite
- Caso 1: entrada [[0,50],[1,50],[2,30],[2,20],[0,1]] deve produzir [1,1,0,1,0,120].
- Caso 2: entrada [[1,51]] deve produzir [0,0].
- Caso 3: entrada [] deve produzir [0].
- Rejeitar colunas incorretas, valores fora dos limites e mais de 200 registros.

## 7. Leitura do código
### Domain.java
Linhas 1: Núcleo de domínio: import java.util.*;. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 2: Núcleo de domínio: public final class Domain {. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 3: Núcleo de domínio: static long cell(long[][] data,long row,long col){return data[(int)row][(int)col];}. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 4: Núcleo de domínio: static long minv(long a,long b){return Math.min(a,b);}. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 5: Núcleo de domínio: static long maxv(long a,long b){return Math.max(a,b);}. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 6: Núcleo de domínio: static long absv(long a){return Math.abs(a);}. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 7: Núcleo de domínio: static long quotient(long a,long b){return a/b;}. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 8: Núcleo de domínio: public static long[] solve(long[][] data) {. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 9: Núcleo de domínio: long[][] bounds=new long[][] { {0,99},{1,100} };. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 10: Núcleo de domínio: if(data==null || data.length>200)throw new IllegalArgumentException("Ate 200 registros");. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 11: Núcleo de domínio: for(long[] row:data){. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 12: Núcleo de domínio: if(row==null || row.length!=bounds.length)throw new IllegalArgumentException("Colunas invalidas");. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 13: Núcleo de domínio: for(int col=0;col<row.length;col++)if(row[col]<bounds[col][0] || row[col]>bounds[col][1])throw new IllegalArgumentException("Valor fora do c. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 14: Núcleo de domínio: }. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 15: Núcleo de domínio: int n=data.length;. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 16: Núcleo de domínio: var out=new ArrayList<Long>();. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 17: Crie um vetor de inteiros inicializado com zeros (used 100); nenhum estado deve vazar entre chamadas.

Linhas 18: Inicialize a variável local: total = 0. Ela guarda estado intermediário desta regra.

Linhas 19: Repita i in 0..n; o limite final é exclusivo. O índice identifica a posição, não um ID de negócio.

Linhas 20: Inicialize a variável local: user = user[i]. Ela guarda estado intermediário desta regra.

Linhas 21: Inicialize a variável local: cost = cost[i]. Ela guarda estado intermediário desta regra.

Linhas 22: Verifique used[user]+cost <= 50 && total+cost <= 120. Este ramo só altera o estado quando a condição é verdadeira.

Linhas 23: Atualize o estado com used[user] = used[user]+cost. Confira o invariante e o exemplo de mesa no roteiro do projeto.

Linhas 24: Atualize o estado com total = total+cost. Confira o invariante e o exemplo de mesa no roteiro do projeto.

Linhas 25: Acrescente 1 à resposta, preservando a ordem definida no contrato de saída.

Linhas 26: Finalize o bloco atual. Variáveis e alterações pertencem à responsabilidade descrita nas linhas anteriores.

Linhas 27: Trate explicitamente o caminho alternativo; ele só executa quando a condição anterior é falsa.

Linhas 28: Acrescente 0 à resposta, preservando a ordem definida no contrato de saída.

Linhas 29: Finalize o bloco atual. Variáveis e alterações pertencem à responsabilidade descrita nas linhas anteriores.

Linhas 30: Finalize o bloco atual. Variáveis e alterações pertencem à responsabilidade descrita nas linhas anteriores.

Linhas 31: Acrescente total à resposta, preservando a ordem definida no contrato de saída.

Linhas 32: Núcleo de domínio: return out.stream().mapToLong(Long::longValue).toArray();. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 33: Núcleo de domínio: }. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 34: Núcleo de domínio: }. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

### Main.java
Linhas 1: CLI Java: leitura UTF-8, contrato de entrada e saída: import java.nio.file.*;. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 2: CLI Java: leitura UTF-8, contrato de entrada e saída: import java.util.*;. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 3: CLI Java: leitura UTF-8, contrato de entrada e saída: public class Main {. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 4: CLI Java: leitura UTF-8, contrato de entrada e saída: public static void main(String[] args) throws Exception {. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 5: CLI Java: leitura UTF-8, contrato de entrada e saída: var lines=Files.readAllLines(Path.of(args.length>0?args[0]:"input.tsv"));. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 6: CLI Java: leitura UTF-8, contrato de entrada e saída: if(lines.isEmpty() || !lines.get(0).equals("user\tcost"))throw new IllegalArgumentException("Cabecalho invalido");. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 7: CLI Java: leitura UTF-8, contrato de entrada e saída: var rows=new ArrayList<long[]>();. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 8: CLI Java: leitura UTF-8, contrato de entrada e saída: for(String line:lines.subList(1,lines.size())){. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 9: CLI Java: leitura UTF-8, contrato de entrada e saída: if(line.isEmpty())continue;. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 10: CLI Java: leitura UTF-8, contrato de entrada e saída: String[] values=line.split("\t",-1);. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 11: CLI Java: leitura UTF-8, contrato de entrada e saída: long[] row=new long[values.length];. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 12: CLI Java: leitura UTF-8, contrato de entrada e saída: for(int i=0;i<values.length;i++){. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 13: CLI Java: leitura UTF-8, contrato de entrada e saída: if(!values[i].matches("-?[0-9]+"))throw new IllegalArgumentException("Inteiro invalido");. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 14: CLI Java: leitura UTF-8, contrato de entrada e saída: row[i]=Long.parseLong(values[i]);. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 15: CLI Java: leitura UTF-8, contrato de entrada e saída: }. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 16: CLI Java: leitura UTF-8, contrato de entrada e saída: rows.add(row);. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 17: CLI Java: leitura UTF-8, contrato de entrada e saída: }. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 18: CLI Java: leitura UTF-8, contrato de entrada e saída: System.out.println(Arrays.toString(Domain.solve(rows.toArray(long[][]::new))));. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 19: CLI Java: leitura UTF-8, contrato de entrada e saída: }. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 20: CLI Java: leitura UTF-8, contrato de entrada e saída: }. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

### Tests.java
Linhas 1: Testes de contrato Java: resultados e erros esperados: import java.util.*;. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 2: Testes de contrato Java: resultados e erros esperados: public class Tests {. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 3: Testes de contrato Java: resultados e erros esperados: static void check(long[][] input,long[] expected){. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 4: Testes de contrato Java: resultados e erros esperados: try { var actual=Domain.solve(input); if(expected==null || !Arrays.equals(actual,expected))throw new AssertionError("Resultado inesperado");. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 5: Testes de contrato Java: resultados e erros esperados: catch(IllegalArgumentException error){ if(expected!=null)throw error; }. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 6: Testes de contrato Java: resultados e erros esperados: }. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 7: Testes de contrato Java: resultados e erros esperados: public static void main(String[] args){. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 8: Testes de contrato Java: resultados e erros esperados: check(new long[][] { {0,50},{1,50},{2,30},{2,20},{0,1} },new long[] {1,1,0,1,0,120});. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 9: Testes de contrato Java: resultados e erros esperados: check(new long[][] { {1,51} },new long[] {0,0});. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 10: Testes de contrato Java: resultados e erros esperados: check(new long[][] {  },new long[] {0});. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 11: Testes de contrato Java: resultados e erros esperados: check(new long[][] { {-1,1} },null);. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 12: Testes de contrato Java: resultados e erros esperados: check(new long[][]{new long[0]},null);. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 13: Testes de contrato Java: resultados e erros esperados: check(new long[201][2],null);. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 14: Testes de contrato Java: resultados e erros esperados: System.out.println("Todos os casos passaram.");. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 15: Testes de contrato Java: resultados e erros esperados: }. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 16: Testes de contrato Java: resultados e erros esperados: }. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

### input.tsv
Linhas 1: Fixture de entrada: a primeira linha nomeia as colunas; registros usam TAB: user	cost. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 2: Fixture de entrada: a primeira linha nomeia as colunas; registros usam TAB: 0	50. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 3: Fixture de entrada: a primeira linha nomeia as colunas; registros usam TAB: 1	50. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 4: Fixture de entrada: a primeira linha nomeia as colunas; registros usam TAB: 2	30. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 5: Fixture de entrada: a primeira linha nomeia as colunas; registros usam TAB: 2	20. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 6: Fixture de entrada: a primeira linha nomeia as colunas; registros usam TAB: 0	1. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

## 8. Limites
O(n); usuários pertencem à mesma organização simulada e as cotas não renovam por tempo. O projeto é um componente executável de escopo definido; não é uma plataforma empresarial pronta.

## 9. Apresente no portfólio
Aplicação: Acesso. Este componente resolve uma decisão recorrente de produto ou infraestrutura; o valor do portfólio está em demonstrar invariantes, testes e os limites da solução.

Extensão sugerida: Adicione organizações e implemente uma transação atômica com expiração de janela.

Explique o problema, registre a execução dos testes e mostre os contratos de entrada e saída. Inclua uma decisão descartada, a análise de complexidade e as limitações acima. Implemente uma extensão sua e documente como a validou.

