import math

def cell(data, row, col):
    return data[row][col]

minv, maxv, absv = min, max, abs
def quotient(a, b):
    return math.trunc(a / b)

def solve(data):
    bounds = [[0,19],[0,19]]
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
    active = [0] * (20)
    indegree = [0] * (20)
    removed = [0] * (20)
    for i in range(0, n):
        active[cell(data,i,0)] = 1
        active[cell(data,i,1)] = 1
        indegree[cell(data,i,1)] = indegree[cell(data,i,1)]+1
    for turn in range(0, 20):
        best = -1
        for node in range(0, 20):
            if active[node] == 1 and removed[node] == 0 and indegree[node] == 0 and best == -1:
                best = node
        if best != -1:
            out.append(best)
            removed[best] = 1
            for i in range(0, n):
                if cell(data,i,0) == best:
                    indegree[cell(data,i,1)] = indegree[cell(data,i,1)]-1
    for node in range(0, 20):
        if active[node] == 1 and removed[node] == 0:
            raise ValueError("Regra de negócio inválida")
    return out
