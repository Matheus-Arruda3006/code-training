// Cada projeto contém todos os arquivos autorais necessários para executá-lo.
const file = (name, code, notes) => ({name, code:code.trim(), notes});
export const tracks = [
{id:'python',name:'Python',mark:'Py',color:'#f1cf65',level:'Intermediário',area:'Dados & automação',title:'Dados confiáveis, do arquivo ao relatório',description:'Generators, contratos de dados e processamento em fluxo.',tags:['Generators','ETL','Testes'],project:'Pipeline de transações',minutes:55,prerequisite:'Funções, dicionários, módulos e leitura de arquivos.',concept:'Um generator entrega um registro por vez. Isso permite processar arquivos maiores que a memória. Use Decimal para dinheiro: float não representa exatamente valores como 0,1.',tradeoff:'O processamento é O(n) no número de linhas e O(k) na quantidade de categorias. O relatório acumula apenas os totais. A política aqui é falhar na primeira linha inválida; em produção, uma quarentena de erros pode ser preferível.',challenge:'Agregue transações por categoria sem carregar o CSV inteiro. Rejeite valores negativos, NaN e cabeçalhos inválidos; preserve os centavos.',acceptance:['food = 34.90 e books = 40.00 no arquivo fornecido','CSV com valor negativo deve falhar','Cabeçalho incompleto deve falhar antes do processamento'],run:'python -m unittest -v\npython pipeline.py transactions.csv',expected:'books: 40.00\nfood: 34.90',files:[
file('pipeline.py',`import csv
import sys
from decimal import Decimal, InvalidOperation

def transactions(path):
    with open(path, newline="", encoding="utf-8") as source:
        reader = csv.DictReader(source)
        if not {"category", "amount"}.issubset(reader.fieldnames or []):
            raise ValueError("Cabeçalho inválido")
        for number, row in enumerate(reader, start=2):
            category = (row.get("category") or "").strip()
            try:
                amount = Decimal(row.get("amount") or "")
            except InvalidOperation as error:
                raise ValueError(f"Linha {number}: valor inválido") from error
            if not category or not amount.is_finite() or amount < 0:
                raise ValueError(f"Linha {number}: transação inválida")
            if amount != amount.quantize(Decimal("0.01")):
                raise ValueError(f"Linha {number}: use no máximo 2 casas")
            yield category, amount

def aggregate(rows):
    totals = {}
    for category, amount in rows:
        totals[category] = totals.get(category, Decimal("0")) + amount
    return totals

if __name__ == "__main__":
    if len(sys.argv) != 2:
        raise SystemExit("Uso: python pipeline.py arquivo.csv")
    for category, total in sorted(aggregate(transactions(sys.argv[1])).items()):
        print(f"{category}: {total:.2f}")`,[
['1–3','csv interpreta campos com aspas corretamente; sys lê a CLI; Decimal mantém aritmética decimal.'],['5–9','Abra com newline vazio para o módulo csv controlar quebras; valide o contrato antes de iterar.'],['10–15','Numere a partir de 2 para apontar a linha física após o cabeçalho e encadeie a causa do erro.'],['16–20','Rejeite categoria vazia, infinito, NaN, negativos e frações de centavo. yield suspende a função sem materializar o arquivo.'],['22–26','O dicionário funciona como acumulador por categoria; a soma é incremental.'],['28–32','O guard separa importação de execução. Ordenar só as categorias torna a saída determinística.']]),
file('transactions.csv',`category,amount
food,19.90
books,40.00
food,15.00`,[['1','O cabeçalho é o contrato entre produtor e consumidor.'],['2–4','Duas transações da mesma categoria demonstram a agregação.']]),
file('test_pipeline.py',`import unittest
import tempfile
from pathlib import Path
from decimal import Decimal
from pipeline import aggregate, transactions

class PipelineTest(unittest.TestCase):
    def test_sum(self):
        self.assertEqual(aggregate([("x", Decimal("0.10")), ("x", Decimal("0.20"))]), {"x": Decimal("0.30")})

    def test_bad_rows(self):
        with tempfile.TemporaryDirectory() as folder:
            path = Path(folder) / "data.csv"
            for text in ["category,amount\\nx,-1", "category,amount\\nx,NaN", "wrong\\n1"]:
                path.write_text(text, encoding="utf-8")
                with self.assertRaises(ValueError):
                    list(transactions(path))

if __name__ == "__main__":
    unittest.main()`,[['1–5','Importe ferramentas da biblioteca padrão e as funções do módulo, sem executar a CLI.'],['7–9','Teste centavos conhecidos para detectar a troca acidental de Decimal por float.'],['11–17','Crie arquivos isolados e force o consumo do generator com list para observar a validação.'],['19–20','Permita executar diretamente ou por descoberta do unittest.']])]},
{id:'csharp',name:'C#',mark:'C#',color:'#bbacf1',level:'Intermediário',area:'Modelagem & domínio',title:'Modele regras que o compilador protege',description:'Records, imutabilidade e regras de domínio sem framework.',tags:['Records','LINQ','Domínio'],project:'Motor de precificação',minutes:50,prerequisite:'Classes, métodos, coleções e exceções em C#.',concept:'Separe dados imutáveis de regras de cálculo. decimal é apropriado para dinheiro; records tornam a intenção de valor explícita. Um serviço puro permite testar sem banco ou servidor.',tradeoff:'Calculamos o desconto sobre o subtotal e arredondamos uma única vez. Essa regra precisa estar documentada: arredondar por item pode produzir outro resultado. Dinheiro é considerado em uma única moeda.',challenge:'Implemente uma cotação com desconto percentual entre 0 e 30%. Rejeite preços negativos e quantidades não positivas, sem modificar os itens originais.',acceptance:['Dois itens de 19.90 com 10% de desconto custam 35.82','Quantidade zero e desconto acima de 30% lançam erro','Uma lista vazia custa zero'],run:'dotnet run --project Pricing.csproj',expected:'Total: 35.82\n3 verificações passaram.',files:[
file('Pricing.csproj',`<Project Sdk="Microsoft.NET.Sdk">
  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>net8.0</TargetFramework>
    <ImplicitUsings>enable</ImplicitUsings>
    <Nullable>enable</Nullable>
  </PropertyGroup>
</Project>`,[['1–8','Projeto console .NET 8 com imports comuns e análise de nulos; não depende de pacotes externos.']]),
file('Program.cs',`using System.Globalization;

var total = Pricing.Quote(new[] { new Item("Livro", 19.90m, 2) }, 0.10m);
if (total != 35.82m) throw new Exception("Total incorreto");
Console.WriteLine($"Total: {total.ToString("F2", CultureInfo.InvariantCulture)}");
if (Pricing.Quote(Array.Empty<Item>(), 0m) != 0m) throw new Exception("Vazio incorreto");
try {
    Pricing.Quote(new[] { new Item("Inválido", 1m, 0) }, 0m);
    throw new Exception("Deveria rejeitar quantidade zero");
} catch (ArgumentOutOfRangeException) { }
Console.WriteLine("3 verificações passaram.");

public record Item(string Name, decimal UnitPrice, int Quantity);

public static class Pricing {
    public static decimal Quote(IEnumerable<Item> items, decimal discount) {
        if (discount < 0m || discount > 0.30m)
            throw new ArgumentOutOfRangeException(nameof(discount));
        decimal subtotal = 0m;
        foreach (var item in items) {
            if (item.UnitPrice < 0m || item.Quantity <= 0)
                throw new ArgumentOutOfRangeException(nameof(items));
            subtotal += item.UnitPrice * item.Quantity;
        }
        return decimal.Round(subtotal * (1m - discount), 2, MidpointRounding.AwayFromZero);
    }
}`, [['1','Fixe a cultura de apresentação para a saída ser reproduzível.'],['3–11','Execute verificações sem dependência de framework de testes. Capture apenas a exceção esperada.'],['13','record representa um valor; as propriedades posicionais são init-only.'],['15–18','A regra de desconto pertence ao domínio e é validada antes do cálculo.'],['19–24','Enumere uma vez, valide cada item e acumule com decimal.'],['25–27','Arredonde uma vez ao final e torne explícita a política para meios centavos.']])]},
{id:'c',name:'C',mark:'C',color:'#a9c9f3',level:'Avançado',area:'Sistemas & memória',title:'Controle a memória, preserve os invariantes',description:'Buffers circulares, ponteiros e contratos explícitos.',tags:['Memória','Buffers','Sistemas'],project:'Fila circular de telemetria',minutes:65,prerequisite:'Ponteiros, structs, compilação e arrays.',concept:'Um ring buffer reaproveita um array fixo. head aponta para o próximo elemento a sair; size distingue vazio de cheio. Não há alocação por operação.',tradeoff:'push e pop são O(1), e o armazenamento é limitado. A implementação rejeita novas leituras quando cheia. Não é thread-safe: múltiplos produtores exigem sincronização.',challenge:'Construa uma fila FIFO de capacidade 3. Ao remover um item e inserir outro, reutilize o espaço liberado sem deslocar o array.',acceptance:['A quarta inserção em fila cheia retorna false','Depois de remover 10 e inserir 40, saem 20, 30, 40','Remover de fila vazia retorna false'],run:'cc -std=c17 -Wall -Wextra -Werror ring.c main.c -o telemetry\n./telemetry',expected:'20\n30\n40\nTestes passaram.',files:[
file('ring.h',`#ifndef RING_H
#define RING_H
#include <stdbool.h>
#include <stddef.h>
#define CAPACITY 3
typedef struct { int data[CAPACITY]; size_t head; size_t size; } Ring;
bool ring_push(Ring *ring, int value);
bool ring_pop(Ring *ring, int *value);
#endif`,[['1–2','O include guard impede definições duplicadas.'],['3–6','Declare tipos e capacidade fixa; head e size são índices não negativos.'],['7–9','A API explicita sucesso ou falha em bool; saída é escrita por ponteiro.']]),
file('ring.c',`#include "ring.h"

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
}`, [['1','Inclua o contrato público para verificar as assinaturas.'],['3–9','Recuse ponteiro nulo ou fila cheia; o módulo faz tail voltar ao início do array.'],['11–17','Verifique os dois ponteiros antes de acessá-los. Copie a saída antes de avançar head e diminuir size.']]),
file('main.c',`#include "ring.h"
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
        printf("%d\\n", value);
    }
    assert(!ring_pop(&ring, &value));
    puts("Testes passaram.");
    return 0;
}`, [['1–3','Use o contrato e assertions da biblioteca padrão. Compile os testes sem NDEBUG.'],['5–7','Inicialização com zero garante os invariantes head=0 e size=0.'],['8–13','Cubra capacidade, overflow e reutilização de espaço.'],['14–20','Verifique ordem FIFO e underflow; retorne sucesso ao sistema operacional.']])]},
{id:'cpp',name:'C++',mark:'C++',color:'#81b9e0',level:'Avançado',area:'Performance & arquitetura',title:'Performance com propriedade bem definida',description:'RAII, iteradores e estruturas de dados combinadas.',tags:['RAII','STL','Cache'],project:'Cache LRU em memória',minutes:70,prerequisite:'Templates básicos, referências, containers e iteradores.',concept:'Combine list e unordered_map: a lista mantém recência e o mapa encontra o nó. splice move o nó sem invalidar seu iterador, tornando a promoção eficiente.',tradeoff:'Operações são O(1) em média, mas hashes patológicos podem degradar. A classe desabilita cópia porque iteradores copiados apontariam para a lista antiga. A implementação não sincroniza threads.',challenge:'Implemente um cache de capacidade 2 que promova acessos e atualizações. Quando cheio, remova a chave menos recentemente usada.',acceptance:['Inserir a, b; ler a; inserir c deve expulsar b','Atualizar a deve manter apenas um nó para a','Capacidade zero deve lançar invalid_argument'],run:'c++ -std=c++17 -Wall -Wextra -Werror main.cpp -o cache\n./cache',expected:'Cache LRU: testes passaram.',files:[
file('lru.hpp',`#pragma once
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
};`,[['1–6','Includes e pragma once fornecem as estruturas e o retorno opcional sem sentinelas ambíguas.'],['8–12','Cada chave do índice aponta para um nó estável da lista.'],['13–18','Valide capacidade e impeça cópia que quebraria os iteradores.'],['19–24','Uma ausência retorna nullopt; um acerto move o nó ao início sem realocação.'],['25–31','Atualização substitui o valor e promove o nó existente.'],['32–34','Se alocar o índice falhar, desfaça a inserção da lista e propague a exceção.'],['35–40','Remova a chave do índice antes de destruir o nó menos recente.']]),
file('main.cpp',`#include "lru.hpp"
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
    std::cout << "Cache LRU: testes passaram.\\n";
}`, [['1–4','Importe a implementação e ferramentas de teste.'],['5–14','Cubra promoção por leitura, expulsão e atualização de chave.'],['15–20','Verifique que capacidade inválida produz a exceção esperada.']])]},
{id:'dotnet',name:'C# + .NET',mark:'.N',color:'#b4a0ef',level:'Avançado',area:'APIs & backend',title:'Transforme regras em uma API consistente',description:'HTTP, validação e concorrência com ASP.NET Core.',tags:['ASP.NET','REST','Concorrência'],project:'API de reservas de estoque',minutes:75,prerequisite:'C#, HTTP, JSON e locks.',concept:'Validar estoque e decrementá-lo precisa ser uma única operação atômica. Um lock protege esse trecho dentro do processo. HTTP 409 expressa conflito de disponibilidade, enquanto 400 sinaliza entrada inválida.',tradeoff:'Este laboratório usa memória e um processo. Reiniciar restaura o estoque; múltiplas réplicas precisam de transação no banco ou atualização condicional atômica. O lock não coordena máquinas diferentes.',challenge:'Crie uma API que reserve unidades sem permitir estoque negativo sob concorrência. Diferencie entrada inválida, produto ausente e conflito.',acceptance:['GET /stock/book retorna 10 unidades inicialmente','POST /reserve com 3 unidades deixa 7','Quantidade 0 retorna 400; excesso retorna 409'],run:'dotnet run --project Stock.csproj --urls http://localhost:5080\n# Em outro terminal:\ncurl http://localhost:5080/stock/book\ncurl -X POST http://localhost:5080/reserve -H "Content-Type: application/json" -d \'{"sku":"book","quantity":3}\'',expected:'{"sku":"book","available":10}\n{"sku":"book","reserved":3,"remaining":7}',files:[
file('Stock.csproj',`<Project Sdk="Microsoft.NET.Sdk.Web">
  <PropertyGroup>
    <TargetFramework>net8.0</TargetFramework>
    <ImplicitUsings>enable</ImplicitUsings>
    <Nullable>enable</Nullable>
  </PropertyGroup>
</Project>`,[['1–7','O SDK Web inclui ASP.NET Core; defina o runtime alvo e validação de nulos.']]),
file('Program.cs',`var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();
var stock = new Dictionary<string, int> { ["book"] = 10 };
var gate = new object();

app.MapGet("/stock/{sku}", (string sku) => {
    lock (gate) {
        return stock.TryGetValue(sku, out var available)
            ? Results.Ok(new { sku, available })
            : Results.NotFound();
    }
});

app.MapPost("/reserve", (Reservation request) => {
    if (string.IsNullOrWhiteSpace(request.Sku) || request.Quantity <= 0)
        return Results.BadRequest(new { error = "SKU e quantidade positiva obrigatórios" });
    lock (gate) {
        if (!stock.TryGetValue(request.Sku, out var available))
            return Results.NotFound();
        if (available < request.Quantity)
            return Results.Conflict(new { error = "Estoque insuficiente" });
        stock[request.Sku] = available - request.Quantity;
        return Results.Ok(new { sku = request.Sku, reserved = request.Quantity, remaining = stock[request.Sku] });
    }
});
app.Run();
record Reservation(string Sku, int Quantity);`,[['1–4','Inicialize o host, o estado de demonstração e um único objeto de sincronização.'],['6–12','A leitura também compartilha o lock: Dictionary não suporta leitura concorrente com escrita sem proteção.'],['14–16','O binding converte JSON em record; valide antes de entrar na seção crítica.'],['17–24','Leia, compare e escreva sob o mesmo lock. Retorne códigos HTTP conforme a causa.'],['25–27','Inicie o servidor e declare o contrato de entrada.']]),
file('verify.py',`import json
import urllib.request
import urllib.error
from concurrent.futures import ThreadPoolExecutor

def reserve(quantity):
    body = json.dumps({"sku": "book", "quantity": quantity}).encode()
    request = urllib.request.Request("http://localhost:5080/reserve", data=body, headers={"Content-Type": "application/json"})
    try:
        with urllib.request.urlopen(request) as response:
            return response.status
    except urllib.error.HTTPError as error:
        return error.code

assert reserve(0) == 400
with ThreadPoolExecutor(max_workers=20) as pool:
    statuses = list(pool.map(reserve, [1] * 20))
assert statuses.count(200) == 10, statuses
assert statuses.count(409) == 10, statuses
print("Concorrência: 10 reservas e 10 conflitos.")`,[['1–4','O cliente usa apenas Python padrão para gerar requisições concorrentes.'],['6–13','Converta tanto sucesso quanto erro HTTP em status verificável.'],['15–20','Execute com o servidor recém-iniciado e estoque 10, antes dos curls. Exatamente dez reservas devem vencer.']])]},
{id:'java',name:'Java',mark:'Jv',color:'#efb18e',level:'Intermediário',area:'Backend & concorrência',title:'Concorrência com contratos claros',description:'Executors, futures e agregação de resultados.',tags:['Executors','Futures','Records'],project:'Processador concorrente de pedidos',minutes:60,prerequisite:'Classes, interfaces, listas e exceções.',concept:'Um executor limita as tarefas em execução. Future separa submissão de coleta e transporta falhas ao chamador. BigDecimal evita arredondamentos binários no cálculo financeiro.',tradeoff:'O pool tem duas threads, mas invokeAll espera todas as tarefas. Este exemplo não implementa timeout ou retry. O shutdown no finally impede vazamento de threads quando uma tarefa falha.',challenge:'Processe pedidos em duas threads, retorne os resultados na ordem de entrada e rejeite quantidades não positivas.',acceptance:['Pedidos A e B geram 39.80 e 15.00','Ordem da saída é A, B, independentemente da conclusão','O executor encerra mesmo quando houver falha'],run:'javac --release 17 Main.java\njava Main',expected:'A: 39.80\nB: 15.00',files:[
file('Main.java',`import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;
import java.util.concurrent.Callable;
import java.util.concurrent.Executors;

public class Main {
    record Order(String id, BigDecimal price, int quantity) {
        Order {
            if (id == null || id.isBlank() || price == null || price.signum() < 0 || quantity <= 0)
                throw new IllegalArgumentException("Pedido inválido");
        }
    }
    record Receipt(String id, BigDecimal total) {}

    static Receipt process(Order order) {
        var total = order.price().multiply(BigDecimal.valueOf(order.quantity()));
        return new Receipt(order.id(), total.setScale(2, RoundingMode.HALF_UP));
    }

    public static void main(String[] args) throws Exception {
        var orders = List.of(new Order("A", new BigDecimal("19.90"), 2), new Order("B", new BigDecimal("5.00"), 3));
        var pool = Executors.newFixedThreadPool(2);
        try {
            var tasks = orders.stream().<Callable<Receipt>>map(order -> () -> process(order)).toList();
            var results = pool.invokeAll(tasks);
            for (var future : results) {
                var receipt = future.get();
                System.out.println(receipt.id() + ": " + receipt.total().toPlainString());
            }
            if (!process(orders.get(0)).total().equals(new BigDecimal("39.80")))
                throw new AssertionError("Cálculo incorreto");
            boolean rejected = false;
            try { new Order("X", BigDecimal.ONE, 0); }
            catch (IllegalArgumentException error) { rejected = true; }
            if (!rejected) throw new AssertionError("Quantidade inválida aceita");
        } finally {
            pool.shutdown();
        }
    }
}`, [['1–5','Importe tipos numéricos e abstrações de concorrência.'],['7–14','O construtor compacto de record valida invariantes antes de atribuir componentes.'],['16–19','Multiplique com BigDecimal e estabeleça duas casas com arredondamento explícito.'],['21–26','Crie entradas imutáveis e converta cada pedido em Callable. invokeAll preserva ordem na lista de futures.'],['27–30','get pode propagar ExecutionException; não esconda falhas como resultado de sucesso.'],['31–36','Teste valor exato e rejeição de entradas inválidas.'],['37–41','finally garante encerramento ordenado em sucesso ou falha.']])]},
{id:'javascript',name:'JavaScript',mark:'JS',color:'#ead464',level:'Intermediário',area:'Web & assincronismo',title:'Domine o fluxo, não só a sintaxe',description:'Promises, event loop e limites de concorrência.',tags:['Async/await','Promises','Filas'],project:'Fila de tarefas assíncronas',minutes:55,prerequisite:'Funções, arrays, Promise e async/await.',concept:'Promise.all aguarda promises; ele não limita a concorrência de operações já iniciadas. Para limitar concorrência, adie a criação: workers retiram um índice e só então chamam o handler. O cursor avança antes do await.',tradeoff:'A ordem de saída é preservada por índice, não por tempo de conclusão. A implementação aguarda todos os workers antes de propagar uma falha; não cancela operações já iniciadas.',challenge:'Escreva mapLimit(items, limit, handler), com limite de concorrência e saída na ordem original, mesmo com tempos distintos.',acceptance:['Pico de execução simultânea nunca passa de 2','Saída para [3,1,2] é [6,2,4]','Limite 0 é rejeitado e erro do handler é propagado'],run:'node --test queue.test.mjs\nnode demo.mjs',expected:'[ 6, 2, 4 ]',files:[
file('queue.mjs',`export async function mapLimit(items, limit, handler) {
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
}`, [['1–2','Valide o limite: valores fracionários ou não positivos não representam workers.'],['3–4','Reserve posições de saída e compartilhe o cursor dentro da chamada.'],['5–10','Reserve o índice antes de ceder o event loop com await. Cada worker espera sua própria tarefa.'],['11–14','Inicie no máximo limit workers e aguarde todos, inclusive os que falharam.'],['15–16','A lista final mantém a ordem da entrada.']]),
file('demo.mjs',`import { mapLimit } from './queue.mjs';
const result = await mapLimit([3, 1, 2], 2, async value => {
  await new Promise(resolve => setTimeout(resolve, value * 10));
  return value * 2;
});
console.log(result);`,[['1–6','Delays diferentes demonstram que ordem de conclusão e ordem do resultado são independentes.']]),
file('queue.test.mjs',`import test from 'node:test';
import assert from 'node:assert/strict';
import { mapLimit } from './queue.mjs';

test('limita concorrência e preserva ordem', async () => {
  let active = 0, peak = 0;
  const result = await mapLimit([3, 1, 2], 2, async value => {
    active++; peak = Math.max(peak, active);
    await new Promise(resolve => setTimeout(resolve, value * 5));
    active--;
    return value * 2;
  });
  assert.deepEqual(result, [6, 2, 4]);
  assert.equal(peak, 2);
});
test('valida limite, vazio e falha', async () => {
  await assert.rejects(mapLimit([1], 0, x => x), RangeError);
  assert.deepEqual(await mapLimit([], 2, x => x), []);
  await assert.rejects(mapLimit([1], 1, () => { throw new Error('falha'); }), /falha/);
});`,[['1–3','O runner nativo elimina dependências de teste.'],['5–15','Meça o pico real, usando tarefas que duram tempos diferentes.'],['16–20','Cubra validação, lista vazia e propagação de rejeição.']])]},
{id:'typescript',name:'TypeScript',mark:'TS',color:'#84b6f2',level:'Avançado',area:'Tipos & arquitetura',title:'Faça estados inválidos deixarem de existir',description:'Unions discriminadas e fronteiras de validação.',tags:['Type safety','State machines','Narrowing'],project:'Máquina de estados de entrega',minutes:65,prerequisite:'JavaScript, interfaces, generics e narrowing.',concept:'Uma union discriminada liga campos obrigatórios ao estado. Um pedido enviado exige tracking, enquanto um pedido rascunho não o possui. Tipos ajudam dentro do programa, mas dados JSON ainda precisam ser validados em runtime.',tradeoff:'A transição lança erro quando o evento não é permitido. Uma alternativa é retornar Result para modelar a falha como dado. Esta máquina não persiste nem processa eventos de múltiplos clientes.',challenge:'Modele draft → paid → shipped. Rejeite envio antes do pagamento e exija tracking não vazio. Torne o switch de eventos exaustivo.',acceptance:['pay seguido de ship termina em shipped com tracking','ship em draft lança erro','Tracking vazio nunca gera estado shipped'],run:'npm install\nnpm test\nnpm start',expected:'{ status: \'shipped\', id: \'42\', tracking: \'BR123\' }',files:[
file('package.json',`{
  "name": "delivery-state-machine",
  "private": true,
  "type": "module",
  "scripts": { "build": "tsc", "test": "tsc && node dist/test.js", "start": "tsc && node dist/main.js" },
  "devDependencies": { "typescript": "5.9.3" }
}`, [['1–7','Declare ESM, scripts reproduzíveis e compilador com versão fixa.']]),
file('tsconfig.json',`{
  "compilerOptions": {
    "target": "ES2022",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "strict": true,
    "outDir": "dist"
  },
  "include": ["*.ts"]
}`, [['1–10','strict habilita checagens de nulos e tipos; NodeNext mantém imports compatíveis com Node ESM.']]),
file('machine.ts',`export type Order =
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
}`, [['1–5','Cada discriminante seleciona os campos válidos. Eventos e estados são contratos distintos.'],['7–9','never faz o compilador apontar eventos adicionados sem tratamento no switch.'],['10–14','A transição de pagamento exige draft e retorna um novo objeto.'],['15–18','Valide o estado e o conteúdo antes de construir shipped.'],['19–22','O branch default verifica exaustividade; não é um sucesso silencioso.']]),
file('main.ts',`import { transition } from './machine.js';
const paid = transition({ status: 'draft', id: '42' }, { type: 'pay' });
console.log(transition(paid, { type: 'ship', tracking: 'BR123' }));`,[['1–3','Imports terminam em .js porque esse será o arquivo emitido. Componha transições sem mutar a entrada.']]),
file('test.ts',`import { transition, type Order } from './machine.js';
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
console.log('5 verificações passaram.');`,[['1–7','Helpers mínimos tornam falhas observáveis por código de saída não zero.'],['8–12','Verifique o caminho válido e que a entrada permanece inalterada.'],['13–16','Teste cada transição proibida e o tracking vazio.']])]},
];

export const lessons = [
 {title:'Entenda o problema e os contratos',kind:'Arquitetura',duration:12},
 {title:'Implemente a solução, arquivo por arquivo',kind:'Implementação',duration:28},
 {title:'Teste limites e discuta as decisões',kind:'Validação',duration:15}
];
export function sourceBundle(track) {
 return track.files.map(f => `// ===== ${f.name} =====\n${f.code}\n`).join('\n');
}
