# Limitador por janela deslizante

Linguagem: C++

## Pré-requisitos
Templates básicos, referências, containers e iteradores.

## 1. Problema
Aceitar no máximo 3 requisições no intervalo (agora-10, agora]. Rejeições não entram na janela. Saída: 1/0 por requisição, com tempos não decrescentes.

## 2. Decisão de arquitetura
A fronteira aberta à esquerda evita contar uma requisição por uma unidade de tempo extra. RAII, std::vector, referências const e exceções. O arquivo é fechado pelo destrutor e a memória acompanha a vida dos containers.

## Contrato de dados

TSV com cabeçalho e até 200 registros. Cada campo é um inteiro dentro dos limites inclusivos. Na API .NET, envie as linhas como arrays em data.

| Índice | Campo | Mínimo | Máximo |
|---|---|---|---|
| 0 | time | 0 | 10000 |

## Roteiro guiado

1. Defina o contrato: Aceitar no máximo 3 requisições no intervalo (agora-10, agora]. Rejeições não entram na janela. Saída: 1/0 por requisição, com tempos não decrescentes.

2. Crie os arquivos de domínio e leia a decisão: A fronteira aberta à esquerda evita contar uma requisição por uma unidade de tempo extra.

3. Implemente o adaptador da linguagem: RAII, std::vector, referências const e exceções. O arquivo é fechado pelo destrutor e a memória acompanha a vida dos containers.

4. Execute os testes antes de usar input.tsv. Os valores esperados são fixos e independentes do retorno calculado.

5. Faça uma extensão autoral: Troque a varredura por deque e faça um teste de equivalência entre as implementações.

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
[1,1,1,0,1]
```

## 6. Critérios de aceite
- Caso 1: entrada [[0],[1],[2],[3],[10]] deve produzir [1,1,1,0,1].
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

Linhas 14: Núcleo de domínio: const ll bounds[1][2]={{0,10000}};. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 15: Núcleo de domínio: if(data.size()>200)throw std::invalid_argument("Ate 200 registros");. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 16: Núcleo de domínio: for(const auto& row:data){. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 17: Núcleo de domínio: if(row.size()!=1)throw std::invalid_argument("Colunas invalidas");. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 18: Núcleo de domínio: for(int col=0;col<1;col++)if(row[col]<bounds[col][0] || row[col]>bounds[col][1])throw std::invalid_argument("Valor fora do contrato");. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 19: Núcleo de domínio: }. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 20: Núcleo de domínio: int n=static_cast<int>(data.size());. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 21: Núcleo de domínio: std::vector<ll> out;. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 22: Crie um vetor de inteiros inicializado com zeros (accepted n); nenhum estado deve vazar entre chamadas.

Linhas 23: Repita i in 0..n; o limite final é exclusivo. O índice identifica a posição, não um ID de negócio.

Linhas 24: Verifique i > 0. Este ramo só altera o estado quando a condição é verdadeira.

Linhas 25: Verifique time[i] < time[i-1]. Este ramo só altera o estado quando a condição é verdadeira.

Linhas 26: Interrompa a operação com erro de validação; a resposta parcial não pode ser apresentada como sucesso.

Linhas 27: Finalize o bloco atual. Variáveis e alterações pertencem à responsabilidade descrita nas linhas anteriores.

Linhas 28: Finalize o bloco atual. Variáveis e alterações pertencem à responsabilidade descrita nas linhas anteriores.

Linhas 29: Inicialize a variável local: count = 0. Ela guarda estado intermediário desta regra.

Linhas 30: Repita j in 0..i; o limite final é exclusivo. O índice identifica a posição, não um ID de negócio.

Linhas 31: Verifique accepted[j] == 1 && time[j] > time[i]-10. Este ramo só altera o estado quando a condição é verdadeira.

Linhas 32: Atualize o estado com count = count+1. Confira o invariante e o exemplo de mesa no roteiro do projeto.

Linhas 33: Finalize o bloco atual. Variáveis e alterações pertencem à responsabilidade descrita nas linhas anteriores.

Linhas 34: Finalize o bloco atual. Variáveis e alterações pertencem à responsabilidade descrita nas linhas anteriores.

Linhas 35: Verifique count < 3. Este ramo só altera o estado quando a condição é verdadeira.

Linhas 36: Atualize o estado com accepted[i] = 1. Confira o invariante e o exemplo de mesa no roteiro do projeto.

Linhas 37: Acrescente 1 à resposta, preservando a ordem definida no contrato de saída.

Linhas 38: Finalize o bloco atual. Variáveis e alterações pertencem à responsabilidade descrita nas linhas anteriores.

Linhas 39: Trate explicitamente o caminho alternativo; ele só executa quando a condição anterior é falsa.

Linhas 40: Acrescente 0 à resposta, preservando a ordem definida no contrato de saída.

Linhas 41: Finalize o bloco atual. Variáveis e alterações pertencem à responsabilidade descrita nas linhas anteriores.

Linhas 42: Finalize o bloco atual. Variáveis e alterações pertencem à responsabilidade descrita nas linhas anteriores.

Linhas 43: Núcleo de domínio: return out;. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 44: Núcleo de domínio: }. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

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

Linhas 12: Adaptador nativo: parser TSV estrito, limites, ownership do arquivo e erro explícito: if(line!="time")throw std::invalid_argument("Cabecalho invalido");. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

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

Linhas 8: Testes nativos: não dependem de assert, portanto continuam ativos em builds release: check({{0},{1},{2},{3},{10}},{1,1,1,0,1},false);. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 9: Testes nativos: não dependem de assert, portanto continuam ativos em builds release: check({{1},{0}},{},true);. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 10: Testes nativos: não dependem de assert, portanto continuam ativos em builds release: check({},{},false);. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 11: Testes nativos: não dependem de assert, portanto continuam ativos em builds release: check({{-1}},{},true);. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 12: Testes nativos: não dependem de assert, portanto continuam ativos em builds release: std::cout<<"Todos os casos passaram.\n";. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 13: Testes nativos: não dependem de assert, portanto continuam ativos em builds release: }. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

### input.tsv
Linhas 1: Fixture de entrada: a primeira linha nomeia as colunas; registros usam TAB: time. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 2: Fixture de entrada: a primeira linha nomeia as colunas; registros usam TAB: 0. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 3: Fixture de entrada: a primeira linha nomeia as colunas; registros usam TAB: 1. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 4: Fixture de entrada: a primeira linha nomeia as colunas; registros usam TAB: 2. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 5: Fixture de entrada: a primeira linha nomeia as colunas; registros usam TAB: 3. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 6: Fixture de entrada: a primeira linha nomeia as colunas; registros usam TAB: 10. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

## 8. Limites
O(n²) para tornar a semântica explícita; uma deque melhora o custo para O(n). O projeto é um componente executável de escopo definido; não é uma plataforma empresarial pronta.

## 9. Apresente no portfólio
Aplicação: Confiabilidade. Este componente resolve uma decisão recorrente de produto ou infraestrutura; o valor do portfólio está em demonstrar invariantes, testes e os limites da solução.

Extensão sugerida: Troque a varredura por deque e faça um teste de equivalência entre as implementações.

Explique o problema, registre a execução dos testes e mostre os contratos de entrada e saída. Inclua uma decisão descartada, a análise de complexidade e as limitações acima. Implemente uma extensão sua e documente como a validou.

