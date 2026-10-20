import math

def cell(data, row, col):
    return data[row][col]

minv, maxv, absv = min, max, abs
def quotient(a, b):
    return math.trunc(a / b)

def solve(data):
    bounds = [[-1,199],[1,10000]]
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
    finish = [0] * (n)
    deadline = 0
    for i in range(0, n):
        parent = cell(data,i,0)
        if parent >= i:
            raise ValueError("Regra de negócio inválida")
        start = 0
        if parent >= 0:
            start = finish[parent]
        finish[i] = start+cell(data,i,1)
        deadline = maxv(deadline,finish[i])
        out.append(finish[i])
    out.append(deadline)
    return out
