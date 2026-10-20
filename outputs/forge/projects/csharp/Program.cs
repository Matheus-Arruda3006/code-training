using System.Globalization;

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
}
