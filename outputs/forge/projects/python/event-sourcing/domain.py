import math

def cell(data, row, col):
    return data[row][col]

minv, maxv, absv = min, max, abs
def quotient(a, b):
    return math.trunc(a / b)

def solve(data):
    bounds = [[0,99],[-10000,10000]]
    if not isinstance(data, list) or len(data) > 200:
        raise ValueError('Até 200 registros')
    for row in data:
        if not isinstance(row, list) or len(row) != len(bounds):
            raise ValueError('Colunas inválidas')
        for value, (low, high) in zip(row, bounds):
            if type(value) is not int or not low <= value <= high:
                raise ValueError('Valor fora do contrato')
    n = len(data)
    out = []
    seen = [0] * (100)
    deltas = [0] * (100)
    balance = 0
    for i in range(0, n):
        id = cell(data,i,0)
        if seen[id] == 1:
            if deltas[id] != cell(data,i,1):
                raise ValueError("Regra de negócio inválida")
        else:
            seen[id] = 1
            deltas[id] = cell(data,i,1)
            balance = balance+cell(data,i,1)
        out.append(balance)
    return out
