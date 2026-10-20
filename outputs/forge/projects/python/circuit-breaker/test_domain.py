import unittest
from domain import solve

CASES = [{"input":[[0,0],[1,0],[2,0],[3,1],[7,1],[8,0]],"expected":[1,1,1,0,1,1]},{"input":[[0,1]],"expected":[1]},{"input":[],"expected":[]}]
class DomainTest(unittest.TestCase):
    def test_contract(self):
        for case in CASES:
            with self.subTest(case=case):
                if case['expected'] is None:
                    with self.assertRaises(ValueError): solve(case['input'])
                else:
                    self.assertEqual(solve(case['input']), case['expected'])
    def test_validation(self):
        for invalid in [[[]], [[-1,0]], [[0,0]]*201]:
            with self.assertRaises(ValueError): solve(invalid)
if __name__ == '__main__': unittest.main()
