import unittest
from domain import solve

CASES = [{"input":[[0,50],[1,50],[2,30],[2,20],[0,1]],"expected":[1,1,0,1,0,120]},{"input":[[1,51]],"expected":[0,0]},{"input":[],"expected":[0]}]
class DomainTest(unittest.TestCase):
    def test_contract(self):
        for case in CASES:
            with self.subTest(case=case):
                if case['expected'] is None:
                    with self.assertRaises(ValueError): solve(case['input'])
                else:
                    self.assertEqual(solve(case['input']), case['expected'])
    def test_validation(self):
        for invalid in [[[]], [[-1,1]], [[0,1]]*201]:
            with self.assertRaises(ValueError): solve(invalid)
if __name__ == '__main__': unittest.main()
