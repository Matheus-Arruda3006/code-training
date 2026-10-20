import math

def cell(data, row, col):
    return data[row][col]

minv, maxv, absv = min, max, abs
def quotient(a, b):
    return math.trunc(a / b)

def solve(data):
    bounds = [[0,12],[1,100],[1,10000],[0,10000]]
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
        delay = minv(cell(data,i,1),cell(data,i,2))
        for attempt in range(0, cell(data,i,0)):
            delay = minv(delay*2,cell(data,i,2))
        half = quotient(delay,2)
        out.append(half + cell(data,i,3) % (delay-half+1))
    return out
