import math

def cell(data, row, col):
    return data[row][col]

minv, maxv, absv = min, max, abs
def quotient(a, b):
    return math.trunc(a / b)

def solve(data):
    bounds = [[0,10000],[0,99]]
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
    used = [0] * (n)
    for i in range(0, n):
        for j in range(0, i):
            if cell(data,i,0) == cell(data,j,0) and cell(data,i,1) == cell(data,j,1):
                raise ValueError("Regra de negócio inválida")
        if cell(data,i,0) < 10 or (cell(data,i,0) == 10 and cell(data,i,1) <= 5):
            used[i] = 1
    for turn in range(0, 3):
        best = -1
        for i in range(0, n):
            if used[i] == 0:
                if best == -1:
                    best = i
                else:
                    if cell(data,i,0) < cell(data,best,0) or (cell(data,i,0) == cell(data,best,0) and cell(data,i,1) < cell(data,best,1)):
                        best = i
        if best != -1:
            out.append(cell(data,best,0))
            out.append(cell(data,best,1))
            used[best] = 1
    return out
