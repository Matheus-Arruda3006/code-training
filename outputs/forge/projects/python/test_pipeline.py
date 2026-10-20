import unittest
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
            for text in ["category,amount\nx,-1", "category,amount\nx,NaN", "wrong\n1"]:
                path.write_text(text, encoding="utf-8")
                with self.assertRaises(ValueError):
                    list(transactions(path))

if __name__ == "__main__":
    unittest.main()
