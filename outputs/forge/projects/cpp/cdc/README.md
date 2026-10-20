# Materialização de eventos CDC versionados

Linguagem: C++

## Pré-requisitos
Templates básicos, referências, containers e iteradores.

## 1. Problema
Aplicar upsert (0) e delete (1) apenas quando a versão supera a armazenada. Guardar tombstone para não ressuscitar um registro com evento antigo. Saída: pares ID,valor ativos.

## 2. Decisão de arquitetura
A exclusão também tem versão. Apagar o histórico de versão junto ao valor permite que eventos atrasados recriem dados. RAII, std::vector, referências const e exceções. O arquivo é fechado pelo destrutor e a memória acompanha a vida dos containers.

## Contrato de dados

TSV com cabeçalho e até 200 registros. Cada campo é um inteiro dentro dos limites inclusivos. Na API .NET, envie as linhas como arrays em data.

| Índice | Campo | Mínimo | Máximo |
|---|---|---|---|
| 0 | id | 0 | 99 |
| 1 | version | 1 | 10000 |
| 2 | action | 0 | 1 |
| 3 | value | 0 | 10000 |

## Roteiro guiado

1. Defina o contrato: Aplicar upsert (0) e delete (1) apenas quando a versão supera a armazenada. Guardar tombstone para não ressuscitar um registro com evento antigo. Saída: pares ID,valor ativos.

2. Crie os arquivos de domínio e leia a decisão: A exclusão também tem versão. Apagar o histórico de versão junto ao valor permite que eventos atrasados recriem dados.

3. Implemente o adaptador da linguagem: RAII, std::vector, referências const e exceções. O arquivo é fechado pelo destrutor e a memória acompanha a vida dos containers.

4. Execute os testes antes de usar input.tsv. Os valores esperados são fixos e independentes do retorno calculado.

5. Faça uma extensão autoral: Inclua partição e offset da origem, checkpoints e política segura de expiração de tombstones.

## 3. Crie os arquivos
- domain.hpp
- main.cpp
- tests.cpp
- input.tsv

## 4. Execute na pasta do projeto
```sh
c++ -std=c++17 -Wall -Wextra tests.cpp -o tests
./tests
c++ -std=c++17 -Wall -Wextra main.cpp -o app
./app input.tsv
```


## 5. Resultado esperado
```
[2,7]
```

## 6. Critérios de aceite
- Caso 1: entrada [[1,2,0,20],[1,3,1,0],[1,1,0,10],[2,1,0,7]] deve produzir [2,7].
- Caso 2: entrada [[0,1,0,0]] deve produzir [0,0].
- Caso 3: entrada [] deve produzir [].
- Rejeitar colunas incorretas, valores fora dos limites e mais de 200 registros.

## 7. Leitura do código
### domain.hpp
Linhas 1: Núcleo de domínio: #pragma once. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 2: Núcleo de domínio: #include <vector>. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 3: Núcleo de domínio: #include <stdexcept>. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 4: Núcleo de domínio: #include <algorithm>. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 5: Núcleo de domínio: #include <cstdlib>. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 6: Núcleo de domínio: using ll=long long;. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 7: Núcleo de domínio: using Matrix=std::vector<std::vector<ll>>;. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 8: Núcleo de domínio: inline ll cell(const Matrix& data,ll row,ll col){return data.at(row).at(col);}. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 9: Núcleo de domínio: inline ll minv(ll a,ll b){return std::min(a,b);}. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 10: Núcleo de domínio: inline ll maxv(ll a,ll b){return std::max(a,b);}. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 11: Núcleo de domínio: inline ll absv(ll a){return std::llabs(a);}. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 12: Núcleo de domínio: inline ll quotient(ll a,ll b){return a/b;}. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 13: Núcleo de domínio: inline std::vector<ll> solve(const Matrix& data){. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 14: Núcleo de domínio: const ll bounds[4][2]={{0,99},{1,10000},{0,1},{0,10000}};. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 15: Núcleo de domínio: if(data.size()>200)throw std::invalid_argument("Ate 200 registros");. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 16: Núcleo de domínio: for(const auto& row:data){. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 17: Núcleo de domínio: if(row.size()!=4)throw std::invalid_argument("Colunas invalidas");. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 18: Núcleo de domínio: for(int col=0;col<4;col++)if(row[col]<bounds[col][0] || row[col]>bounds[col][1])throw std::invalid_argument("Valor fora do contrato");. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 19: Núcleo de domínio: }. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 20: Núcleo de domínio: int n=static_cast<int>(data.size());. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 21: Núcleo de domínio: std::vector<ll> out;. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 22: Crie um vetor de inteiros inicializado com zeros (version 100); nenhum estado deve vazar entre chamadas.

Linhas 23: Crie um vetor de inteiros inicializado com zeros (present 100); nenhum estado deve vazar entre chamadas.

Linhas 24: Crie um vetor de inteiros inicializado com zeros (values 100); nenhum estado deve vazar entre chamadas.

Linhas 25: Repita i in 0..n; o limite final é exclusivo. O índice identifica a posição, não um ID de negócio.

Linhas 26: Inicialize a variável local: id = id[i]. Ela guarda estado intermediário desta regra.

Linhas 27: Verifique version[i] > version[id]. Este ramo só altera o estado quando a condição é verdadeira.

Linhas 28: Atualize o estado com version[id] = version[i]. Confira o invariante e o exemplo de mesa no roteiro do projeto.

Linhas 29: Atualize o estado com present[id] = 1-action[i]. Confira o invariante e o exemplo de mesa no roteiro do projeto.

Linhas 30: Atualize o estado com values[id] = value[i]. Confira o invariante e o exemplo de mesa no roteiro do projeto.

Linhas 31: Finalize o bloco atual. Variáveis e alterações pertencem à responsabilidade descrita nas linhas anteriores.

Linhas 32: Finalize o bloco atual. Variáveis e alterações pertencem à responsabilidade descrita nas linhas anteriores.

Linhas 33: Repita id in 0..100; o limite final é exclusivo. O índice identifica a posição, não um ID de negócio.

Linhas 34: Verifique present[id] == 1. Este ramo só altera o estado quando a condição é verdadeira.

Linhas 35: Acrescente id à resposta, preservando a ordem definida no contrato de saída.

Linhas 36: Acrescente values[id] à resposta, preservando a ordem definida no contrato de saída.

Linhas 37: Finalize o bloco atual. Variáveis e alterações pertencem à responsabilidade descrita nas linhas anteriores.

Linhas 38: Finalize o bloco atual. Variáveis e alterações pertencem à responsabilidade descrita nas linhas anteriores.

Linhas 39: Núcleo de domínio: return out;. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 40: Núcleo de domínio: }. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

### main.cpp
Linhas 1: Adaptador nativo: parser TSV estrito, limites, ownership do arquivo e erro explícito: #include "domain.hpp". Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 2: Adaptador nativo: parser TSV estrito, limites, ownership do arquivo e erro explícito: #include <fstream>. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 3: Adaptador nativo: parser TSV estrito, limites, ownership do arquivo e erro explícito: #include <iostream>. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 4: Adaptador nativo: parser TSV estrito, limites, ownership do arquivo e erro explícito: #include <sstream>. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 5: Adaptador nativo: parser TSV estrito, limites, ownership do arquivo e erro explícito: #include <string>. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 6: Adaptador nativo: parser TSV estrito, limites, ownership do arquivo e erro explícito: int main(int argc,char** argv){. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 7: Adaptador nativo: parser TSV estrito, limites, ownership do arquivo e erro explícito: try{. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 8: Adaptador nativo: parser TSV estrito, limites, ownership do arquivo e erro explícito: std::ifstream input(argc>1?argv[1]:"input.tsv");. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 9: Adaptador nativo: parser TSV estrito, limites, ownership do arquivo e erro explícito: std::string line;. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 10: Adaptador nativo: parser TSV estrito, limites, ownership do arquivo e erro explícito: if(!std::getline(input,line))throw std::invalid_argument("Arquivo vazio");. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 11: Adaptador nativo: parser TSV estrito, limites, ownership do arquivo e erro explícito: if(!line.empty()&&line.back()=='\r')line.pop_back();. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 12: Adaptador nativo: parser TSV estrito, limites, ownership do arquivo e erro explícito: if(line!="id\tversion\taction\tvalue")throw std::invalid_argument("Cabecalho invalido");. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 13: Adaptador nativo: parser TSV estrito, limites, ownership do arquivo e erro explícito: Matrix data;. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 14: Adaptador nativo: parser TSV estrito, limites, ownership do arquivo e erro explícito: while(std::getline(input,line)){. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 15: Adaptador nativo: parser TSV estrito, limites, ownership do arquivo e erro explícito: if(!line.empty()&&line.back()=='\r')line.pop_back();. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 16: Adaptador nativo: parser TSV estrito, limites, ownership do arquivo e erro explícito: if(line.empty())continue;. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 17: Adaptador nativo: parser TSV estrito, limites, ownership do arquivo e erro explícito: if(line.back()=='\t')throw std::invalid_argument("Campo vazio");. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 18: Adaptador nativo: parser TSV estrito, limites, ownership do arquivo e erro explícito: std::istringstream stream(line);std::string part;std::vector<ll> row;. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 19: Adaptador nativo: parser TSV estrito, limites, ownership do arquivo e erro explícito: while(std::getline(stream,part,'\t')){. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 20: Adaptador nativo: parser TSV estrito, limites, ownership do arquivo e erro explícito: auto start=part.size()>0&&part[0]=='-'?1u:0u;. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 21: Adaptador nativo: parser TSV estrito, limites, ownership do arquivo e erro explícito: if(start==part.size() || part.find_first_not_of("0123456789",start)!=std::string::npos)throw std::invalid_argument("Inteiro invalido");. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 22: Adaptador nativo: parser TSV estrito, limites, ownership do arquivo e erro explícito: row.push_back(std::stoll(part));. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 23: Adaptador nativo: parser TSV estrito, limites, ownership do arquivo e erro explícito: }. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 24: Adaptador nativo: parser TSV estrito, limites, ownership do arquivo e erro explícito: data.push_back(row);. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 25: Adaptador nativo: parser TSV estrito, limites, ownership do arquivo e erro explícito: if(data.size()>200)throw std::invalid_argument("Limite excedido");. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 26: Adaptador nativo: parser TSV estrito, limites, ownership do arquivo e erro explícito: }. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 27: Adaptador nativo: parser TSV estrito, limites, ownership do arquivo e erro explícito: auto result=solve(data);std::cout<<"[";. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 28: Adaptador nativo: parser TSV estrito, limites, ownership do arquivo e erro explícito: for(std::size_t i=0;i<result.size();i++){if(i)std::cout<<",";std::cout<<result[i];}. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 29: Adaptador nativo: parser TSV estrito, limites, ownership do arquivo e erro explícito: std::cout<<"]\n";. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 30: Adaptador nativo: parser TSV estrito, limites, ownership do arquivo e erro explícito: }catch(const std::exception& error){std::cerr<<error.what()<<"\n";return 1;}. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 31: Adaptador nativo: parser TSV estrito, limites, ownership do arquivo e erro explícito: }. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

### tests.cpp
Linhas 1: Testes nativos: não dependem de assert, portanto continuam ativos em builds release: #include "domain.hpp". Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 2: Testes nativos: não dependem de assert, portanto continuam ativos em builds release: #include <iostream>. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 3: Testes nativos: não dependem de assert, portanto continuam ativos em builds release: void check(const Matrix& input,const std::vector<ll>& expected,bool failure){. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 4: Testes nativos: não dependem de assert, portanto continuam ativos em builds release: try{auto result=solve(input);if(failure || result!=expected)throw std::runtime_error("Resultado inesperado");}. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 5: Testes nativos: não dependem de assert, portanto continuam ativos em builds release: catch(const std::invalid_argument&){if(!failure)throw;}. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 6: Testes nativos: não dependem de assert, portanto continuam ativos em builds release: }. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 7: Testes nativos: não dependem de assert, portanto continuam ativos em builds release: int main(){. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 8: Testes nativos: não dependem de assert, portanto continuam ativos em builds release: check({{1,2,0,20},{1,3,1,0},{1,1,0,10},{2,1,0,7}},{2,7},false);. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 9: Testes nativos: não dependem de assert, portanto continuam ativos em builds release: check({{0,1,0,0}},{0,0},false);. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 10: Testes nativos: não dependem de assert, portanto continuam ativos em builds release: check({},{},false);. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 11: Testes nativos: não dependem de assert, portanto continuam ativos em builds release: check({{-1,1,0,0}},{},true);. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 12: Testes nativos: não dependem de assert, portanto continuam ativos em builds release: std::cout<<"Todos os casos passaram.\n";. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 13: Testes nativos: não dependem de assert, portanto continuam ativos em builds release: }. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

### input.tsv
Linhas 1: Fixture de entrada: a primeira linha nomeia as colunas; registros usam TAB: id	version	action	value. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 2: Fixture de entrada: a primeira linha nomeia as colunas; registros usam TAB: 1	2	0	20. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 3: Fixture de entrada: a primeira linha nomeia as colunas; registros usam TAB: 1	3	1	0. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 4: Fixture de entrada: a primeira linha nomeia as colunas; registros usam TAB: 1	1	0	10. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 5: Fixture de entrada: a primeira linha nomeia as colunas; registros usam TAB: 2	1	0	7. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

## 8. Limites
O(n+100); versões são monotônicas por entidade; empates são ignorados. O projeto é um componente executável de escopo definido; não é uma plataforma empresarial pronta.

## 9. Apresente no portfólio
Aplicação: Dados. Este componente resolve uma decisão recorrente de produto ou infraestrutura; o valor do portfólio está em demonstrar invariantes, testes e os limites da solução.

Extensão sugerida: Inclua partição e offset da origem, checkpoints e política segura de expiração de tombstones.

Explique o problema, registre a execução dos testes e mostre os contratos de entrada e saída. Inclua uma decisão descartada, a análise de complexidade e as limitações acima. Implemente uma extensão sua e documente como a validou.

