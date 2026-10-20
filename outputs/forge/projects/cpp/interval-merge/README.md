# Consolidador de janelas de manutenção

Linguagem: C++

## Pré-requisitos
Templates básicos, referências, containers e iteradores.

## 1. Problema
Unir intervalos sobrepostos ou adjacentes. Entrada deve estar ordenada por início, com início menor que fim. Saída: pares início,fim das janelas consolidadas.

## 2. Decisão de arquitetura
A convenção [início,fim) elimina dupla contagem nas fronteiras; janelas adjacentes podem ser unificadas sem alterar cobertura. RAII, std::vector, referências const e exceções. O arquivo é fechado pelo destrutor e a memória acompanha a vida dos containers.

## Contrato de dados

TSV com cabeçalho e até 200 registros. Cada campo é um inteiro dentro dos limites inclusivos. Na API .NET, envie as linhas como arrays em data.

| Índice | Campo | Mínimo | Máximo |
|---|---|---|---|
| 0 | start | 0 | 10000 |
| 1 | end | 0 | 10000 |

## Roteiro guiado

1. Defina o contrato: Unir intervalos sobrepostos ou adjacentes. Entrada deve estar ordenada por início, com início menor que fim. Saída: pares início,fim das janelas consolidadas.

2. Crie os arquivos de domínio e leia a decisão: A convenção [início,fim) elimina dupla contagem nas fronteiras; janelas adjacentes podem ser unificadas sem alterar cobertura.

3. Implemente o adaptador da linguagem: RAII, std::vector, referências const e exceções. O arquivo é fechado pelo destrutor e a memória acompanha a vida dos containers.

4. Execute os testes antes de usar input.tsv. Os valores esperados são fixos e independentes do retorno calculado.

5. Faça uma extensão autoral: Adicione fusos horários e calcule cobertura total sem converter datas em strings comparáveis.

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
[1,8,10,12]
```

## 6. Critérios de aceite
- Caso 1: entrada [[1,4],[3,6],[6,8],[10,12]] deve produzir [1,8,10,12].
- Caso 2: a entrada inválida deve falhar, sem resposta parcial.
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

Linhas 14: Núcleo de domínio: const ll bounds[2][2]={{0,10000},{0,10000}};. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 15: Núcleo de domínio: if(data.size()>200)throw std::invalid_argument("Ate 200 registros");. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 16: Núcleo de domínio: for(const auto& row:data){. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 17: Núcleo de domínio: if(row.size()!=2)throw std::invalid_argument("Colunas invalidas");. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 18: Núcleo de domínio: for(int col=0;col<2;col++)if(row[col]<bounds[col][0] || row[col]>bounds[col][1])throw std::invalid_argument("Valor fora do contrato");. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 19: Núcleo de domínio: }. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 20: Núcleo de domínio: int n=static_cast<int>(data.size());. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 21: Núcleo de domínio: std::vector<ll> out;. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 22: Inicialize a variável local: start = -1. Ela guarda estado intermediário desta regra.

Linhas 23: Inicialize a variável local: end = -1. Ela guarda estado intermediário desta regra.

Linhas 24: Repita i in 0..n; o limite final é exclusivo. O índice identifica a posição, não um ID de negócio.

Linhas 25: Verifique start[i] >= end[i]. Este ramo só altera o estado quando a condição é verdadeira.

Linhas 26: Interrompa a operação com erro de validação; a resposta parcial não pode ser apresentada como sucesso.

Linhas 27: Finalize o bloco atual. Variáveis e alterações pertencem à responsabilidade descrita nas linhas anteriores.

Linhas 28: Verifique i > 0. Este ramo só altera o estado quando a condição é verdadeira.

Linhas 29: Verifique start[i] < start[i-1]. Este ramo só altera o estado quando a condição é verdadeira.

Linhas 30: Interrompa a operação com erro de validação; a resposta parcial não pode ser apresentada como sucesso.

Linhas 31: Finalize o bloco atual. Variáveis e alterações pertencem à responsabilidade descrita nas linhas anteriores.

Linhas 32: Finalize o bloco atual. Variáveis e alterações pertencem à responsabilidade descrita nas linhas anteriores.

Linhas 33: Verifique start == -1. Este ramo só altera o estado quando a condição é verdadeira.

Linhas 34: Atualize o estado com start = start[i]. Confira o invariante e o exemplo de mesa no roteiro do projeto.

Linhas 35: Atualize o estado com end = end[i]. Confira o invariante e o exemplo de mesa no roteiro do projeto.

Linhas 36: Finalize o bloco atual. Variáveis e alterações pertencem à responsabilidade descrita nas linhas anteriores.

Linhas 37: Trate explicitamente o caminho alternativo; ele só executa quando a condição anterior é falsa.

Linhas 38: Verifique start[i] <= end. Este ramo só altera o estado quando a condição é verdadeira.

Linhas 39: Atualize o estado com end = maxv(end,end[i]). Confira o invariante e o exemplo de mesa no roteiro do projeto.

Linhas 40: Finalize o bloco atual. Variáveis e alterações pertencem à responsabilidade descrita nas linhas anteriores.

Linhas 41: Trate explicitamente o caminho alternativo; ele só executa quando a condição anterior é falsa.

Linhas 42: Acrescente start à resposta, preservando a ordem definida no contrato de saída.

Linhas 43: Acrescente end à resposta, preservando a ordem definida no contrato de saída.

Linhas 44: Atualize o estado com start = start[i]. Confira o invariante e o exemplo de mesa no roteiro do projeto.

Linhas 45: Atualize o estado com end = end[i]. Confira o invariante e o exemplo de mesa no roteiro do projeto.

Linhas 46: Finalize o bloco atual. Variáveis e alterações pertencem à responsabilidade descrita nas linhas anteriores.

Linhas 47: Finalize o bloco atual. Variáveis e alterações pertencem à responsabilidade descrita nas linhas anteriores.

Linhas 48: Finalize o bloco atual. Variáveis e alterações pertencem à responsabilidade descrita nas linhas anteriores.

Linhas 49: Verifique start != -1. Este ramo só altera o estado quando a condição é verdadeira.

Linhas 50: Acrescente start à resposta, preservando a ordem definida no contrato de saída.

Linhas 51: Acrescente end à resposta, preservando a ordem definida no contrato de saída.

Linhas 52: Finalize o bloco atual. Variáveis e alterações pertencem à responsabilidade descrita nas linhas anteriores.

Linhas 53: Núcleo de domínio: return out;. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 54: Núcleo de domínio: }. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

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

Linhas 12: Adaptador nativo: parser TSV estrito, limites, ownership do arquivo e erro explícito: if(line!="start\tend")throw std::invalid_argument("Cabecalho invalido");. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

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

Linhas 8: Testes nativos: não dependem de assert, portanto continuam ativos em builds release: check({{1,4},{3,6},{6,8},{10,12}},{1,8,10,12},false);. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 9: Testes nativos: não dependem de assert, portanto continuam ativos em builds release: check({{2,2}},{},true);. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 10: Testes nativos: não dependem de assert, portanto continuam ativos em builds release: check({},{},false);. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 11: Testes nativos: não dependem de assert, portanto continuam ativos em builds release: check({{-1,0}},{},true);. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 12: Testes nativos: não dependem de assert, portanto continuam ativos em builds release: std::cout<<"Todos os casos passaram.\n";. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 13: Testes nativos: não dependem de assert, portanto continuam ativos em builds release: }. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

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

