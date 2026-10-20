const cell = (data, row, col) => data[row][col];
const minv = Math.min, maxv = Math.max, absv = Math.abs;
const quotient = (a, b) => Math.trunc(a / b);
export function solve(data) {
  if (!Array.isArray(data) || data.length > 200) throw new RangeError('Até 200 registros');
  const bounds = [[0,99],[0,1],[0,10000]];
  for (const row of data) {
    if (!Array.isArray(row) || row.length !== bounds.length) throw new RangeError('Colunas inválidas');
    row.forEach((value, index) => {
      if (!Number.isSafeInteger(value) || value < bounds[index][0] || value > bounds[index][1]) throw new RangeError('Valor fora do contrato');
    });
  }
  const n = data.length;
  const out = [];
    const oldSeen = new Array(100).fill(0);
    const newSeen = new Array(100).fill(0);
    const oldValue = new Array(100).fill(0);
    const newValue = new Array(100).fill(0);
    for (let i = (0); i < n; i++) {
        let id = cell(data,i,0);
        if (cell(data,i,1) == 0) {
            if (oldSeen[id] == 1) {
                throw new RangeError("Regra de negócio inválida");
            }
            oldSeen[id] = 1;
            oldValue[id] = cell(data,i,2);
        }
        else {
            if (newSeen[id] == 1) {
                throw new RangeError("Regra de negócio inválida");
            }
            newSeen[id] = 1;
            newValue[id] = cell(data,i,2);
        }
    }
    for (let id = (0); id < 100; id++) {
        if (oldSeen[id] == 0 && newSeen[id] == 1) {
            out.push(id);
            out.push(1);
        }
        if (oldSeen[id] == 1 && newSeen[id] == 0) {
            out.push(id);
            out.push(3);
        }
        if (oldSeen[id] == 1 && newSeen[id] == 1 && oldValue[id] != newValue[id]) {
            out.push(id);
            out.push(2);
        }
    }
  return out;
}
