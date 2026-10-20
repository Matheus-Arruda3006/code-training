const cell = (data, row, col) => data[row][col];
const minv = Math.min, maxv = Math.max, absv = Math.abs;
const quotient = (a, b) => Math.trunc(a / b);
export function solve(data) {
  if (!Array.isArray(data) || data.length > 200) throw new RangeError('Até 200 registros');
  const bounds = [[100,599],[0,20]];
  for (const row of data) {
    if (!Array.isArray(row) || row.length !== bounds.length) throw new RangeError('Colunas inválidas');
    row.forEach((value, index) => {
      if (!Number.isSafeInteger(value) || value < bounds[index][0] || value > bounds[index][1]) throw new RangeError('Valor fora do contrato');
    });
  }
  const n = data.length;
  const out = [];
    for (let i = (0); i < n; i++) {
        let status = cell(data,i,0);
        if (status >= 200 && status < 300) {
            out.push(0);
        }
        else {
            if ((status == 408 || status == 429 || status >= 500) && cell(data,i,1) < 5) {
                out.push(1);
            }
            else {
                out.push(2);
            }
        }
    }
  return out;
}
