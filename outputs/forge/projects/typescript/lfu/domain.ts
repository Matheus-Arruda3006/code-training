const cell = (data: number[][], row: number, col: number) => data[row][col];
const minv = Math.min, maxv = Math.max, absv = Math.abs;
const quotient = (a: number, b: number) => Math.trunc(a / b);
export function solve(data: number[][]): number[] {
  if (!Array.isArray(data) || data.length > 200) throw new RangeError('Até 200 registros');
  const bounds = [[0,99]];
  for (const row of data) {
    if (!Array.isArray(row) || row.length !== bounds.length) throw new RangeError('Colunas inválidas');
    row.forEach((value, index) => {
      if (!Number.isSafeInteger(value) || value < bounds[index][0] || value > bounds[index][1]) throw new RangeError('Valor fora do contrato');
    });
  }
  const n = data.length;
  const out: number[] = [];
    const present = new Array(100).fill(0);
    const frequency = new Array(100).fill(0);
    const age = new Array(100).fill(0);
    let size = 0;
    for (let i = (0); i < n; i++) {
        let key = cell(data,i,0);
        if (present[key] == 1) {
            frequency[key] = frequency[key]+1;
            out.push(1);
        }
        else {
            out.push(0);
            if (size == 3) {
                let victim = -1;
                for (let k = (0); k < 100; k++) {
                    if (present[k] == 1) {
                        if (victim == -1) {
                            victim = k;
                        }
                        else {
                            if (frequency[k] < frequency[victim] || (frequency[k] == frequency[victim] && age[k] < age[victim])) {
                                victim = k;
                            }
                        }
                    }
                }
                present[victim] = 0;
                size = size-1;
            }
            present[key] = 1;
            frequency[key] = 1;
            age[key] = i;
            size = size+1;
        }
    }
  return out;
}
