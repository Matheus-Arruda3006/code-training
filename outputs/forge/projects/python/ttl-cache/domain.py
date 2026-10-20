import math

def cell(data, row, col):
    return data[row][col]

minv, maxv, absv = min, max, abs
def quotient(a, b):
    return math.trunc(a / b)

def solve(data):
    bounds = [[0,99],[0,10000],[1,100]]
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
    expiry = [0] * (100)
    for i in range(0, n):
        if i > 0:
            if cell(data,i,1) < cell(data,i-1,1):
                raise ValueError("Regra de negócio inválida")
        key = cell(data,i,0)
        now = cell(data,i,1)
        if now < expiry[key]:
            out.append(1)
        else:
            expiry[key] = now+cell(data,i,2)
            out.append(0)
    return out
