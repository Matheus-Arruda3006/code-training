import unittest
from domain import solve

CASES = [{"input":[[1,0,5],[1,4,5],[1,5,5],[1,9,5]],"expected":[0,1,0,1]},{"input":[[0,2,1],[0,1,1]],"expected":None},{"input":[],"expected":[]}]
class DomainTest(unittest.TestCase):
    def test_contract(self):
        for case in CASES:
            with self.subTest(case=case):
                if case['expected'] is None:
                    with self.assertRaises(ValueError): solve(case['input'])
                else:
                    self.assertEqual(solve(case['input']), case['expected'])
    def test_validation(self):
        for invalid in [[[]], [[-1,0,1]], [[0,0,1]]*201]:
            with self.assertRaises(ValueError): solve(invalid)
if __name__ == '__main__': unittest.main()
