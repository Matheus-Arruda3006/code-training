const cell = (data: number[][], row: number, col: number) => data[row][col];
const minv = Math.min, maxv = Math.max, absv = Math.abs;
const quotient = (a: number, b: number) => Math.trunc(a / b);
export function solve(data: number[][]): number[] {
  if (!Array.isArray(data) || data.length > 200) throw new RangeError('Até 200 registros');
  const bounds = [[0,99],[0,10000]];
  for (const row of data) {
    if (!Array.isArray(row) || row.length !== bounds.length) throw new RangeError('Colunas inválidas');
    row.forEach((value, index) => {
      if (!Number.isSafeInteger(value) || value < bounds[index][0] || value > bounds[index][1]) throw new RangeError('Valor fora do contrato');
    });
  }
  const n = data.length;
  const out: number[] = [];
    const last = new Array(100).fill(0);
    const sessions = new Array(100).fill(0);
    for (let i = (0); i < n; i++) {
        let user = cell(data,i,0);
        let time = cell(data,i,1);
        if (sessions[user] > 0 && time < last[user]) {
            throw new RangeError("Regra de negócio inválida");
        }
        if (sessions[user] == 0 || time-last[user] > 30) {
            sessions[user] = sessions[user]+1;
        }
        last[user] = time;
        out.push(sessions[user]);
    }
  return out;
}
