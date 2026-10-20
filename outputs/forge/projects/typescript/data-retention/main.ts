import { readFileSync } from 'node:fs';
import { solve } from './domain.js';
const text = readFileSync(process.argv[2] || 'input.tsv', 'utf8').replaceAll('\r', '').trimEnd();
const [header, ...rows] = text.split('\n');
if (header !== "age_days\tretention_days\thold") throw new Error('Cabeçalho inválido');
const data = rows.filter(Boolean).map(row => row.split('\t').map(value => {
  if (!/^-?\d+$/.test(value)) throw new Error('Inteiro inválido');
  return Number(value);
}));
console.log(JSON.stringify(solve(data)));
