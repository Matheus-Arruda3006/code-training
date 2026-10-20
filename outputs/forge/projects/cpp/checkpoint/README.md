# Checkpoint contíguo de consumidor

Linguagem: C++

## Pré-requisitos
Templates básicos, referências, containers e iteradores.

## 1. Problema
Receber offsets fora de ordem e avançar o checkpoint apenas quando todos os anteriores, desde zero, chegaram. Duplicatas são toleradas. Saída: checkpoint após cada chegada, inicialmente -1.

## 2. Decisão de arquitetura
Confirmar o maior offset visto perde mensagens anteriores ainda pendentes. O máximo contíguo representa trabalho completo. RAII, std::vector, referências const e exceções. O arquivo é fechado pelo destrutor e a memória acompanha a vida dos containers.

## Contrato de dados

TSV com cabeçalho e até 200 registros. Cada campo é um inteiro dentro dos limites inclusivos. Na API .NET, envie as linhas como arrays em data.

| Índice | Campo | Mínimo | Máximo |
|---|---|---|---|
| 0 | offset | 0 | 199 |

## Roteiro guiado

1. Defina o contrato: Receber offsets fora de ordem e avançar o checkpoint apenas quando todos os anteriores, desde zero, chegaram. Duplicatas são toleradas. Saída: checkpoint após cada chegada, inicialmente -1.

2. Crie os arquivos de domínio e leia a decisão: Confirmar o maior offset visto perde mensagens anteriores ainda pendentes. O máximo contíguo representa trabalho completo.

3. Implemente o adaptador da linguagem: RAII, std::vector, referências const e exceções. O arquivo é fechado pelo destrutor e a memória acompanha a vida dos containers.

4. Execute os testes antes de usar input.tsv. Os valores esperados são fixos e independentes do retorno calculado.

5. Faça uma extensão autoral: Adicione base móvel, persistência por partição e falhas entre processamento e commit.

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
[-1,0,2,2,2,4]
```

## 6. Critérios de aceite
- Caso 1: entrada [[2],[0],[1],[1],[4],[3]] deve produzir [-1,0,2,2,2,4].
- Caso 2: entrada [[0]] deve produzir [0].
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

Linhas 14: Núcleo de domínio: const ll bounds[1][2]={{0,199}};. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 15: Núcleo de domínio: if(data.size()>200)throw std::invalid_argument("Ate 200 registros");. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 16: Núcleo de domínio: for(const auto& row:data){. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 17: Núcleo de domínio: if(row.size()!=1)throw std::invalid_argument("Colunas invalidas");. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 18: Núcleo de domínio: for(int col=0;col<1;col++)if(row[col]<bounds[col][0] || row[col]>bounds[col][1])throw std::invalid_argument("Valor fora do contrato");. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 19: Núcleo de domínio: }. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 20: Núcleo de domínio: int n=static_cast<int>(data.size());. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 21: Núcleo de domínio: std::vector<ll> out;. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 22: Crie um vetor de inteiros inicializado com zeros (seen 200); nenhum estado deve vazar entre chamadas.

Linhas 23: Inicialize a variável local: checkpoint = -1. Ela guarda estado intermediário desta regra.

Linhas 24: Repita i in 0..n; o limite final é exclusivo. O índice identifica a posição, não um ID de negócio.

Linhas 25: Atualize o estado com seen[offset[i]] = 1. Confira o invariante e o exemplo de mesa no roteiro do projeto.

Linhas 26: Inicialize a variável local: advance = 1. Ela guarda estado intermediário desta regra.

Linhas 27: Continue enquanto advance == 1; as atualizações no corpo precisam aproximar a condição de término.

Linhas 28: Atualize o estado com advance = 0. Confira o invariante e o exemplo de mesa no roteiro do projeto.

Linhas 29: Verifique checkpoint+1 < 200. Este ramo só altera o estado quando a condição é verdadeira.

Linhas 30: Verifique seen[checkpoint+1] == 1. Este ramo só altera o estado quando a condição é verdadeira.

Linhas 31: Atualize o estado com checkpoint = checkpoint+1. Confira o invariante e o exemplo de mesa no roteiro do projeto.

Linhas 32: Atualize o estado com advance = 1. Confira o invariante e o exemplo de mesa no roteiro do projeto.

Linhas 33: Finalize o bloco atual. Variáveis e alterações pertencem à responsabilidade descrita nas linhas anteriores.

Linhas 34: Finalize o bloco atual. Variáveis e alterações pertencem à responsabilidade descrita nas linhas anteriores.

Linhas 35: Finalize o bloco atual. Variáveis e alterações pertencem à responsabilidade descrita nas linhas anteriores.

Linhas 36: Acrescente checkpoint à resposta, preservando a ordem definida no contrato de saída.

Linhas 37: Finalize o bloco atual. Variáveis e alterações pertencem à responsabilidade descrita nas linhas anteriores.

Linhas 38: Núcleo de domínio: return out;. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 39: Núcleo de domínio: }. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

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

Linhas 12: Adaptador nativo: parser TSV estrito, limites, ownership do arquivo e erro explícito: if(line!="offset")throw std::invalid_argument("Cabecalho invalido");. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

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

Linhas 8: Testes nativos: não dependem de assert, portanto continuam ativos em builds release: check({{2},{0},{1},{1},{4},{3}},{-1,0,2,2,2,4},false);. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 9: Testes nativos: não dependem de assert, portanto continuam ativos em builds release: check({{0}},{0},false);. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 10: Testes nativos: não dependem de assert, portanto continuam ativos em builds release: check({},{},false);. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 11: Testes nativos: não dependem de assert, portanto continuam ativos em builds release: check({{-1}},{},true);. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 12: Testes nativos: não dependem de assert, portanto continuam ativos em builds release: std::cout<<"Todos os casos passaram.\n";. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 13: Testes nativos: não dependem de assert, portanto continuam ativos em builds release: }. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

### input.tsv
Linhas 1: Fixture de entrada: a primeira linha nomeia as colunas; registros usam TAB: offset. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 2: Fixture de entrada: a primeira linha nomeia as colunas; registros usam TAB: 2. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 3: Fixture de entrada: a primeira linha nomeia as colunas; registros usam TAB: 0. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 4: Fixture de entrada: a primeira linha nomeia as colunas; registros usam TAB: 1. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 5: Fixture de entrada: a primeira linha nomeia as colunas; registros usam TAB: 1. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 6: Fixture de entrada: a primeira linha nomeia as colunas; registros usam TAB: 4. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 7: Fixture de entrada: a primeira linha nomeia as colunas; registros usam TAB: 3. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

## 8. Limites
O(n+200); buffer limitado a 200 offsets e uma única partição. O projeto é um componente executável de escopo definido; não é uma plataforma empresarial pronta.

## 9. Apresente no portfólio
Aplicação: Distribuição. Este componente resolve uma decisão recorrente de produto ou infraestrutura; o valor do portfólio está em demonstrar invariantes, testes e os limites da solução.

Extensão sugerida: Adicione base móvel, persistência por partição e falhas entre processamento e commit.

Explique o problema, registre a execução dos testes e mostre os contratos de entrada e saída. Inclua uma decisão descartada, a análise de complexidade e as limitações acima. Implemente uma extensão sua e documente como a validou.

