import math

def cell(data, row, col):
    return data[row][col]

minv, maxv, absv = min, max, abs
def quotient(a, b):
    return math.trunc(a / b)

def solve(data):
    bounds = [[0,9],[0,9],[0,10000]]
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
    distance = [0] * (10)
    for node in range(1, 10):
        distance[node] = 1000000000
    for turn in range(0, 9):
        for edge in range(0, n):
            originNode = cell(data,edge,0)
            to = cell(data,edge,1)
            cost = cell(data,edge,2)
            if distance[originNode] < 1000000000:
                distance[to] = minv(distance[to],distance[originNode]+cost)
    for node in range(0, 10):
        if distance[node] == 1000000000:
            out.append(-1)
        else:
            out.append(distance[node])
    return out
