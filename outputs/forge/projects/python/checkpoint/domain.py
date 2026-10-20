import math

def cell(data, row, col):
    return data[row][col]

minv, maxv, absv = min, max, abs
def quotient(a, b):
    return math.trunc(a / b)

def solve(data):
    bounds = [[0,199]]
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
    seen = [0] * (200)
    checkpoint = -1
    for i in range(0, n):
        seen[cell(data,i,0)] = 1
        advance = 1
        while advance == 1:
            advance = 0
            if checkpoint+1 < 200:
                if seen[checkpoint+1] == 1:
                    checkpoint = checkpoint+1
                    advance = 1
        out.append(checkpoint)
    return out
