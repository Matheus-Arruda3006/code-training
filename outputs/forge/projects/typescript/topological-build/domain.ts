const cell = (data: number[][], row: number, col: number) => data[row][col];
const minv = Math.min, maxv = Math.max, absv = Math.abs;
const quotient = (a: number, b: number) => Math.trunc(a / b);
export function solve(data: number[][]): number[] {
  if (!Array.isArray(data) || data.length > 200) throw new RangeError('Até 200 registros');
  const bounds = [[0,19],[0,19]];
  for (const row of data) {
    if (!Array.isArray(row) || row.length !== bounds.length) throw new RangeError('Colunas inválidas');
    row.forEach((value, index) => {
      if (!Number.isSafeInteger(value) || value < bounds[index][0] || value > bounds[index][1]) throw new RangeError('Valor fora do contrato');
    });
  }
  const n = data.length;
  const out: number[] = [];
    const active = new Array(20).fill(0);
    const indegree = new Array(20).fill(0);
    const removed = new Array(20).fill(0);
    for (let i = (0); i < n; i++) {
        active[cell(data,i,0)] = 1;
        active[cell(data,i,1)] = 1;
        indegree[cell(data,i,1)] = indegree[cell(data,i,1)]+1;
    }
    for (let turn = (0); turn < 20; turn++) {
        let best = -1;
        for (let node = (0); node < 20; node++) {
            if (active[node] == 1 && removed[node] == 0 && indegree[node] == 0 && best == -1) {
                best = node;
            }
        }
        if (best != -1) {
            out.push(best);
            removed[best] = 1;
            for (let i = (0); i < n; i++) {
                if (cell(data,i,0) == best) {
                    indegree[cell(data,i,1)] = indegree[cell(data,i,1)]-1;
                }
            }
        }
    }
    for (let node = (0); node < 20; node++) {
        if (active[node] == 1 && removed[node] == 0) {
            throw new RangeError("Regra de negócio inválida");
        }
    }
  return out;
}
