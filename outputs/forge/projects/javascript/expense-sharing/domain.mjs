const cell = (data, row, col) => data[row][col];
const minv = Math.min, maxv = Math.max, absv = Math.abs;
const quotient = (a, b) => Math.trunc(a / b);
export function solve(data) {
  if (!Array.isArray(data) || data.length > 200) throw new RangeError('Até 200 registros');
  const bounds = [[1,100],[0,10000]];
  for (const row of data) {
    if (!Array.isArray(row) || row.length !== bounds.length) throw new RangeError('Colunas inválidas');
    row.forEach((value, index) => {
      if (!Number.isSafeInteger(value) || value < bounds[index][0] || value > bounds[index][1]) throw new RangeError('Valor fora do contrato');
    });
  }
  const n = data.length;
  const out = [];
    let total = 0;
    let weights = 0;
    for (let i = (0); i < n; i++) {
        total = total+cell(data,i,1);
        weights = weights+cell(data,i,0);
    }
    const shares = new Array(n).fill(0);
    const remainders = new Array(n).fill(0);
    let assigned = 0;
    for (let i = (0); i < n; i++) {
        shares[i] = quotient(total*cell(data,i,0),weights);
        remainders[i] = (total*cell(data,i,0)) % weights;
        assigned = assigned+shares[i];
    }
    while (assigned < total) {
        let best = 0;
        for (let i = (1); i < n; i++) {
            if (remainders[i] > remainders[best]) {
                best = i;
            }
        }
        shares[best] = shares[best]+1;
        remainders[best] = -1;
        assigned = assigned+1;
    }
    for (let i = (0); i < n; i++) {
        out.push(shares[i]);
    }
  return out;
}
