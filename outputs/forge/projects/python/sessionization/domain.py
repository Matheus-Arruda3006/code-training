import math

def cell(data, row, col):
    return data[row][col]

minv, maxv, absv = min, max, abs
def quotient(a, b):
    return math.trunc(a / b)

def solve(data):
    bounds = [[0,99],[0,10000]]
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
    last = [0] * (100)
    sessions = [0] * (100)
    for i in range(0, n):
        user = cell(data,i,0)
        time = cell(data,i,1)
        if sessions[user] > 0 and time < last[user]:
            raise ValueError("Regra de negócio inválida")
        if sessions[user] == 0 or time-last[user] > 30:
            sessions[user] = sessions[user]+1
        last[user] = time
        out.append(sessions[user])
    return out
