const cell = (data: number[][], row: number, col: number) => data[row][col];
const minv = Math.min, maxv = Math.max, absv = Math.abs;
const quotient = (a: number, b: number) => Math.trunc(a / b);
export function solve(data: number[][]): number[] {
  if (!Array.isArray(data) || data.length > 200) throw new RangeError('Até 200 registros');
  const bounds = [[0,99],[1,10000],[0,1],[0,10000]];
  for (const row of data) {
    if (!Array.isArray(row) || row.length !== bounds.length) throw new RangeError('Colunas inválidas');
    row.forEach((value, index) => {
      if (!Number.isSafeInteger(value) || value < bounds[index][0] || value > bounds[index][1]) throw new RangeError('Valor fora do contrato');
    });
  }
  const n = data.length;
  const out: number[] = [];
    const version = new Array(100).fill(0);
    const present = new Array(100).fill(0);
    const values = new Array(100).fill(0);
    for (let i = (0); i < n; i++) {
        let id = cell(data,i,0);
        if (cell(data,i,1) > version[id]) {
            version[id] = cell(data,i,1);
            present[id] = 1-cell(data,i,2);
            values[id] = cell(data,i,3);
        }
    }
    for (let id = (0); id < 100; id++) {
        if (present[id] == 1) {
            out.push(id);
            out.push(values[id]);
        }
    }
  return out;
}
