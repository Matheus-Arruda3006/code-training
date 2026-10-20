const cell = (data, row, col) => data[row][col];
const minv = Math.min, maxv = Math.max, absv = Math.abs;
const quotient = (a, b) => Math.trunc(a / b);
export function solve(data) {
  if (!Array.isArray(data) || data.length > 200) throw new RangeError('Até 200 registros');
  const bounds = [[0,99],[0,10000],[1,100]];
  for (const row of data) {
    if (!Array.isArray(row) || row.length !== bounds.length) throw new RangeError('Colunas inválidas');
    row.forEach((value, index) => {
      if (!Number.isSafeInteger(value) || value < bounds[index][0] || value > bounds[index][1]) throw new RangeError('Valor fora do contrato');
    });
  }
  const n = data.length;
  const out = [];
    const expiry = new Array(100).fill(0);
    for (let i = (0); i < n; i++) {
        if (i > 0) {
            if (cell(data,i,1) < cell(data,i-1,1)) {
                throw new RangeError("Regra de negócio inválida");
            }
        }
        let key = cell(data,i,0);
        let now = cell(data,i,1);
        if (now < expiry[key]) {
            out.push(1);
        }
        else {
            expiry[key] = now+cell(data,i,2);
            out.push(0);
        }
    }
  return out;
}
