const cell = (data: number[][], row: number, col: number) => data[row][col];
const minv = Math.min, maxv = Math.max, absv = Math.abs;
const quotient = (a: number, b: number) => Math.trunc(a / b);
export function solve(data: number[][]): number[] {
  if (!Array.isArray(data) || data.length > 200) throw new RangeError('Até 200 registros');
  const bounds = [[0,10000],[0,1]];
  for (const row of data) {
    if (!Array.isArray(row) || row.length !== bounds.length) throw new RangeError('Colunas inválidas');
    row.forEach((value, index) => {
      if (!Number.isSafeInteger(value) || value < bounds[index][0] || value > bounds[index][1]) throw new RangeError('Valor fora do contrato');
    });
  }
  const n = data.length;
  const out: number[] = [];
    let failures = 0;
    let until = 0;
    for (let i = (0); i < n; i++) {
        let now = cell(data,i,0);
        if (i > 0) {
            if (now < cell(data,i-1,0)) {
                throw new RangeError("Regra de negócio inválida");
            }
        }
        if (now < until) {
            out.push(0);
        }
        else {
            out.push(1);
            if (cell(data,i,1) == 1) {
                failures = 0;
            }
            else {
                failures = failures+1;
            }
            if (failures >= 3) {
                until = now+5;
            }
        }
    }
  return out;
}
