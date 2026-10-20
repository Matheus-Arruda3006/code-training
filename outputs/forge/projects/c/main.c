#include "ring.h"
#include <assert.h>
#include <stdio.h>

int main(void) {
    Ring ring = {0};
    int value = 0;
    assert(ring_push(&ring, 10));
    assert(ring_push(&ring, 20));
    assert(ring_push(&ring, 30));
    assert(!ring_push(&ring, 40));
    assert(ring_pop(&ring, &value) && value == 10);
    assert(ring_push(&ring, 40));
    for (int expected = 20; expected <= 40; expected += 10) {
        assert(ring_pop(&ring, &value) && value == expected);
        printf("%d\n", value);
    }
    assert(!ring_pop(&ring, &value));
    puts("Testes passaram.");
    return 0;
}
