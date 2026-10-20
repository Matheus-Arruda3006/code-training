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
    selected = -1
    for i in range(0, n):
        votes = 0
        for j in range(0, n):
            if cell(data,i,0) == cell(data,j,0) and cell(data,i,1) == cell(data,j,1):
                votes = votes+1
        if votes*2 > n:
            selected = i
    if selected == -1:
        out.append(-1)
    else:
        out.append(cell(data,selected,0))
        out.append(cell(data,selected,1))
    return out
