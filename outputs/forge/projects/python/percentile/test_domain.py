import unittest
from domain import solve

CASES = [{"input":[[9],[1],[4],[2]],"expected":[2,9]},{"input":[[7]],"expected":[7,7]},{"input":[],"expected":[]}]
class DomainTest(unittest.TestCase):
    def test_contract(self):
        for case in CASES:
            with self.subTest(case=case):
                if case['expected'] is None:
                    with self.assertRaises(ValueError): solve(case['input'])
                else:
                    self.assertEqual(solve(case['input']), case['expected'])
    def test_validation(self):
        for invalid in [[[]], [[-1]], [[0]]*201]:
            with self.assertRaises(ValueError): solve(invalid)
if __name__ == '__main__': unittest.main()
