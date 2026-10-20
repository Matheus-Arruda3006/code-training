const cell = (data, row, col) => data[row][col];
const minv = Math.min, maxv = Math.max, absv = Math.abs;
const quotient = (a, b) => Math.trunc(a / b);
export function solve(data) {
  if (!Array.isArray(data) || data.length > 200) throw new RangeError('Até 200 registros');
  const bounds = [[0,99],[0,10000]];
  for (const row of data) {
    if (!Array.isArray(row) || row.length !== bounds.length) throw new RangeError('Colunas inválidas');
    row.forEach((value, index) => {
      if (!Number.isSafeInteger(value) || value < bounds[index][0] || value > bounds[index][1]) throw new RangeError('Valor fora do contrato');
    });
  }
  const n = data.length;
  const out = [];
    const seen = new Array(100).fill(0);
    const payloads = new Array(100).fill(0);
    for (let i = (0); i < n; i++) {
        let key = cell(data,i,0);
        if (seen[key] == 0) {
            seen[key] = 1;
            payloads[key] = cell(data,i,1);
            out.push(1);
        }
        else {
            if (payloads[key] == cell(data,i,1)) {
                out.push(0);
            }
            else {
                out.push(-1);
            }
        }
    }
  return out;
}
