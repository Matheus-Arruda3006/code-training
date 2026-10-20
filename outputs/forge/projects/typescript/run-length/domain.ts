const cell = (data: number[][], row: number, col: number) => data[row][col];
const minv = Math.min, maxv = Math.max, absv = Math.abs;
const quotient = (a: number, b: number) => Math.trunc(a / b);
export function solve(data: number[][]): number[] {
  if (!Array.isArray(data) || data.length > 200) throw new RangeError('Até 200 registros');
  const bounds = [[-10000,10000]];
  for (const row of data) {
    if (!Array.isArray(row) || row.length !== bounds.length) throw new RangeError('Colunas inválidas');
    row.forEach((value, index) => {
      if (!Number.isSafeInteger(value) || value < bounds[index][0] || value > bounds[index][1]) throw new RangeError('Valor fora do contrato');
    });
  }
  const n = data.length;
  const out: number[] = [];
    let count = 0;
    let previous = 0;
    for (let i = (0); i < n; i++) {
        if (count > 0 && cell(data,i,0) != previous) {
            out.push(previous);
            out.push(count);
            count = 0;
        }
        previous = cell(data,i,0);
        count = count+1;
    }
    if (count > 0) {
        out.push(previous);
        out.push(count);
    }
  return out;
}
