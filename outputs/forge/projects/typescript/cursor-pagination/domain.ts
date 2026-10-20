const cell = (data: number[][], row: number, col: number) => data[row][col];
const minv = Math.min, maxv = Math.max, absv = Math.abs;
const quotient = (a: number, b: number) => Math.trunc(a / b);
export function solve(data: number[][]): number[] {
  if (!Array.isArray(data) || data.length > 200) throw new RangeError('Até 200 registros');
  const bounds = [[0,10000],[0,99]];
  for (const row of data) {
    if (!Array.isArray(row) || row.length !== bounds.length) throw new RangeError('Colunas inválidas');
    row.forEach((value, index) => {
      if (!Number.isSafeInteger(value) || value < bounds[index][0] || value > bounds[index][1]) throw new RangeError('Valor fora do contrato');
    });
  }
  const n = data.length;
  const out: number[] = [];
    const used = new Array(n).fill(0);
    for (let i = (0); i < n; i++) {
        for (let j = (0); j < i; j++) {
            if (cell(data,i,0) == cell(data,j,0) && cell(data,i,1) == cell(data,j,1)) {
                throw new RangeError("Regra de negócio inválida");
            }
        }
        if (cell(data,i,0) < 10 || (cell(data,i,0) == 10 && cell(data,i,1) <= 5)) {
            used[i] = 1;
        }
    }
    for (let turn = (0); turn < 3; turn++) {
        let best = -1;
        for (let i = (0); i < n; i++) {
            if (used[i] == 0) {
                if (best == -1) {
                    best = i;
                }
                else {
                    if (cell(data,i,0) < cell(data,best,0) || (cell(data,i,0) == cell(data,best,0) && cell(data,i,1) < cell(data,best,1))) {
                        best = i;
                    }
                }
            }
        }
        if (best != -1) {
            out.push(cell(data,best,0));
            out.push(cell(data,best,1));
            used[best] = 1;
        }
    }
  return out;
}
