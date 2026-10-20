# Consolidador de janelas de manutenção

Linguagem: Java

## Pré-requisitos
Classes, interfaces, listas e exceções.

## 1. Problema
Unir intervalos sobrepostos ou adjacentes. Entrada deve estar ordenada por início, com início menor que fim. Saída: pares início,fim das janelas consolidadas.

## 2. Decisão de arquitetura
A convenção [início,fim) elimina dupla contagem nas fronteiras; janelas adjacentes podem ser unificadas sem alterar cobertura. Tipos long, arrays, ArrayList e exceções. O núcleo não acessa arquivo nem estado global, facilitando testes e integração futura com serviços.

## Contrato de dados

TSV com cabeçalho e até 200 registros. Cada campo é um inteiro dentro dos limites inclusivos. Na API .NET, envie as linhas como arrays em data.

| Índice | Campo | Mínimo | Máximo |
|---|---|---|---|
| 0 | start | 0 | 10000 |
| 1 | end | 0 | 10000 |

## Roteiro guiado

1. Defina o contrato: Unir intervalos sobrepostos ou adjacentes. Entrada deve estar ordenada por início, com início menor que fim. Saída: pares início,fim das janelas consolidadas.

2. Crie os arquivos de domínio e leia a decisão: A convenção [início,fim) elimina dupla contagem nas fronteiras; janelas adjacentes podem ser unificadas sem alterar cobertura.

3. Implemente o adaptador da linguagem: Tipos long, arrays, ArrayList e exceções. O núcleo não acessa arquivo nem estado global, facilitando testes e integração futura com serviços.

4. Execute os testes antes de usar input.tsv. Os valores esperados são fixos e independentes do retorno calculado.

5. Faça uma extensão autoral: Adicione fusos horários e calcule cobertura total sem converter datas em strings comparáveis.

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
[1,8,10,12]
```

## 6. Critérios de aceite
- Caso 1: entrada [[1,4],[3,6],[6,8],[10,12]] deve produzir [1,8,10,12].
- Caso 2: a entrada inválida deve falhar, sem resposta parcial.
- Caso 3: entrada [] deve produzir [].
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

Linhas 9: Núcleo de domínio: long[][] bounds=new long[][] { {0,10000},{0,10000} };. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 10: Núcleo de domínio: if(data==null || data.length>200)throw new IllegalArgumentException("Ate 200 registros");. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 11: Núcleo de domínio: for(long[] row:data){. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 12: Núcleo de domínio: if(row==null || row.length!=bounds.length)throw new IllegalArgumentException("Colunas invalidas");. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 13: Núcleo de domínio: for(int col=0;col<row.length;col++)if(row[col]<bounds[col][0] || row[col]>bounds[col][1])throw new IllegalArgumentException("Valor fora do c. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 14: Núcleo de domínio: }. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 15: Núcleo de domínio: int n=data.length;. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 16: Núcleo de domínio: var out=new ArrayList<Long>();. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 17: Inicialize a variável local: start = -1. Ela guarda estado intermediário desta regra.

Linhas 18: Inicialize a variável local: end = -1. Ela guarda estado intermediário desta regra.

Linhas 19: Repita i in 0..n; o limite final é exclusivo. O índice identifica a posição, não um ID de negócio.

Linhas 20: Verifique start[i] >= end[i]. Este ramo só altera o estado quando a condição é verdadeira.

Linhas 21: Interrompa a operação com erro de validação; a resposta parcial não pode ser apresentada como sucesso.

Linhas 22: Finalize o bloco atual. Variáveis e alterações pertencem à responsabilidade descrita nas linhas anteriores.

Linhas 23: Verifique i > 0. Este ramo só altera o estado quando a condição é verdadeira.

Linhas 24: Verifique start[i] < start[i-1]. Este ramo só altera o estado quando a condição é verdadeira.

Linhas 25: Interrompa a operação com erro de validação; a resposta parcial não pode ser apresentada como sucesso.

Linhas 26: Finalize o bloco atual. Variáveis e alterações pertencem à responsabilidade descrita nas linhas anteriores.

Linhas 27: Finalize o bloco atual. Variáveis e alterações pertencem à responsabilidade descrita nas linhas anteriores.

Linhas 28: Verifique start == -1. Este ramo só altera o estado quando a condição é verdadeira.

Linhas 29: Atualize o estado com start = start[i]. Confira o invariante e o exemplo de mesa no roteiro do projeto.

Linhas 30: Atualize o estado com end = end[i]. Confira o invariante e o exemplo de mesa no roteiro do projeto.

Linhas 31: Finalize o bloco atual. Variáveis e alterações pertencem à responsabilidade descrita nas linhas anteriores.

Linhas 32: Trate explicitamente o caminho alternativo; ele só executa quando a condição anterior é falsa.

Linhas 33: Verifique start[i] <= end. Este ramo só altera o estado quando a condição é verdadeira.

Linhas 34: Atualize o estado com end = maxv(end,end[i]). Confira o invariante e o exemplo de mesa no roteiro do projeto.

Linhas 35: Finalize o bloco atual. Variáveis e alterações pertencem à responsabilidade descrita nas linhas anteriores.

Linhas 36: Trate explicitamente o caminho alternativo; ele só executa quando a condição anterior é falsa.

Linhas 37: Acrescente start à resposta, preservando a ordem definida no contrato de saída.

Linhas 38: Acrescente end à resposta, preservando a ordem definida no contrato de saída.

Linhas 39: Atualize o estado com start = start[i]. Confira o invariante e o exemplo de mesa no roteiro do projeto.

Linhas 40: Atualize o estado com end = end[i]. Confira o invariante e o exemplo de mesa no roteiro do projeto.

Linhas 41: Finalize o bloco atual. Variáveis e alterações pertencem à responsabilidade descrita nas linhas anteriores.

Linhas 42: Finalize o bloco atual. Variáveis e alterações pertencem à responsabilidade descrita nas linhas anteriores.

Linhas 43: Finalize o bloco atual. Variáveis e alterações pertencem à responsabilidade descrita nas linhas anteriores.

Linhas 44: Verifique start != -1. Este ramo só altera o estado quando a condição é verdadeira.

Linhas 45: Acrescente start à resposta, preservando a ordem definida no contrato de saída.

Linhas 46: Acrescente end à resposta, preservando a ordem definida no contrato de saída.

Linhas 47: Finalize o bloco atual. Variáveis e alterações pertencem à responsabilidade descrita nas linhas anteriores.

Linhas 48: Núcleo de domínio: return out.stream().mapToLong(Long::longValue).toArray();. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 49: Núcleo de domínio: }. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 50: Núcleo de domínio: }. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

### Main.java
Linhas 1: CLI Java: leitura UTF-8, contrato de entrada e saída: import java.nio.file.*;. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 2: CLI Java: leitura UTF-8, contrato de entrada e saída: import java.util.*;. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 3: CLI Java: leitura UTF-8, contrato de entrada e saída: public class Main {. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 4: CLI Java: leitura UTF-8, contrato de entrada e saída: public static void main(String[] args) throws Exception {. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 5: CLI Java: leitura UTF-8, contrato de entrada e saída: var lines=Files.readAllLines(Path.of(args.length>0?args[0]:"input.tsv"));. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 6: CLI Java: leitura UTF-8, contrato de entrada e saída: if(lines.isEmpty() || !lines.get(0).equals("start\tend"))throw new IllegalArgumentException("Cabecalho invalido");. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

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

Linhas 8: Testes de contrato Java: resultados e erros esperados: check(new long[][] { {1,4},{3,6},{6,8},{10,12} },new long[] {1,8,10,12});. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 9: Testes de contrato Java: resultados e erros esperados: check(new long[][] { {2,2} },null);. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 10: Testes de contrato Java: resultados e erros esperados: check(new long[][] {  },new long[] {});. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 11: Testes de contrato Java: resultados e erros esperados: check(new long[][] { {-1,0} },null);. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 12: Testes de contrato Java: resultados e erros esperados: check(new long[][]{new long[0]},null);. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 13: Testes de contrato Java: resultados e erros esperados: check(new long[201][2],null);. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 14: Testes de contrato Java: resultados e erros esperados: System.out.println("Todos os casos passaram.");. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 15: Testes de contrato Java: resultados e erros esperados: }. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 16: Testes de contrato Java: resultados e erros esperados: }. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

### input.tsv
Linhas 1: Fixture de entrada: a primeira linha nomeia as colunas; registros usam TAB: start	end. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 2: Fixture de entrada: a primeira linha nomeia as colunas; registros usam TAB: 1	4. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 3: Fixture de entrada: a primeira linha nomeia as colunas; registros usam TAB: 3	6. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 4: Fixture de entrada: a primeira linha nomeia as colunas; registros usam TAB: 6	8. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 5: Fixture de entrada: a primeira linha nomeia as colunas; registros usam TAB: 10	12. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

## 8. Limites
O(n); a entrada é validada como ordenada, não reorganizada silenciosamente. O projeto é um componente executável de escopo definido; não é uma plataforma empresarial pronta.

## 9. Apresente no portfólio
Aplicação: Dados. Este componente resolve uma decisão recorrente de produto ou infraestrutura; o valor do portfólio está em demonstrar invariantes, testes e os limites da solução.

Extensão sugerida: Adicione fusos horários e calcule cobertura total sem converter datas em strings comparáveis.

Explique o problema, registre a execução dos testes e mostre os contratos de entrada e saída. Inclua uma decisão descartada, a análise de complexidade e as limitações acima. Implemente uma extensão sua e documente como a validou.

