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
    const used = new Array(n).fill(0);
    let bins = 0;
    for (let i = (0); i < n; i++) {
        let selected = -1;
        for (let b = (0); b < bins; b++) {
            if (selected == -1 && used[b]+cell(data,i,0) <= 100) {
                selected = b;
            }
        }
        if (selected == -1) {
            selected = bins;
            bins = bins+1;
        }
        used[selected] = used[selected]+cell(data,i,0);
        out.push(selected);
    }
    out.push(bins);
  return out;
}
