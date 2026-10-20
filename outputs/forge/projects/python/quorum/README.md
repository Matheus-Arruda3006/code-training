# Leitura por quórum de réplicas

Linguagem: Python

## Pré-requisitos
Funções, dicionários, módulos e leitura de arquivos.

## 1. Problema
Escolher o par versão/valor com maioria estrita das respostas. Saída: versão e valor; sem maioria, retornar -1.

## 2. Decisão de arquitetura
Versão igual com valor diferente indica conflito; contar apenas a versão mascararia divergência de dados. Funções puras, validação de tipos em runtime, listas e unittest. A CLI usa o módulo csv e mantém leitura de arquivos separada da regra.

## Contrato de dados

TSV com cabeçalho e até 200 registros. Cada campo é um inteiro dentro dos limites inclusivos. Na API .NET, envie as linhas como arrays em data.

| Índice | Campo | Mínimo | Máximo |
|---|---|---|---|
| 0 | version | 0 | 10000 |
| 1 | value | 0 | 10000 |

## Roteiro guiado

1. Defina o contrato: Escolher o par versão/valor com maioria estrita das respostas. Saída: versão e valor; sem maioria, retornar -1.

2. Crie os arquivos de domínio e leia a decisão: Versão igual com valor diferente indica conflito; contar apenas a versão mascararia divergência de dados.

3. Implemente o adaptador da linguagem: Funções puras, validação de tipos em runtime, listas e unittest. A CLI usa o módulo csv e mantém leitura de arquivos separada da regra.

4. Execute os testes antes de usar input.tsv. Os valores esperados são fixos e independentes do retorno calculado.

5. Faça uma extensão autoral: Distinga réplicas por ID, descarte respostas duplicadas e introduza timeout de coleta.

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
[2,10]
```

## 6. Critérios de aceite
- Caso 1: entrada [[2,10],[2,10],[3,11]] deve produzir [2,10].
- Caso 2: entrada [[2,10],[2,11]] deve produzir [-1].
- Caso 3: entrada [] deve produzir [-1].
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

Linhas 11: Núcleo de domínio: bounds = [[0,10000],[0,10000]]. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

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

Linhas 22: Inicialize a variável local: selected = -1. Ela guarda estado intermediário desta regra.

Linhas 23: Repita i in 0..n; o limite final é exclusivo. O índice identifica a posição, não um ID de negócio.

Linhas 24: Inicialize a variável local: votes = 0. Ela guarda estado intermediário desta regra.

Linhas 25: Repita j in 0..n; o limite final é exclusivo. O índice identifica a posição, não um ID de negócio.

Linhas 26: Verifique version[i] == version[j] && value[i] == value[j]. Este ramo só altera o estado quando a condição é verdadeira.

Linhas 27: Atualize o estado com votes = votes+1. Confira o invariante e o exemplo de mesa no roteiro do projeto.

Linhas 28: Verifique votes*2 > n. Este ramo só altera o estado quando a condição é verdadeira.

Linhas 29: Atualize o estado com selected = i. Confira o invariante e o exemplo de mesa no roteiro do projeto.

Linhas 30: Verifique selected == -1. Este ramo só altera o estado quando a condição é verdadeira.

Linhas 31: Acrescente -1 à resposta, preservando a ordem definida no contrato de saída.

Linhas 32: Trate explicitamente o caminho alternativo; ele só executa quando a condição anterior é falsa.

Linhas 33: Acrescente version[selected] à resposta, preservando a ordem definida no contrato de saída.

Linhas 34: Acrescente value[selected] à resposta, preservando a ordem definida no contrato de saída.

Linhas 35: Núcleo de domínio: return out. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

### main.py
Linhas 1: Adaptador CLI: leitura incremental e validação do protocolo: import csv. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 2: Adaptador CLI: leitura incremental e validação do protocolo: import json. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 3: Adaptador CLI: leitura incremental e validação do protocolo: import re. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 4: Adaptador CLI: leitura incremental e validação do protocolo: import sys. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 5: Adaptador CLI: leitura incremental e validação do protocolo: from domain import solve. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 6: Separação visual entre responsabilidades.

Linhas 7: Adaptador CLI: leitura incremental e validação do protocolo: with open(sys.argv[1] if len(sys.argv)>1 else 'input.tsv', encoding='utf-8', newline='') as source:. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 8: Adaptador CLI: leitura incremental e validação do protocolo: reader = csv.reader(source, delimiter='\t'). Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 9: Adaptador CLI: leitura incremental e validação do protocolo: if next(reader, None) != ["version","value"]:. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

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

Linhas 4: Testes: casos de negócio, limites e forma inválida: CASES = [{"input":[[2,10],[2,10],[3,11]],"expected":[2,10]},{"input":[[2,10],[2,11]],"expected":[-1]},{"input":[],"expected":[-1]}]. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 5: Testes: casos de negócio, limites e forma inválida: class DomainTest(unittest.TestCase):. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 6: Testes: casos de negócio, limites e forma inválida: def test_contract(self):. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 7: Testes: casos de negócio, limites e forma inválida: for case in CASES:. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 8: Testes: casos de negócio, limites e forma inválida: with self.subTest(case=case):. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 9: Testes: casos de negócio, limites e forma inválida: if case['expected'] is None:. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 10: Testes: casos de negócio, limites e forma inválida: with self.assertRaises(ValueError): solve(case['input']). Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 11: Testes: casos de negócio, limites e forma inválida: else:. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 12: Testes: casos de negócio, limites e forma inválida: self.assertEqual(solve(case['input']), case['expected']). Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 13: Testes: casos de negócio, limites e forma inválida: def test_validation(self):. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 14: Testes: casos de negócio, limites e forma inválida: for invalid in [[[]], [[-1,0]], [[0,0]]*201]:. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 15: Testes: casos de negócio, limites e forma inválida: with self.assertRaises(ValueError): solve(invalid). Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 16: Testes: casos de negócio, limites e forma inválida: if __name__ == '__main__': unittest.main(). Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

### input.tsv
Linhas 1: Fixture de entrada: a primeira linha nomeia as colunas; registros usam TAB: version	value. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 2: Fixture de entrada: a primeira linha nomeia as colunas; registros usam TAB: 2	10. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 3: Fixture de entrada: a primeira linha nomeia as colunas; registros usam TAB: 2	10. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

Linhas 4: Fixture de entrada: a primeira linha nomeia as colunas; registros usam TAB: 3	11. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.

## 8. Limites
O(n²); isso verifica concordância de respostas, não implementa protocolo de consenso distribuído. O projeto é um componente executável de escopo definido; não é uma plataforma empresarial pronta.

## 9. Apresente no portfólio
Aplicação: Distribuição. Este componente resolve uma decisão recorrente de produto ou infraestrutura; o valor do portfólio está em demonstrar invariantes, testes e os limites da solução.

Extensão sugerida: Distinga réplicas por ID, descarte respostas duplicadas e introduza timeout de coleta.

Explique o problema, registre a execução dos testes e mostre os contratos de entrada e saída. Inclua uma decisão descartada, a análise de complexidade e as limitações acima. Implemente uma extensão sua e documente como a validou.

