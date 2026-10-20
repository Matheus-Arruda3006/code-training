import math

def cell(data, row, col):
    return data[row][col]

minv, maxv, absv = min, max, abs
def quotient(a, b):
    return math.trunc(a / b)

def solve(data):
    bounds = [[0,10000]]
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
    accepted = [0] * (n)
    for i in range(0, n):
        if i > 0:
            if cell(data,i,0) < cell(data,i-1,0):
                raise ValueError("Regra de negócio inválida")
        count = 0
        for j in range(0, i):
            if accepted[j] == 1 and cell(data,j,0) > cell(data,i,0)-10:
                count = count+1
        if count < 3:
            accepted[i] = 1
            out.append(1)
        else:
            out.append(0)
    return out
