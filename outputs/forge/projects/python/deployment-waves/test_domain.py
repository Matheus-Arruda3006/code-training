import unittest
from domain import solve

CASES = [{"input":[[60],[50],[40],[20]],"expected":[0,1,1,2,3]},{"input":[[100],[100]],"expected":[0,1,2]},{"input":[],"expected":[0]}]
class DomainTest(unittest.TestCase):
    def test_contract(self):
        for case in CASES:
            with self.subTest(case=case):
                if case['expected'] is None:
                    with self.assertRaises(ValueError): solve(case['input'])
                else:
                    self.assertEqual(solve(case['input']), case['expected'])
    def test_validation(self):
        for invalid in [[[]], [[0]], [[1]]*201]:
            with self.assertRaises(ValueError): solve(invalid)
if __name__ == '__main__': unittest.main()
