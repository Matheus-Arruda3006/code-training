# Paginação estável por cursor composto

Linguagem: Java

## Pré-requisitos
Classes, interfaces, listas e exceções.

## 1. Problema
Selecionar os três menores pares (timestamp,id) estritamente após o cursor (10,5), ordenados lexicograficamente. Rejeitar pares duplicados. Saída: pares selecionados.

## 2. Decisão de arquitetura
Timestamp sozinho perde itens com mesma data. O ID desempata e o cursor precisa carregar ambos. Tipos long, arrays, ArrayList e exceções. O núcleo não acessa arquivo nem estado global, facilitando testes e integração futura com serviços.

## Contrato de dados

TSV com cabeçalho e até 200 registros. Cada campo é um inteiro dentro dos limites inclusivos. Na API .NET, envie as linhas como arrays em data.

| Índice | Campo | Mínimo | Máximo |
|---|---|---|---|
| 0 | timestamp | 0 | 10000 |
| 1 | id | 0 | 99 |

## Roteiro guiado

1. Defina o contrato: Selecionar os três menores pares (timestamp,id) estritamente após o cursor (10,5), ordenados lexicograficamente. Rejeitar pares duplicados. Saída: pares selecionados.

2. Crie os arquivos de domínio e leia a decisão: Timestamp sozinho perde itens com mesma data. O ID desempata e o cursor precisa carregar ambos.

3. Implemente o adaptador da linguagem: Tipos long, arrays, ArrayList e exceções. O núcleo não acessa arquivo nem estado global, facilitando testes e integração futura com serviços.

4. Execute os testes antes de usar input.tsv. Os valores esperados são fixos e independentes do retorno calculado.

5. Faça uma extensão autoral: Parametrize o cursor, use índice composto no banco e teste inserções entre páginas.

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
[10,6,10,7,11,3]
```

## 6. Critérios de aceite
- Caso 1: entrada [[11,3],[10,7],[10,5],[12,1],[10,6]] deve produzir [10,6,10,7,11,3].
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

Linhas 9: Núcleo de domínio: long[][] bounds=new long[][] { {0,10000},{0,99} };. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 10: Núcleo de domínio: if(data==null || data.length>200)throw new IllegalArgumentException("Ate 200 registros");. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 11: Núcleo de domínio: for(long[] row:data){. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 12: Núcleo de domínio: if(row==null || row.length!=bounds.length)throw new IllegalArgumentException("Colunas invalidas");. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 13: Núcleo de domínio: for(int col=0;col<row.length;col++)if(row[col]<bounds[col][0] || row[col]>bounds[col][1])throw new IllegalArgumentException("Valor fora do c. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 14: Núcleo de domínio: }. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 15: Núcleo de domínio: int n=data.length;. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 16: Núcleo de domínio: var out=new ArrayList<Long>();. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 17: Crie um vetor de inteiros inicializado com zeros (used n); nenhum estado deve vazar entre chamadas.

Linhas 18: Repita i in 0..n; o limite final é exclusivo. O índice identifica a posição, não um ID de negócio.

Linhas 19: Repita j in 0..i; o limite final é exclusivo. O índice identifica a posição, não um ID de negócio.

Linhas 20: Verifique timestamp[i] == timestamp[j] && id[i] == id[j]. Este ramo só altera o estado quando a condição é verdadeira.

Linhas 21: Interrompa a operação com erro de validação; a resposta parcial não pode ser apresentada como sucesso.

Linhas 22: Finalize o bloco atual. Variáveis e alterações pertencem à responsabilidade descrita nas linhas anteriores.

Linhas 23: Finalize o bloco atual. Variáveis e alterações pertencem à responsabilidade descrita nas linhas anteriores.

Linhas 24: Verifique timestamp[i] < 10 || (timestamp[i] == 10 && id[i] <= 5). Este ramo só altera o estado quando a condição é verdadeira.

Linhas 25: Atualize o estado com used[i] = 1. Confira o invariante e o exemplo de mesa no roteiro do projeto.

Linhas 26: Finalize o bloco atual. Variáveis e alterações pertencem à responsabilidade descrita nas linhas anteriores.

Linhas 27: Finalize o bloco atual. Variáveis e alterações pertencem à responsabilidade descrita nas linhas anteriores.

Linhas 28: Repita turn in 0..3; o limite final é exclusivo. O índice identifica a posição, não um ID de negócio.

Linhas 29: Inicialize a variável local: best = -1. Ela guarda estado intermediário desta regra.

Linhas 30: Repita i in 0..n; o limite final é exclusivo. O índice identifica a posição, não um ID de negócio.

Linhas 31: Verifique used[i] == 0. Este ramo só altera o estado quando a condição é verdadeira.

Linhas 32: Verifique best == -1. Este ramo só altera o estado quando a condição é verdadeira.

Linhas 33: Atualize o estado com best = i. Confira o invariante e o exemplo de mesa no roteiro do projeto.

Linhas 34: Finalize o bloco atual. Variáveis e alterações pertencem à responsabilidade descrita nas linhas anteriores.

Linhas 35: Trate explicitamente o caminho alternativo; ele só executa quando a condição anterior é falsa.

Linhas 36: Verifique timestamp[i] < timestamp[best] || (timestamp[i] == timestamp[best] && id[i] < id[best]). Este ramo só altera o estado quando a condição é verdadeira.

Linhas 37: Atualize o estado com best = i. Confira o invariante e o exemplo de mesa no roteiro do projeto.

Linhas 38: Finalize o bloco atual. Variáveis e alterações pertencem à responsabilidade descrita nas linhas anteriores.

Linhas 39: Finalize o bloco atual. Variáveis e alterações pertencem à responsabilidade descrita nas linhas anteriores.

Linhas 40: Finalize o bloco atual. Variáveis e alterações pertencem à responsabilidade descrita nas linhas anteriores.

Linhas 41: Finalize o bloco atual. Variáveis e alterações pertencem à responsabilidade descrita nas linhas anteriores.

Linhas 42: Verifique best != -1. Este ramo só altera o estado quando a condição é verdadeira.

Linhas 43: Acrescente timestamp[best] à resposta, preservando a ordem definida no contrato de saída.

Linhas 44: Acrescente id[best] à resposta, preservando a ordem definida no contrato de saída.

Linhas 45: Atualize o estado com used[best] = 1. Confira o invariante e o exemplo de mesa no roteiro do projeto.

Linhas 46: Finalize o bloco atual. Variáveis e alterações pertencem à responsabilidade descrita nas linhas anteriores.

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

Linhas 6: CLI Java: leitura UTF-8, contrato de entrada e saída: if(lines.isEmpty() || !lines.get(0).equals("timestamp\tid"))throw new IllegalArgumentException("Cabecalho invalido");. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

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

Linhas 8: Testes de contrato Java: resultados e erros esperados: check(new long[][] { {11,3},{10,7},{10,5},{12,1},{10,6} },new long[] {10,6,10,7,11,3});. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 9: Testes de contrato Java: resultados e erros esperados: check(new long[][] { {10,6},{10,6} },null);. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 10: Testes de contrato Java: resultados e erros esperados: check(new long[][] {  },new long[] {});. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 11: Testes de contrato Java: resultados e erros esperados: check(new long[][] { {-1,0} },null);. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 12: Testes de contrato Java: resultados e erros esperados: check(new long[][]{new long[0]},null);. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 13: Testes de contrato Java: resultados e erros esperados: check(new long[201][2],null);. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 14: Testes de contrato Java: resultados e erros esperados: System.out.println("Todos os casos passaram.");. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 15: Testes de contrato Java: resultados e erros esperados: }. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 16: Testes de contrato Java: resultados e erros esperados: }. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

### input.tsv
Linhas 1: Fixture de entrada: a primeira linha nomeia as colunas; registros usam TAB: timestamp	id. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 2: Fixture de entrada: a primeira linha nomeia as colunas; registros usam TAB: 11	3. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 3: Fixture de entrada: a primeira linha nomeia as colunas; registros usam TAB: 10	7. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 4: Fixture de entrada: a primeira linha nomeia as colunas; registros usam TAB: 10	5. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 5: Fixture de entrada: a primeira linha nomeia as colunas; registros usam TAB: 12	1. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 6: Fixture de entrada: a primeira linha nomeia as colunas; registros usam TAB: 10	6. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

## 8. Limites
O(n²); cursor e tamanho da página fixos no laboratório. Não implementa assinatura de cursor. O projeto é um componente executável de escopo definido; não é uma plataforma empresarial pronta.

## 9. Apresente no portfólio
Aplicação: Dados. Este componente resolve uma decisão recorrente de produto ou infraestrutura; o valor do portfólio está em demonstrar invariantes, testes e os limites da solução.

Extensão sugerida: Parametrize o cursor, use índice composto no banco e teste inserções entre páginas.

Explique o problema, registre a execução dos testes e mostre os contratos de entrada e saída. Inclua uma decisão descartada, a análise de complexidade e as limitações acima. Implemente uma extensão sua e documente como a validou.

