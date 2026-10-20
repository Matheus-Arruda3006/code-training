import csv
import json
import re
import sys
from domain import solve

with open(sys.argv[1] if len(sys.argv)>1 else 'input.tsv', encoding='utf-8', newline='') as source:
    reader = csv.reader(source, delimiter='\t')
    if next(reader, None) != ["before","after"]:
        raise ValueError('Cabeçalho inválido')
    data = []
    for row in reader:
        if not row: continue
        if any(not re.fullmatch(r'-?\d+', value) for value in row):
            raise ValueError('Inteiro inválido')
        data.append([int(value) for value in row])
print(json.dumps(solve(data)))
