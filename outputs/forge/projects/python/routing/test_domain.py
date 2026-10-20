import unittest
from domain import solve

CASES = [{"input":[[10,5],[100,20],[50,10]],"expected":[1]},{"input":[[1,2]],"expected":[0]},{"input":[],"expected":[-1]}]
class DomainTest(unittest.TestCase):
    def test_contract(self):
        for case in CASES:
            with self.subTest(case=case):
                if case['expected'] is None:
                    with self.assertRaises(ValueError): solve(case['input'])
                else:
                    self.assertEqual(solve(case['input']), case['expected'])
    def test_validation(self):
        for invalid in [[[]], [[0,0]], [[1,0]]*201]:
            with self.assertRaises(ValueError): solve(invalid)
if __name__ == '__main__': unittest.main()
