const cell = (data, row, col) => data[row][col];
const minv = Math.min, maxv = Math.max, absv = Math.abs;
const quotient = (a, b) => Math.trunc(a / b);
export function solve(data) {
  if (!Array.isArray(data) || data.length > 200) throw new RangeError('Até 200 registros');
  const bounds = [[0,10000],[0,10000]];
  for (const row of data) {
    if (!Array.isArray(row) || row.length !== bounds.length) throw new RangeError('Colunas inválidas');
    row.forEach((value, index) => {
      if (!Number.isSafeInteger(value) || value < bounds[index][0] || value > bounds[index][1]) throw new RangeError('Valor fora do contrato');
    });
  }
  const n = data.length;
  const out = [];
    let peak = 0;
    let first = -1;
    for (let i = (0); i < n; i++) {
        if (cell(data,i,0) >= cell(data,i,1)) {
            throw new RangeError("Regra de negócio inválida");
        }
    }
    for (let i = (0); i < n; i++) {
        let time = cell(data,i,0);
        let count = 0;
        for (let j = (0); j < n; j++) {
            if (cell(data,j,0) <= time && cell(data,j,1) > time) {
                count = count+1;
            }
        }
        if (count > peak || (count == peak && (first == -1 || time < first))) {
            peak = count;
            first = time;
        }
    }
    out.push(peak);
    out.push(first);
  return out;
}
