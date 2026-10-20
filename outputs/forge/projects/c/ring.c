#include "ring.h"

bool ring_push(Ring *ring, int value) {
    if (!ring || ring->size == CAPACITY) return false;
    size_t tail = (ring->head + ring->size) % CAPACITY;
    ring->data[tail] = value;
    ring->size++;
    return true;
}

bool ring_pop(Ring *ring, int *value) {
    if (!ring || !value || ring->size == 0) return false;
    *value = ring->data[ring->head];
    ring->head = (ring->head + 1) % CAPACITY;
    ring->size--;
    return true;
}
