# Diff de snapshots de configuração

Linguagem: Python

## Pré-requisitos
Funções, dicionários, módulos e leitura de arquivos.

## 1. Problema
Comparar snapshot antigo (side 0) e novo (side 1). Rejeitar ID repetido no mesmo lado. Saída: pares ID,operação: 1 inserido, 2 alterado, 3 removido.

## 2. Decisão de arquitetura
Distinguir presença de valor evita tratar zero como ausência. O resultado é ordenado por ID. Funções puras, validação de tipos em runtime, listas e unittest. A CLI usa o módulo csv e mantém leitura de arquivos separada da regra.

## Contrato de dados

TSV com cabeçalho e até 200 registros. Cada campo é um inteiro dentro dos limites inclusivos. Na API .NET, envie as linhas como arrays em data.

| Índice | Campo | Mínimo | Máximo |
|---|---|---|---|
| 0 | id | 0 | 99 |
| 1 | side | 0 | 1 |
| 2 | value | 0 | 10000 |

## Roteiro guiado

1. Defina o contrato: Comparar snapshot antigo (side 0) e novo (side 1). Rejeitar ID repetido no mesmo lado. Saída: pares ID,operação: 1 inserido, 2 alterado, 3 removido.

2. Crie os arquivos de domínio e leia a decisão: Distinguir presença de valor evita tratar zero como ausência. O resultado é ordenado por ID.

3. Implemente o adaptador da linguagem: Funções puras, validação de tipos em runtime, listas e unittest. A CLI usa o módulo csv e mantém leitura de arquivos separada da regra.

4. Execute os testes antes de usar input.tsv. Os valores esperados são fixos e independentes do retorno calculado.

5. Faça uma extensão autoral: Adicione comparação estrutural e relatório de mudanças compatíveis e incompatíveis.

## 3. Crie os arquivos
- domain.py
- main.py
- test_domain.py
- input.tsv

## 4. Execute na pasta do projeto
```sh
python -m unittest -v
python main.py input.tsv
```


## 5. Resultado esperado
```
[1,2,2,3,3,1]
```

## 6. Critérios de aceite
- Caso 1: entrada [[1,0,10],[1,1,20],[2,0,0],[3,1,0]] deve produzir [1,2,2,3,3,1].
- Caso 2: a entrada inválida deve falhar, sem resposta parcial.
- Caso 3: entrada [] deve produzir [].
- Rejeitar colunas incorretas, valores fora dos limites e mais de 200 registros.

## 7. Leitura do código
### domain.py
Linhas 1: Núcleo de domínio: import math. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 2: Separação visual entre responsabilidades.

Linhas 3: Núcleo de domínio: def cell(data, row, col):. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 4: Núcleo de domínio: return data[row][col]. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 5: Separação visual entre responsabilidades.

Linhas 6: Núcleo de domínio: minv, maxv, absv = min, max, abs. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 7: Núcleo de domínio: def quotient(a, b):. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 8: Núcleo de domínio: return math.trunc(a / b). Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 9: Separação visual entre responsabilidades.

Linhas 10: Núcleo de domínio: def solve(data):. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 11: Núcleo de domínio: bounds = [[0,99],[0,1],[0,10000]]. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 12: Núcleo de domínio: if not isinstance(data, list) or len(data) > 200:. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 13: Núcleo de domínio: raise ValueError('Até 200 registros'). Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 14: Núcleo de domínio: for row in data:. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 15: Núcleo de domínio: if not isinstance(row, list) or len(row) != len(bounds):. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 16: Núcleo de domínio: raise ValueError('Colunas inválidas'). Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 17: Núcleo de domínio: for value, (low, high) in zip(row, bounds):. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 18: Núcleo de domínio: if type(value) is not int or not low <= value <= high:. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 19: Núcleo de domínio: raise ValueError('Valor fora do contrato'). Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 20: Núcleo de domínio: n = len(data). Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 21: Núcleo de domínio: out = []. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 22: Crie um vetor de inteiros inicializado com zeros (oldSeen 100); nenhum estado deve vazar entre chamadas.

Linhas 23: Crie um vetor de inteiros inicializado com zeros (newSeen 100); nenhum estado deve vazar entre chamadas.

Linhas 24: Crie um vetor de inteiros inicializado com zeros (oldValue 100); nenhum estado deve vazar entre chamadas.

Linhas 25: Crie um vetor de inteiros inicializado com zeros (newValue 100); nenhum estado deve vazar entre chamadas.

Linhas 26: Repita i in 0..n; o limite final é exclusivo. O índice identifica a posição, não um ID de negócio.

Linhas 27: Inicialize a variável local: id = id[i]. Ela guarda estado intermediário desta regra.

Linhas 28: Verifique side[i] == 0. Este ramo só altera o estado quando a condição é verdadeira.

Linhas 29: Verifique oldSeen[id] == 1. Este ramo só altera o estado quando a condição é verdadeira.

Linhas 30: Interrompa a operação com erro de validação; a resposta parcial não pode ser apresentada como sucesso.

Linhas 31: Atualize o estado com oldSeen[id] = 1. Confira o invariante e o exemplo de mesa no roteiro do projeto.

Linhas 32: Atualize o estado com oldValue[id] = value[i]. Confira o invariante e o exemplo de mesa no roteiro do projeto.

Linhas 33: Trate explicitamente o caminho alternativo; ele só executa quando a condição anterior é falsa.

Linhas 34: Verifique newSeen[id] == 1. Este ramo só altera o estado quando a condição é verdadeira.

Linhas 35: Interrompa a operação com erro de validação; a resposta parcial não pode ser apresentada como sucesso.

Linhas 36: Atualize o estado com newSeen[id] = 1. Confira o invariante e o exemplo de mesa no roteiro do projeto.

Linhas 37: Atualize o estado com newValue[id] = value[i]. Confira o invariante e o exemplo de mesa no roteiro do projeto.

Linhas 38: Repita id in 0..100; o limite final é exclusivo. O índice identifica a posição, não um ID de negócio.

Linhas 39: Verifique oldSeen[id] == 0 && newSeen[id] == 1. Este ramo só altera o estado quando a condição é verdadeira.

Linhas 40: Acrescente id à resposta, preservando a ordem definida no contrato de saída.

Linhas 41: Acrescente 1 à resposta, preservando a ordem definida no contrato de saída.

Linhas 42: Verifique oldSeen[id] == 1 && newSeen[id] == 0. Este ramo só altera o estado quando a condição é verdadeira.

Linhas 43: Acrescente id à resposta, preservando a ordem definida no contrato de saída.

Linhas 44: Acrescente 3 à resposta, preservando a ordem definida no contrato de saída.

Linhas 45: Verifique oldSeen[id] == 1 && newSeen[id] == 1 && oldValue[id] != newValue[id]. Este ramo só altera o estado quando a condição é verdadeira.

Linhas 46: Acrescente id à resposta, preservando a ordem definida no contrato de saída.

Linhas 47: Acrescente 2 à resposta, preservando a ordem definida no contrato de saída.

Linhas 48: Núcleo de domínio: return out. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

### main.py
Linhas 1: Adaptador CLI: leitura incremental e validação do protocolo: import csv. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 2: Adaptador CLI: leitura incremental e validação do protocolo: import json. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 3: Adaptador CLI: leitura incremental e validação do protocolo: import re. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 4: Adaptador CLI: leitura incremental e validação do protocolo: import sys. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 5: Adaptador CLI: leitura incremental e validação do protocolo: from domain import solve. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 6: Separação visual entre responsabilidades.

Linhas 7: Adaptador CLI: leitura incremental e validação do protocolo: with open(sys.argv[1] if len(sys.argv)>1 else 'input.tsv', encoding='utf-8', newline='') as source:. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 8: Adaptador CLI: leitura incremental e validação do protocolo: reader = csv.reader(source, delimiter='\t'). Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 9: Adaptador CLI: leitura incremental e validação do protocolo: if next(reader, None) != ["id","side","value"]:. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 10: Adaptador CLI: leitura incremental e validação do protocolo: raise ValueError('Cabeçalho inválido'). Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 11: Adaptador CLI: leitura incremental e validação do protocolo: data = []. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 12: Adaptador CLI: leitura incremental e validação do protocolo: for row in reader:. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 13: Adaptador CLI: leitura incremental e validação do protocolo: if not row: continue. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 14: Adaptador CLI: leitura incremental e validação do protocolo: if any(not re.fullmatch(r'-?\d+', value) for value in row):. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 15: Adaptador CLI: leitura incremental e validação do protocolo: raise ValueError('Inteiro inválido'). Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 16: Adaptador CLI: leitura incremental e validação do protocolo: data.append([int(value) for value in row]). Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 17: Adaptador CLI: leitura incremental e validação do protocolo: print(json.dumps(solve(data))). Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

### test_domain.py
Linhas 1: Testes: casos de negócio, limites e forma inválida: import unittest. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 2: Testes: casos de negócio, limites e forma inválida: from domain import solve. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 3: Separação visual entre responsabilidades.

Linhas 4: Testes: casos de negócio, limites e forma inválida: CASES = [{"input":[[1,0,10],[1,1,20],[2,0,0],[3,1,0]],"expected":[1,2,2,3,3,1]},{"input":[[1,0,1],[1,0,2]],"expected":None},{"input":[],"exp. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 5: Testes: casos de negócio, limites e forma inválida: class DomainTest(unittest.TestCase):. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 6: Testes: casos de negócio, limites e forma inválida: def test_contract(self):. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 7: Testes: casos de negócio, limites e forma inválida: for case in CASES:. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 8: Testes: casos de negócio, limites e forma inválida: with self.subTest(case=case):. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 9: Testes: casos de negócio, limites e forma inválida: if case['expected'] is None:. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 10: Testes: casos de negócio, limites e forma inválida: with self.assertRaises(ValueError): solve(case['input']). Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 11: Testes: casos de negócio, limites e forma inválida: else:. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 12: Testes: casos de negócio, limites e forma inválida: self.assertEqual(solve(case['input']), case['expected']). Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 13: Testes: casos de negócio, limites e forma inválida: def test_validation(self):. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 14: Testes: casos de negócio, limites e forma inválida: for invalid in [[[]], [[-1,0,0]], [[0,0,0]]*201]:. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 15: Testes: casos de negócio, limites e forma inválida: with self.assertRaises(ValueError): solve(invalid). Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 16: Testes: casos de negócio, limites e forma inválida: if __name__ == '__main__': unittest.main(). Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

### input.tsv
Linhas 1: Fixture de entrada: a primeira linha nomeia as colunas; registros usam TAB: id	side	value. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 2: Fixture de entrada: a primeira linha nomeia as colunas; registros usam TAB: 1	0	10. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 3: Fixture de entrada: a primeira linha nomeia as colunas; registros usam TAB: 1	1	20. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 4: Fixture de entrada: a primeira linha nomeia as colunas; registros usam TAB: 2	0	0. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 5: Fixture de entrada: a primeira linha nomeia as colunas; registros usam TAB: 3	1	0. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

## 8. Limites
O(n+100); compara valores escalares, não árvores JSON nem segredos. O projeto é um componente executável de escopo definido; não é uma plataforma empresarial pronta.

## 9. Apresente no portfólio
Aplicação: Dados. Este componente resolve uma decisão recorrente de produto ou infraestrutura; o valor do portfólio está em demonstrar invariantes, testes e os limites da solução.

Extensão sugerida: Adicione comparação estrutural e relatório de mudanças compatíveis e incompatíveis.

Explique o problema, registre a execução dos testes e mostre os contratos de entrada e saída. Inclua uma decisão descartada, a análise de complexidade e as limitações acima. Implemente uma extensão sua e documente como a validou.

