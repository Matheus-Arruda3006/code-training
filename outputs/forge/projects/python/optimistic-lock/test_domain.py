import unittest
from domain import solve

CASES = [{"input":[[1,0,10],[1,0,20],[1,1,-3]],"expected":[1,-1,2,7]},{"input":[[0,1,10]],"expected":[-1,0]},{"input":[],"expected":[0]}]
class DomainTest(unittest.TestCase):
    def test_contract(self):
        for case in CASES:
            with self.subTest(case=case):
                if case['expected'] is None:
                    with self.assertRaises(ValueError): solve(case['input'])
                else:
                    self.assertEqual(solve(case['input']), case['expected'])
    def test_validation(self):
        for invalid in [[[]], [[-1,0,-10000]], [[0,0,-10000]]*201]:
            with self.assertRaises(ValueError): solve(invalid)
if __name__ == '__main__': unittest.main()
