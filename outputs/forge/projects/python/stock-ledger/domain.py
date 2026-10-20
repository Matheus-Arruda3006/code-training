import math

def cell(data, row, col):
    return data[row][col]

minv, maxv, absv = min, max, abs
def quotient(a, b):
    return math.trunc(a / b)

def solve(data):
    bounds = [[0,99],[0,2],[1,10000]]
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
    stock = [0] * (100)
    for i in range(0, n):
        sku = cell(data,i,0)
        action = cell(data,i,1)
        quantity = cell(data,i,2)
        if action == 0:
            stock[sku] = stock[sku]+quantity
        if action == 1 and quantity > stock[sku]:
            out.append(-1)
        else:
            if action == 1:
                stock[sku] = stock[sku]-quantity
            out.append(stock[sku])
    return out
