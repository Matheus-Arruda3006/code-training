import math

def cell(data, row, col):
    return data[row][col]

minv, maxv, absv = min, max, abs
def quotient(a, b):
    return math.trunc(a / b)

def solve(data):
    bounds = [[1,10000],[0,10000],[1,10000],[0,10000]]
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
    for i in range(0, n):
        baselineTotal = cell(data,i,0)
        baseErrors = cell(data,i,1)
        canary = cell(data,i,2)
        canaryErrors = cell(data,i,3)
        if baseErrors > baselineTotal or canaryErrors > canary:
            raise ValueError("Regra de negócio inválida")
        if canaryErrors*baselineTotal*100 <= baseErrors*canary*100+baselineTotal*canary:
            out.append(1)
        else:
            out.append(0)
    return out
