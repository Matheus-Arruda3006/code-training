const cell = (data: number[][], row: number, col: number) => data[row][col];
const minv = Math.min, maxv = Math.max, absv = Math.abs;
const quotient = (a: number, b: number) => Math.trunc(a / b);
export function solve(data: number[][]): number[] {
  if (!Array.isArray(data) || data.length > 200) throw new RangeError('Até 200 registros');
  const bounds = [[0,99],[0,10000],[0,10000]];
  for (const row of data) {
    if (!Array.isArray(row) || row.length !== bounds.length) throw new RangeError('Colunas inválidas');
    row.forEach((value, index) => {
      if (!Number.isSafeInteger(value) || value < bounds[index][0] || value > bounds[index][1]) throw new RangeError('Valor fora do contrato');
    });
  }
  const n = data.length;
  const out: number[] = [];
    const balances = new Array(100).fill(0);
    for (let i = (0); i < n; i++) {
        let dept = cell(data,i,0);
        balances[dept] = balances[dept]+cell(data,i,1);
        if (cell(data,i,2) <= balances[dept]) {
            balances[dept] = balances[dept]-cell(data,i,2);
            out.push(1);
        }
        else {
            out.push(0);
        }
    }
    let total = 0;
    for (let dept = (0); dept < 100; dept++) {
        total = total+balances[dept];
    }
    out.push(total);
  return out;
}
