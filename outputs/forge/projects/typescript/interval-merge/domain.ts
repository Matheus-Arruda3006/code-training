const cell = (data: number[][], row: number, col: number) => data[row][col];
const minv = Math.min, maxv = Math.max, absv = Math.abs;
const quotient = (a: number, b: number) => Math.trunc(a / b);
export function solve(data: number[][]): number[] {
  if (!Array.isArray(data) || data.length > 200) throw new RangeError('Até 200 registros');
  const bounds = [[0,10000],[0,10000]];
  for (const row of data) {
    if (!Array.isArray(row) || row.length !== bounds.length) throw new RangeError('Colunas inválidas');
    row.forEach((value, index) => {
      if (!Number.isSafeInteger(value) || value < bounds[index][0] || value > bounds[index][1]) throw new RangeError('Valor fora do contrato');
    });
  }
  const n = data.length;
  const out: number[] = [];
    let start = -1;
    let end = -1;
    for (let i = (0); i < n; i++) {
        if (cell(data,i,0) >= cell(data,i,1)) {
            throw new RangeError("Regra de negócio inválida");
        }
        if (i > 0) {
            if (cell(data,i,0) < cell(data,i-1,0)) {
                throw new RangeError("Regra de negócio inválida");
            }
        }
        if (start == -1) {
            start = cell(data,i,0);
            end = cell(data,i,1);
        }
        else {
            if (cell(data,i,0) <= end) {
                end = maxv(end,cell(data,i,1));
            }
            else {
                out.push(start);
                out.push(end);
                start = cell(data,i,0);
                end = cell(data,i,1);
            }
        }
    }
    if (start != -1) {
        out.push(start);
        out.push(end);
    }
  return out;
}
