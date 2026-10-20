import csv
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
        print(f"{category}: {total:.2f}")
