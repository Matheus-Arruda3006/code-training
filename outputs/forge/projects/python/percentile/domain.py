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
    values = [0] * (n)
    for i in range(0, n):
        values[i] = cell(data,i,0)
        j = i
        while j > 0:
            if values[j-1] > values[j]:
                swap = values[j-1]
                values[j-1] = values[j]
                values[j] = swap
            j = j-1
    if n > 0:
        out.append(values[quotient(50*n+99,100)-1])
        out.append(values[quotient(95*n+99,100)-1])
    return out
