var builder = WebApplication.CreateBuilder(args);
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
record Reservation(string Sku, int Quantity);
