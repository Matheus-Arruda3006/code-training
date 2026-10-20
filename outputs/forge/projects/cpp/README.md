# Cache LRU em memória

Linguagem: C++

## Pré-requisitos
Templates básicos, referências, containers e iteradores.

## 1. Problema
Implemente um cache de capacidade 2 que promova acessos e atualizações. Quando cheio, remova a chave menos recentemente usada.

## 2. Decisão de arquitetura
Combine list e unordered_map: a lista mantém recência e o mapa encontra o nó. splice move o nó sem invalidar seu iterador, tornando a promoção eficiente.

## 3. Crie os arquivos
- lru.hpp
- main.cpp

## 4. Execute na pasta do projeto
```sh
c++ -std=c++17 -Wall -Wextra -Werror main.cpp -o cache
./cache
```

## 5. Resultado esperado
```
Cache LRU: testes passaram.
```

## 6. Critérios de aceite
- Inserir a, b; ler a; inserir c deve expulsar b
- Atualizar a deve manter apenas um nó para a
- Capacidade zero deve lançar invalid_argument

## 7. Leitura do código
### lru.hpp
Linhas 1–6: Includes e pragma once fornecem as estruturas e o retorno opcional sem sentinelas ambíguas.

Linhas 8–12: Cada chave do índice aponta para um nó estável da lista.

Linhas 13–18: Valide capacidade e impeça cópia que quebraria os iteradores.

Linhas 19–24: Uma ausência retorna nullopt; um acerto move o nó ao início sem realocação.

Linhas 25–31: Atualização substitui o valor e promove o nó existente.

Linhas 32–34: Se alocar o índice falhar, desfaça a inserção da lista e propague a exceção.

Linhas 35–40: Remova a chave do índice antes de destruir o nó menos recente.

### main.cpp
Linhas 1–4: Importe a implementação e ferramentas de teste.

Linhas 5–14: Cubra promoção por leitura, expulsão e atualização de chave.

Linhas 15–20: Verifique que capacidade inválida produz a exceção esperada.

## 8. Limites
Operações são O(1) em média, mas hashes patológicos podem degradar. A classe desabilita cópia porque iteradores copiados apontariam para a lista antiga. A implementação não sincroniza threads.

## 9. Apresente no portfólio
Explique o problema, registre a execução dos testes e mostre os contratos de entrada e saída. Inclua uma decisão descartada, a análise de complexidade e as limitações acima. Implemente uma extensão sua e documente como a validou.

