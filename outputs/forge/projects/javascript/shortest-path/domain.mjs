const cell = (data, row, col) => data[row][col];
const minv = Math.min, maxv = Math.max, absv = Math.abs;
const quotient = (a, b) => Math.trunc(a / b);
export function solve(data) {
  if (!Array.isArray(data) || data.length > 200) throw new RangeError('Até 200 registros');
  const bounds = [[0,9],[0,9],[0,10000]];
  for (const row of data) {
    if (!Array.isArray(row) || row.length !== bounds.length) throw new RangeError('Colunas inválidas');
    row.forEach((value, index) => {
      if (!Number.isSafeInteger(value) || value < bounds[index][0] || value > bounds[index][1]) throw new RangeError('Valor fora do contrato');
    });
  }
  const n = data.length;
  const out = [];
    const distance = new Array(10).fill(0);
    for (let node = (1); node < 10; node++) {
        distance[node] = 1000000000;
    }
    for (let turn = (0); turn < 9; turn++) {
        for (let edge = (0); edge < n; edge++) {
            let originNode = cell(data,edge,0);
            let to = cell(data,edge,1);
            let cost = cell(data,edge,2);
            if (distance[originNode] < 1000000000) {
                distance[to] = minv(distance[to],distance[originNode]+cost);
            }
        }
    }
    for (let node = (0); node < 10; node++) {
        if (distance[node] == 1000000000) {
            out.push(-1);
        }
        else {
            out.push(distance[node]);
        }
    }
  return out;
}
