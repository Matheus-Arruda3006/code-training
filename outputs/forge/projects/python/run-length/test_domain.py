import unittest
from domain import solve

CASES = [{"input":[[2],[2],[3],[2]],"expected":[2,2,3,1,2,1]},{"input":[[-1],[-1]],"expected":[-1,2]},{"input":[],"expected":[]}]
class DomainTest(unittest.TestCase):
    def test_contract(self):
        for case in CASES:
            with self.subTest(case=case):
                if case['expected'] is None:
                    with self.assertRaises(ValueError): solve(case['input'])
                else:
                    self.assertEqual(solve(case['input']), case['expected'])
    def test_validation(self):
        for invalid in [[[]], [[-10001]], [[-10000]]*201]:
            with self.assertRaises(ValueError): solve(invalid)
if __name__ == '__main__': unittest.main()
