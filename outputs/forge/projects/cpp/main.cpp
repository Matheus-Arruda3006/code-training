#include "lru.hpp"
#include <cassert>
#include <iostream>

int main() {
    Lru cache(2);
    cache.put("a", 1);
    cache.put("b", 2);
    assert(cache.get("a") == 1);
    cache.put("c", 3);
    assert(!cache.get("b"));
    cache.put("a", 4);
    assert(cache.get("a") == 4);
    assert(cache.get("c") == 3);
    bool rejected = false;
    try { Lru invalid(0); }
    catch (const std::invalid_argument&) { rejected = true; }
    assert(rejected);
    std::cout << "Cache LRU: testes passaram.\n";
}
