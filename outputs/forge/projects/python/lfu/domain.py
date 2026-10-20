import math

def cell(data, row, col):
    return data[row][col]

minv, maxv, absv = min, max, abs
def quotient(a, b):
    return math.trunc(a / b)

def solve(data):
    bounds = [[0,99]]
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
    present = [0] * (100)
    frequency = [0] * (100)
    age = [0] * (100)
    size = 0
    for i in range(0, n):
        key = cell(data,i,0)
        if present[key] == 1:
            frequency[key] = frequency[key]+1
            out.append(1)
        else:
            out.append(0)
            if size == 3:
                victim = -1
                for k in range(0, 100):
                    if present[k] == 1:
                        if victim == -1:
                            victim = k
                        else:
                            if frequency[k] < frequency[victim] or (frequency[k] == frequency[victim] and age[k] < age[victim]):
                                victim = k
                present[victim] = 0
                size = size-1
            present[key] = 1
            frequency[key] = 1
            age[key] = i
            size = size+1
    return out
