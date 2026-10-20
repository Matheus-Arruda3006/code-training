import math

def cell(data, row, col):
    return data[row][col]

minv, maxv, absv = min, max, abs
def quotient(a, b):
    return math.trunc(a / b)

def solve(data):
    bounds = [[1,100],[0,10000]]
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
    total = 0
    weights = 0
    for i in range(0, n):
        total = total+cell(data,i,1)
        weights = weights+cell(data,i,0)
    shares = [0] * (n)
    remainders = [0] * (n)
    assigned = 0
    for i in range(0, n):
        shares[i] = quotient(total*cell(data,i,0),weights)
        remainders[i] = (total*cell(data,i,0)) % weights
        assigned = assigned+shares[i]
    while assigned < total:
        best = 0
        for i in range(1, n):
            if remainders[i] > remainders[best]:
                best = i
        shares[best] = shares[best]+1
        remainders[best] = -1
        assigned = assigned+1
    for i in range(0, n):
        out.append(shares[i])
    return out
