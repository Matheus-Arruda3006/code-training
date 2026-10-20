import { transition } from './machine.js';
const paid = transition({ status: 'draft', id: '42' }, { type: 'pay' });
console.log(transition(paid, { type: 'ship', tracking: 'BR123' }));
