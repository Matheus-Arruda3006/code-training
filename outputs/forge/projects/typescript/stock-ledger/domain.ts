const cell = (data: number[][], row: number, col: number) => data[row][col];
const minv = Math.min, maxv = Math.max, absv = Math.abs;
const quotient = (a: number, b: number) => Math.trunc(a / b);
export function solve(data: number[][]): number[] {
  if (!Array.isArray(data) || data.length > 200) throw new RangeError('Até 200 registros');
  const bounds = [[0,99],[0,2],[1,10000]];
  for (const row of data) {
    if (!Array.isArray(row) || row.length !== bounds.length) throw new RangeError('Colunas inválidas');
    row.forEach((value, index) => {
      if (!Number.isSafeInteger(value) || value < bounds[index][0] || value > bounds[index][1]) throw new RangeError('Valor fora do contrato');
    });
  }
  const n = data.length;
  const out: number[] = [];
    const stock = new Array(100).fill(0);
    for (let i = (0); i < n; i++) {
        let sku = cell(data,i,0);
        let action = cell(data,i,1);
        let quantity = cell(data,i,2);
        if (action == 0) {
            stock[sku] = stock[sku]+quantity;
        }
        if (action == 1 && quantity > stock[sku]) {
            out.push(-1);
        }
        else {
            if (action == 1) {
                stock[sku] = stock[sku]-quantity;
            }
            out.push(stock[sku]);
        }
    }
  return out;
}
