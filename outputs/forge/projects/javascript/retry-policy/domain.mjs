const cell = (data, row, col) => data[row][col];
const minv = Math.min, maxv = Math.max, absv = Math.abs;
const quotient = (a, b) => Math.trunc(a / b);
export function solve(data) {
  if (!Array.isArray(data) || data.length > 200) throw new RangeError('Até 200 registros');
  const bounds = [[0,12],[1,100],[1,10000],[0,10000]];
  for (const row of data) {
    if (!Array.isArray(row) || row.length !== bounds.length) throw new RangeError('Colunas inválidas');
    row.forEach((value, index) => {
      if (!Number.isSafeInteger(value) || value < bounds[index][0] || value > bounds[index][1]) throw new RangeError('Valor fora do contrato');
    });
  }
  const n = data.length;
  const out = [];
    for (let i = (0); i < n; i++) {
        let delay = minv(cell(data,i,1),cell(data,i,2));
        for (let attempt = (0); attempt < cell(data,i,0); attempt++) {
            delay = minv(delay*2,cell(data,i,2));
        }
        let half = quotient(delay,2);
        out.push(half + cell(data,i,3) % (delay-half+1));
    }
  return out;
}
