const cell = (data, row, col) => data[row][col];
const minv = Math.min, maxv = Math.max, absv = Math.abs;
const quotient = (a, b) => Math.trunc(a / b);
export function solve(data) {
  if (!Array.isArray(data) || data.length > 200) throw new RangeError('Até 200 registros');
  const bounds = [[0,199]];
  for (const row of data) {
    if (!Array.isArray(row) || row.length !== bounds.length) throw new RangeError('Colunas inválidas');
    row.forEach((value, index) => {
      if (!Number.isSafeInteger(value) || value < bounds[index][0] || value > bounds[index][1]) throw new RangeError('Valor fora do contrato');
    });
  }
  const n = data.length;
  const out = [];
    const seen = new Array(200).fill(0);
    let checkpoint = -1;
    for (let i = (0); i < n; i++) {
        seen[cell(data,i,0)] = 1;
        let advance = 1;
        while (advance == 1) {
            advance = 0;
            if (checkpoint+1 < 200) {
                if (seen[checkpoint+1] == 1) {
                    checkpoint = checkpoint+1;
                    advance = 1;
                }
            }
        }
        out.push(checkpoint);
    }
  return out;
}
