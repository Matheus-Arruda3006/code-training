import unittest
from domain import solve

CASES = [{"input":[[2,10],[2,10],[3,11]],"expected":[2,10]},{"input":[[2,10],[2,11]],"expected":[-1]},{"input":[],"expected":[-1]}]
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
