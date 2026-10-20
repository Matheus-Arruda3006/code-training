const cell = (data, row, col) => data[row][col];
const minv = Math.min, maxv = Math.max, absv = Math.abs;
const quotient = (a, b) => Math.trunc(a / b);
export function solve(data) {
  if (!Array.isArray(data) || data.length > 200) throw new RangeError('Até 200 registros');
  const bounds = [[1,100]];
  for (const row of data) {
    if (!Array.isArray(row) || row.length !== bounds.length) throw new RangeError('Colunas inválidas');
    row.forEach((value, index) => {
      if (!Number.isSafeInteger(value) || value < bounds[index][0] || value > bounds[index][1]) throw new RangeError('Valor fora do contrato');
    });
  }
  const n = data.length;
  const out = [];
    let wave = 0;
    let used = 0;
    for (let i = (0); i < n; i++) {
        if (used+cell(data,i,0) > 100) {
            wave = wave+1;
            used = 0;
        }
        used = used+cell(data,i,0);
        out.push(wave);
    }
    if (n == 0) {
        out.push(0);
    }
    else {
        out.push(wave+1);
    }
  return out;
}
