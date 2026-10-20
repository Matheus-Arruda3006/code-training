#pragma once
#include <list>
#include <optional>
#include <stdexcept>
#include <string>
#include <unordered_map>

class Lru {
    using Entries = std::list<std::pair<std::string, int>>;
    std::size_t capacity;
    Entries entries;
    std::unordered_map<std::string, Entries::iterator> index;
public:
    explicit Lru(std::size_t n) : capacity(n) {
        if (n == 0) throw std::invalid_argument("Capacidade zero");
    }
    Lru(const Lru&) = delete;
    Lru& operator=(const Lru&) = delete;
    std::optional<int> get(const std::string& key) {
        auto found = index.find(key);
        if (found == index.end()) return std::nullopt;
        entries.splice(entries.begin(), entries, found->second);
        return found->second->second;
    }
    void put(const std::string& key, int value) {
        auto found = index.find(key);
        if (found != index.end()) {
            found->second->second = value;
            entries.splice(entries.begin(), entries, found->second);
            return;
        }
        entries.emplace_front(key, value);
        try { index.emplace(key, entries.begin()); }
        catch (...) { entries.pop_front(); throw; }
        if (index.size() > capacity) {
            index.erase(entries.back().first);
            entries.pop_back();
        }
    }
};
