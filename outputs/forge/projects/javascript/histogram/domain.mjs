const cell = (data, row, col) => data[row][col];
const minv = Math.min, maxv = Math.max, absv = Math.abs;
const quotient = (a, b) => Math.trunc(a / b);
export function solve(data) {
  if (!Array.isArray(data) || data.length > 200) throw new RangeError('Até 200 registros');
  const bounds = [[0,10000]];
  for (const row of data) {
    if (!Array.isArray(row) || row.length !== bounds.length) throw new RangeError('Colunas inválidas');
    row.forEach((value, index) => {
      if (!Number.isSafeInteger(value) || value < bounds[index][0] || value > bounds[index][1]) throw new RangeError('Valor fora do contrato');
    });
  }
  const n = data.length;
  const out = [];
    let small = 0;
    let medium = 0;
    let large = 0;
    for (let i = (0); i < n; i++) {
        if (cell(data,i,0) <= 10) {
            small = small+1;
        }
        if (cell(data,i,0) <= 50) {
            medium = medium+1;
        }
        if (cell(data,i,0) <= 100) {
            large = large+1;
        }
    }
    out.push(small);
    out.push(medium);
    out.push(large);
    out.push(n);
  return out;
}
