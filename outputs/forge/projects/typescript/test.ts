import { transition, type Order } from './machine.js';
function check(value: boolean) { if (!value) throw new Error('Teste falhou'); }
function rejects(action: () => unknown) {
  let failed = false;
  try { action(); } catch { failed = true; }
  check(failed);
}
const draft: Order = { status: 'draft', id: '42' };
const paid = transition(draft, { type: 'pay' });
const sent = transition(paid, { type: 'ship', tracking: 'BR123' });
check(sent.status === 'shipped' && sent.tracking === 'BR123');
check(draft.status === 'draft');
rejects(() => transition(draft, { type: 'ship', tracking: 'BR123' }));
rejects(() => transition(paid, { type: 'ship', tracking: ' ' }));
rejects(() => transition(paid, { type: 'pay' }));
console.log('5 verificações passaram.');
