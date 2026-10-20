#ifndef RING_H
#define RING_H
#include <stdbool.h>
#include <stddef.h>
#define CAPACITY 3
typedef struct { int data[CAPACITY]; size_t head; size_t size; } Ring;
bool ring_push(Ring *ring, int value);
bool ring_pop(Ring *ring, int *value);
#endif
