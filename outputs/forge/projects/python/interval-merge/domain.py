import math

def cell(data, row, col):
    return data[row][col]

minv, maxv, absv = min, max, abs
def quotient(a, b):
    return math.trunc(a / b)

def solve(data):
    bounds = [[0,10000],[0,10000]]
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
    start = -1
    end = -1
    for i in range(0, n):
        if cell(data,i,0) >= cell(data,i,1):
            raise ValueError("Regra de negócio inválida")
        if i > 0:
            if cell(data,i,0) < cell(data,i-1,0):
                raise ValueError("Regra de negócio inválida")
        if start == -1:
            start = cell(data,i,0)
            end = cell(data,i,1)
        else:
            if cell(data,i,0) <= end:
                end = maxv(end,cell(data,i,1))
            else:
                out.append(start)
                out.append(end)
                start = cell(data,i,0)
                end = cell(data,i,1)
    if start != -1:
        out.append(start)
        out.append(end)
    return out
