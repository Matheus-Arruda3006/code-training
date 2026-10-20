import unittest
from domain import solve

CASES = [{"input":[[-1,5],[-1,3],[0,4],[1,2]],"expected":[5,3,9,5,9]},{"input":[[0,1]],"expected":None},{"input":[],"expected":[0]}]
class DomainTest(unittest.TestCase):
    def test_contract(self):
        for case in CASES:
            with self.subTest(case=case):
                if case['expected'] is None:
                    with self.assertRaises(ValueError): solve(case['input'])
                else:
                    self.assertEqual(solve(case['input']), case['expected'])
    def test_validation(self):
        for invalid in [[[]], [[-2,1]], [[-1,1]]*201]:
            with self.assertRaises(ValueError): solve(invalid)
if __name__ == '__main__': unittest.main()
