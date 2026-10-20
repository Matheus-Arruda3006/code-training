const cell = (data: number[][], row: number, col: number) => data[row][col];
const minv = Math.min, maxv = Math.max, absv = Math.abs;
const quotient = (a: number, b: number) => Math.trunc(a / b);
export function solve(data: number[][]): number[] {
  if (!Array.isArray(data) || data.length > 200) throw new RangeError('Até 200 registros');
  const bounds = [[1,50],[0,10000]];
  for (const row of data) {
    if (!Array.isArray(row) || row.length !== bounds.length) throw new RangeError('Colunas inválidas');
    row.forEach((value, index) => {
      if (!Number.isSafeInteger(value) || value < bounds[index][0] || value > bounds[index][1]) throw new RangeError('Valor fora do contrato');
    });
  }
  const n = data.length;
  const out: number[] = [];
    const best = new Array(51).fill(0);
    for (let i = (0); i < n; i++) {
        let capacity = 50;
        while (capacity >= cell(data,i,0)) {
            best[capacity] = maxv(best[capacity],best[capacity-cell(data,i,0)]+cell(data,i,1));
            capacity = capacity-1;
        }
    }
    out.push(best[50]);
  return out;
}
