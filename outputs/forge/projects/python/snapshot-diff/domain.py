import math

def cell(data, row, col):
    return data[row][col]

minv, maxv, absv = min, max, abs
def quotient(a, b):
    return math.trunc(a / b)

def solve(data):
    bounds = [[0,99],[0,1],[0,10000]]
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
    oldSeen = [0] * (100)
    newSeen = [0] * (100)
    oldValue = [0] * (100)
    newValue = [0] * (100)
    for i in range(0, n):
        id = cell(data,i,0)
        if cell(data,i,1) == 0:
            if oldSeen[id] == 1:
                raise ValueError("Regra de negócio inválida")
            oldSeen[id] = 1
            oldValue[id] = cell(data,i,2)
        else:
            if newSeen[id] == 1:
                raise ValueError("Regra de negócio inválida")
            newSeen[id] = 1
            newValue[id] = cell(data,i,2)
    for id in range(0, 100):
        if oldSeen[id] == 0 and newSeen[id] == 1:
            out.append(id)
            out.append(1)
        if oldSeen[id] == 1 and newSeen[id] == 0:
            out.append(id)
            out.append(3)
        if oldSeen[id] == 1 and newSeen[id] == 1 and oldValue[id] != newValue[id]:
            out.append(id)
            out.append(2)
    return out
