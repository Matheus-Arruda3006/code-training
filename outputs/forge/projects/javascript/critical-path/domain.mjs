const cell = (data, row, col) => data[row][col];
const minv = Math.min, maxv = Math.max, absv = Math.abs;
const quotient = (a, b) => Math.trunc(a / b);
export function solve(data) {
  if (!Array.isArray(data) || data.length > 200) throw new RangeError('Até 200 registros');
  const bounds = [[-1,199],[1,10000]];
  for (const row of data) {
    if (!Array.isArray(row) || row.length !== bounds.length) throw new RangeError('Colunas inválidas');
    row.forEach((value, index) => {
      if (!Number.isSafeInteger(value) || value < bounds[index][0] || value > bounds[index][1]) throw new RangeError('Valor fora do contrato');
    });
  }
  const n = data.length;
  const out = [];
    const finish = new Array(n).fill(0);
    let deadline = 0;
    for (let i = (0); i < n; i++) {
        let parent = cell(data,i,0);
        if (parent >= i) {
            throw new RangeError("Regra de negócio inválida");
        }
        let start = 0;
        if (parent >= 0) {
            start = finish[parent];
        }
        finish[i] = start+cell(data,i,1);
        deadline = maxv(deadline,finish[i]);
        out.push(finish[i]);
    }
    out.push(deadline);
  return out;
}
