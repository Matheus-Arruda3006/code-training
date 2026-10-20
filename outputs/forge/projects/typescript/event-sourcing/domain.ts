const cell = (data: number[][], row: number, col: number) => data[row][col];
const minv = Math.min, maxv = Math.max, absv = Math.abs;
const quotient = (a: number, b: number) => Math.trunc(a / b);
export function solve(data: number[][]): number[] {
  if (!Array.isArray(data) || data.length > 200) throw new RangeError('Até 200 registros');
  const bounds = [[0,99],[-10000,10000]];
  for (const row of data) {
    if (!Array.isArray(row) || row.length !== bounds.length) throw new RangeError('Colunas inválidas');
    row.forEach((value, index) => {
      if (!Number.isSafeInteger(value) || value < bounds[index][0] || value > bounds[index][1]) throw new RangeError('Valor fora do contrato');
    });
  }
  const n = data.length;
  const out: number[] = [];
    const seen = new Array(100).fill(0);
    const deltas = new Array(100).fill(0);
    let balance = 0;
    for (let i = (0); i < n; i++) {
        let id = cell(data,i,0);
        if (seen[id] == 1) {
            if (deltas[id] != cell(data,i,1)) {
                throw new RangeError("Regra de negócio inválida");
            }
        }
        else {
            seen[id] = 1;
            deltas[id] = cell(data,i,1);
            balance = balance+cell(data,i,1);
        }
        out.push(balance);
    }
  return out;
}
