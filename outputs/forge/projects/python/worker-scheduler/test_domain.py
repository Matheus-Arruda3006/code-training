import unittest
from domain import solve

CASES = [{"input":[[0,5],[0,2],[0,3],[1,1]],"expected":[0,5,1,2,2,3,1,3]},{"input":[[10,2]],"expected":[0,12]},{"input":[],"expected":[]}]
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
