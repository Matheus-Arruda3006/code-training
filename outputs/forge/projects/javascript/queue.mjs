export async function mapLimit(items, limit, handler) {
  if (!Number.isInteger(limit) || limit < 1) throw new RangeError("Limite inválido");
  const results = new Array(items.length);
  let cursor = 0;
  async function worker() {
    while (cursor < items.length) {
      const index = cursor++;
      results[index] = await handler(items[index], index);
    }
  }
  const workers = Array.from({ length: Math.min(limit, items.length) }, worker);
  const settled = await Promise.allSettled(workers);
  const failure = settled.find(result => result.status === "rejected");
  if (failure) throw failure.reason;
  return results;
}
