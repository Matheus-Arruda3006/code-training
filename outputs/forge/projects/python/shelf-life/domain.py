import math

def cell(data, row, col):
    return data[row][col]

minv, maxv, absv = min, max, abs
def quotient(a, b):
    return math.trunc(a / b)

def solve(data):
    bounds = [[0,10000],[0,10000],[0,10000]]
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
    expired = 0
    for i in range(0, n):
        if cell(data,i,0) < cell(data,i,2):
            used[i] = 1
            expired = expired+cell(data,i,1)
    out.append(expired)
    for turn in range(0, n):
        best = -1
        for i in range(0, n):
            if used[i] == 0:
                if best == -1:
                    best = i
                else:
                    if cell(data,i,0) < cell(data,best,0):
                        best = i
        if best != -1:
            out.append(best)
            used[best] = 1
    return out
