import unittest
from domain import solve

CASES = [{"input":[[11,3],[10,7],[10,5],[12,1],[10,6]],"expected":[10,6,10,7,11,3]},{"input":[[10,6],[10,6]],"expected":None},{"input":[],"expected":[]}]
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
