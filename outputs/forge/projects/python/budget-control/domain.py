import math

def cell(data, row, col):
    return data[row][col]

minv, maxv, absv = min, max, abs
def quotient(a, b):
    return math.trunc(a / b)

def solve(data):
    bounds = [[0,99],[0,10000],[0,10000]]
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
    balances = [0] * (100)
    for i in range(0, n):
        dept = cell(data,i,0)
        balances[dept] = balances[dept]+cell(data,i,1)
        if cell(data,i,2) <= balances[dept]:
            balances[dept] = balances[dept]-cell(data,i,2)
            out.append(1)
        else:
            out.append(0)
    total = 0
    for dept in range(0, 100):
        total = total+balances[dept]
    out.append(total)
    return out
