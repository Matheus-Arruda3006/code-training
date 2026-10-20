import java.math.BigDecimal;
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
}
