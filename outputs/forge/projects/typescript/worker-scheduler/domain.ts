const cell = (data: number[][], row: number, col: number) => data[row][col];
const minv = Math.min, maxv = Math.max, absv = Math.abs;
const quotient = (a: number, b: number) => Math.trunc(a / b);
export function solve(data: number[][]): number[] {
  if (!Array.isArray(data) || data.length > 200) throw new RangeError('Até 200 registros');
  const bounds = [[0,10000],[1,10000]];
  for (const row of data) {
    if (!Array.isArray(row) || row.length !== bounds.length) throw new RangeError('Colunas inválidas');
    row.forEach((value, index) => {
      if (!Number.isSafeInteger(value) || value < bounds[index][0] || value > bounds[index][1]) throw new RangeError('Valor fora do contrato');
    });
  }
  const n = data.length;
  const out: number[] = [];
    const available = new Array(3).fill(0);
    for (let i = (0); i < n; i++) {
        let best = 0;
        for (let worker = (1); worker < 3; worker++) {
            if (available[worker] < available[best]) {
                best = worker;
            }
        }
        available[best] = maxv(available[best],cell(data,i,0))+cell(data,i,1);
        out.push(best);
        out.push(available[best]);
    }
  return out;
}
