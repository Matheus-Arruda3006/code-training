const cell = (data, row, col) => data[row][col];
const minv = Math.min, maxv = Math.max, absv = Math.abs;
const quotient = (a, b) => Math.trunc(a / b);
export function solve(data) {
  if (!Array.isArray(data) || data.length > 200) throw new RangeError('Até 200 registros');
  const bounds = [[0,10000],[0,10000],[0,10000]];
  for (const row of data) {
    if (!Array.isArray(row) || row.length !== bounds.length) throw new RangeError('Colunas inválidas');
    row.forEach((value, index) => {
      if (!Number.isSafeInteger(value) || value < bounds[index][0] || value > bounds[index][1]) throw new RangeError('Valor fora do contrato');
    });
  }
  const n = data.length;
  const out = [];
    const used = new Array(n).fill(0);
    let expired = 0;
    for (let i = (0); i < n; i++) {
        if (cell(data,i,0) < cell(data,i,2)) {
            used[i] = 1;
            expired = expired+cell(data,i,1);
        }
    }
    out.push(expired);
    for (let turn = (0); turn < n; turn++) {
        let best = -1;
        for (let i = (0); i < n; i++) {
            if (used[i] == 0) {
                if (best == -1) {
                    best = i;
                }
                else {
                    if (cell(data,i,0) < cell(data,best,0)) {
                        best = i;
                    }
                }
            }
        }
        if (best != -1) {
            out.push(best);
            used[best] = 1;
        }
    }
  return out;
}
