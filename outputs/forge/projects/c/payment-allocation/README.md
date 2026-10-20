# Alocação FIFO de recebimentos

Linguagem: C

## Pré-requisitos
Ponteiros, structs, compilação e arrays.

## 1. Problema
Somar os pagamentos e alocá-los às faturas na ordem de entrada, representando vencimento crescente. Saída: saldo de cada fatura seguido do crédito não utilizado.

## 2. Decisão de arquitetura
A ordem é uma regra de negócio: quitar dívidas antigas primeiro produz resultados diferentes de ratear proporcionalmente. Buffers de capacidade explícita, structs, validação antes de indexar e resultado com flag de erro. O adaptador é responsável por fechar o arquivo.

## Contrato de dados

TSV com cabeçalho e até 200 registros. Cada campo é um inteiro dentro dos limites inclusivos. Na API .NET, envie as linhas como arrays em data.

| Índice | Campo | Mínimo | Máximo |
|---|---|---|---|
| 0 | invoice | 0 | 10000 |
| 1 | payment | 0 | 10000 |

## Roteiro guiado

1. Defina o contrato: Somar os pagamentos e alocá-los às faturas na ordem de entrada, representando vencimento crescente. Saída: saldo de cada fatura seguido do crédito não utilizado.

2. Crie os arquivos de domínio e leia a decisão: A ordem é uma regra de negócio: quitar dívidas antigas primeiro produz resultados diferentes de ratear proporcionalmente.

3. Implemente o adaptador da linguagem: Buffers de capacidade explícita, structs, validação antes de indexar e resultado com flag de erro. O adaptador é responsável por fechar o arquivo.

4. Execute os testes antes de usar input.tsv. Os valores esperados são fixos e independentes do retorno calculado.

5. Faça uma extensão autoral: Inclua datas de vencimento e ordenação estável, preservando o ID original na saída.

## 3. Crie os arquivos
- domain.c
- domain.h
- main.c
- tests.c
- input.tsv

## 4. Execute na pasta do projeto
```sh
cc -std=c17 -Wall -Wextra domain.c tests.c -o tests
./tests
cc -std=c17 -Wall -Wextra domain.c main.c -o app
./app input.tsv
```


## 5. Resultado esperado
```
[0,30,0]
```

## 6. Critérios de aceite
- Caso 1: entrada [[100,50],[80,100]] deve produzir [0,30,0].
- Caso 2: entrada [[40,100]] deve produzir [0,60].
- Caso 3: entrada [] deve produzir [0].
- Rejeitar colunas incorretas, valores fora dos limites e mais de 200 registros.

## 7. Leitura do código
### domain.c
Linhas 1: Núcleo de domínio: #include "domain.h". Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 2: Núcleo de domínio: #include <string.h>. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 3: Núcleo de domínio: ll cell(const Matrix* data,ll row,ll col){return data->values[row][col];}. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 4: Núcleo de domínio: ll minv(ll a,ll b){return a<b?a:b;}. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 5: Núcleo de domínio: ll maxv(ll a,ll b){return a>b?a:b;}. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 6: Núcleo de domínio: ll absv(ll a){return a<0?-a:a;}. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 7: Núcleo de domínio: ll quotient(ll a,ll b){return a/b;}. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 8: Núcleo de domínio: Result solve(const Matrix* data){. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 9: Núcleo de domínio: Result out={0};. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 10: Núcleo de domínio: const ll bounds[2][2]={{0,10000},{0,10000}};. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 11: Núcleo de domínio: if(!data || data->n<0 || data->n>200 || data->cols!=2){out.error=1;return out;}. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 12: Núcleo de domínio: for(int i=0;i<data->n;i++)for(int col=0;col<2;col++). Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 13: Núcleo de domínio: if(data->values[i][col]<bounds[col][0] || data->values[i][col]>bounds[col][1]){out.error=1;return out;}. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 14: Núcleo de domínio: int n=data->n;. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 15: Inicialize a variável local: credit = 0. Ela guarda estado intermediário desta regra.

Linhas 16: Repita i in 0..n; o limite final é exclusivo. O índice identifica a posição, não um ID de negócio.

Linhas 17: Atualize o estado com credit = credit + payment[i]. Confira o invariante e o exemplo de mesa no roteiro do projeto.

Linhas 18: Finalize o bloco atual. Variáveis e alterações pertencem à responsabilidade descrita nas linhas anteriores.

Linhas 19: Repita i in 0..n; o limite final é exclusivo. O índice identifica a posição, não um ID de negócio.

Linhas 20: Inicialize a variável local: paid = minv(credit,invoice[i]). Ela guarda estado intermediário desta regra.

Linhas 21: Atualize o estado com credit = credit-paid. Confira o invariante e o exemplo de mesa no roteiro do projeto.

Linhas 22: Acrescente invoice[i]-paid à resposta, preservando a ordem definida no contrato de saída.

Linhas 23: Finalize o bloco atual. Variáveis e alterações pertencem à responsabilidade descrita nas linhas anteriores.

Linhas 24: Acrescente credit à resposta, preservando a ordem definida no contrato de saída.

Linhas 25: Núcleo de domínio: return out;. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 26: Núcleo de domínio: }. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

### domain.h
Linhas 1: Contrato C: limites de memória explícitos e erro separado do resultado: #ifndef DOMAIN_H. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 2: Contrato C: limites de memória explícitos e erro separado do resultado: #define DOMAIN_H. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 3: Contrato C: limites de memória explícitos e erro separado do resultado: typedef long long ll;. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 4: Contrato C: limites de memória explícitos e erro separado do resultado: typedef struct {int n;int cols;ll values[200][8];} Matrix;. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 5: Contrato C: limites de memória explícitos e erro separado do resultado: typedef struct {int count;int error;ll values[2000];} Result;. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 6: Contrato C: limites de memória explícitos e erro separado do resultado: Result solve(const Matrix* data);. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 7: Contrato C: limites de memória explícitos e erro separado do resultado: #endif. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

### main.c
Linhas 1: Adaptador nativo: parser TSV estrito, limites, ownership do arquivo e erro explícito: #include "domain.h". Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 2: Adaptador nativo: parser TSV estrito, limites, ownership do arquivo e erro explícito: #include <stdio.h>. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 3: Adaptador nativo: parser TSV estrito, limites, ownership do arquivo e erro explícito: #include <stdlib.h>. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 4: Adaptador nativo: parser TSV estrito, limites, ownership do arquivo e erro explícito: #include <string.h>. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 5: Adaptador nativo: parser TSV estrito, limites, ownership do arquivo e erro explícito: #include <errno.h>. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 6: Adaptador nativo: parser TSV estrito, limites, ownership do arquivo e erro explícito: #include <ctype.h>. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 7: Adaptador nativo: parser TSV estrito, limites, ownership do arquivo e erro explícito: int main(int argc,char** argv){. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 8: Adaptador nativo: parser TSV estrito, limites, ownership do arquivo e erro explícito: FILE* input=fopen(argc>1?argv[1]:"input.tsv","r");. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 9: Adaptador nativo: parser TSV estrito, limites, ownership do arquivo e erro explícito: if(!input){perror("input");return 1;}. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 10: Adaptador nativo: parser TSV estrito, limites, ownership do arquivo e erro explícito: Matrix data={0};data.cols=2;char line[4096];int valid=1;. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 11: Adaptador nativo: parser TSV estrito, limites, ownership do arquivo e erro explícito: if(!fgets(line,sizeof line,input)){fclose(input);return 1;}. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 12: Adaptador nativo: parser TSV estrito, limites, ownership do arquivo e erro explícito: line[strcspn(line,"\r\n")]=0;. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 13: Adaptador nativo: parser TSV estrito, limites, ownership do arquivo e erro explícito: if(strcmp(line,"invoice\tpayment")!=0){fclose(input);return 1;}. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 14: Adaptador nativo: parser TSV estrito, limites, ownership do arquivo e erro explícito: while(fgets(line,sizeof line,input)){. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 15: Adaptador nativo: parser TSV estrito, limites, ownership do arquivo e erro explícito: line[strcspn(line,"\r\n")]=0;if(!line[0])continue;. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 16: Adaptador nativo: parser TSV estrito, limites, ownership do arquivo e erro explícito: if(data.n==200){valid=0;break;}. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 17: Adaptador nativo: parser TSV estrito, limites, ownership do arquivo e erro explícito: char* cursor=line;. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 18: Adaptador nativo: parser TSV estrito, limites, ownership do arquivo e erro explícito: for(int col=0;col<data.cols;col++){. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 19: Adaptador nativo: parser TSV estrito, limites, ownership do arquivo e erro explícito: char* end;char* digits=cursor+(*cursor=='-');. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 20: Adaptador nativo: parser TSV estrito, limites, ownership do arquivo e erro explícito: if(!isdigit((unsigned char)*digits)){valid=0;break;}. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 21: Adaptador nativo: parser TSV estrito, limites, ownership do arquivo e erro explícito: errno=0;ll value=strtoll(cursor,&end,10);. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 22: Adaptador nativo: parser TSV estrito, limites, ownership do arquivo e erro explícito: if(errno || end==cursor || (col<data.cols-1?*end!='\t':*end!=0)){valid=0;break;}. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 23: Adaptador nativo: parser TSV estrito, limites, ownership do arquivo e erro explícito: data.values[data.n][col]=value;cursor=end+(*end!=0);. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 24: Adaptador nativo: parser TSV estrito, limites, ownership do arquivo e erro explícito: }. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 25: Adaptador nativo: parser TSV estrito, limites, ownership do arquivo e erro explícito: if(!valid)break;data.n++;. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 26: Adaptador nativo: parser TSV estrito, limites, ownership do arquivo e erro explícito: }. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 27: Adaptador nativo: parser TSV estrito, limites, ownership do arquivo e erro explícito: fclose(input);if(!valid){fprintf(stderr,"Entrada invalida\n");return 1;}. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 28: Adaptador nativo: parser TSV estrito, limites, ownership do arquivo e erro explícito: Result result=solve(&data);if(result.error){fprintf(stderr,"Regra invalida\n");return 1;}. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 29: Adaptador nativo: parser TSV estrito, limites, ownership do arquivo e erro explícito: printf("[");for(int i=0;i<result.count;i++){if(i)printf(",");printf("%lld",result.values[i]);}puts("]");return 0;. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 30: Adaptador nativo: parser TSV estrito, limites, ownership do arquivo e erro explícito: }. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

### tests.c
Linhas 1: Testes nativos: não dependem de assert, portanto continuam ativos em builds release: #include "domain.h". Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 2: Testes nativos: não dependem de assert, portanto continuam ativos em builds release: #include <stdio.h>. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 3: Testes nativos: não dependem de assert, portanto continuam ativos em builds release: #include <stdlib.h>. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 4: Testes nativos: não dependem de assert, portanto continuam ativos em builds release: void check(Matrix input,const ll* expected,int length,int failure){. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 5: Testes nativos: não dependem de assert, portanto continuam ativos em builds release: Result result=solve(&input);. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 6: Testes nativos: não dependem de assert, portanto continuam ativos em builds release: if((!!result.error)!=failure){fprintf(stderr,"Erro inesperado\n");exit(1);}. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 7: Testes nativos: não dependem de assert, portanto continuam ativos em builds release: if(failure)return;. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 8: Testes nativos: não dependem de assert, portanto continuam ativos em builds release: if(result.count!=length){fprintf(stderr,"Tamanho inesperado\n");exit(1);}. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 9: Testes nativos: não dependem de assert, portanto continuam ativos em builds release: for(int i=0;i<length;i++)if(result.values[i]!=expected[i]){fprintf(stderr,"Valor inesperado\n");exit(1);}. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 10: Testes nativos: não dependem de assert, portanto continuam ativos em builds release: }. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 11: Testes nativos: não dependem de assert, portanto continuam ativos em builds release: int main(void){. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 12: Testes nativos: não dependem de assert, portanto continuam ativos em builds release: Matrix input0={.n=2,.cols=2,.values={{100,50},{80,100}}};. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 13: Testes nativos: não dependem de assert, portanto continuam ativos em builds release: ll expected0[]={0,30,0};. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 14: Testes nativos: não dependem de assert, portanto continuam ativos em builds release: check(input0,expected0,3,0);. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 15: Testes nativos: não dependem de assert, portanto continuam ativos em builds release: Matrix input1={.n=1,.cols=2,.values={{40,100}}};. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 16: Testes nativos: não dependem de assert, portanto continuam ativos em builds release: ll expected1[]={0,60};. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 17: Testes nativos: não dependem de assert, portanto continuam ativos em builds release: check(input1,expected1,2,0);. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 18: Testes nativos: não dependem de assert, portanto continuam ativos em builds release: Matrix input2={.n=0,.cols=2,.values={{0}}};. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 19: Testes nativos: não dependem de assert, portanto continuam ativos em builds release: ll expected2[]={0};. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 20: Testes nativos: não dependem de assert, portanto continuam ativos em builds release: check(input2,expected2,1,0);. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 21: Testes nativos: não dependem de assert, portanto continuam ativos em builds release: Matrix input3={.n=1,.cols=2,.values={{-1,0}}};. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 22: Testes nativos: não dependem de assert, portanto continuam ativos em builds release: ll expected3[]={0};. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 23: Testes nativos: não dependem de assert, portanto continuam ativos em builds release: check(input3,expected3,0,1);. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 24: Testes nativos: não dependem de assert, portanto continuam ativos em builds release: puts("Todos os casos passaram.");return 0;. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 25: Testes nativos: não dependem de assert, portanto continuam ativos em builds release: }. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

### input.tsv
Linhas 1: Fixture de entrada: a primeira linha nomeia as colunas; registros usam TAB: invoice	payment. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 2: Fixture de entrada: a primeira linha nomeia as colunas; registros usam TAB: 100	50. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 3: Fixture de entrada: a primeira linha nomeia as colunas; registros usam TAB: 80	100. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

## 8. Limites
O(n); a ordem de vencimento é fornecida pelo cliente. Não calcula juros. O projeto é um componente executável de escopo definido; não é uma plataforma empresarial pronta.

## 9. Apresente no portfólio
Aplicação: Finanças. Este componente resolve uma decisão recorrente de produto ou infraestrutura; o valor do portfólio está em demonstrar invariantes, testes e os limites da solução.

Extensão sugerida: Inclua datas de vencimento e ordenação estável, preservando o ID original na saída.

Explique o problema, registre a execução dos testes e mostre os contratos de entrada e saída. Inclua uma decisão descartada, a análise de complexidade e as limitações acima. Implemente uma extensão sua e documente como a validou.

