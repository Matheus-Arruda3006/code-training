const cell = (data, row, col) => data[row][col];
const minv = Math.min, maxv = Math.max, absv = Math.abs;
const quotient = (a, b) => Math.trunc(a / b);
export function solve(data) {
  if (!Array.isArray(data) || data.length > 200) throw new RangeError('Até 200 registros');
  const bounds = [[0,99],[1,100]];
  for (const row of data) {
    if (!Array.isArray(row) || row.length !== bounds.length) throw new RangeError('Colunas inválidas');
    row.forEach((value, index) => {
      if (!Number.isSafeInteger(value) || value < bounds[index][0] || value > bounds[index][1]) throw new RangeError('Valor fora do contrato');
    });
  }
  const n = data.length;
  const out = [];
    const used = new Array(100).fill(0);
    let total = 0;
    for (let i = (0); i < n; i++) {
        let user = cell(data,i,0);
        let cost = cell(data,i,1);
        if (used[user]+cost <= 50 && total+cost <= 120) {
            used[user] = used[user]+cost;
            total = total+cost;
            out.push(1);
        }
        else {
            out.push(0);
        }
    }
    out.push(total);
  return out;
}
