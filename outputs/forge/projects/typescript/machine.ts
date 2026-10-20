export type Order =
  | { status: 'draft'; id: string }
  | { status: 'paid'; id: string }
  | { status: 'shipped'; id: string; tracking: string };
export type Event = { type: 'pay' } | { type: 'ship'; tracking: string };

function unreachable(value: never): never {
  throw new Error('Evento desconhecido: ' + JSON.stringify(value));
}
export function transition(order: Order, event: Event): Order {
  switch (event.type) {
    case 'pay':
      if (order.status !== 'draft') throw new Error('Só rascunhos podem ser pagos');
      return { status: 'paid', id: order.id };
    case 'ship':
      if (order.status !== 'paid') throw new Error('Pagamento obrigatório');
      if (!event.tracking.trim()) throw new Error('Tracking obrigatório');
      return { status: 'shipped', id: order.id, tracking: event.tracking.trim() };
    default:
      return unreachable(event);
  }
}
