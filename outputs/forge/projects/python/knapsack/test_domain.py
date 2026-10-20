import unittest
from domain import solve

CASES = [{"input":[[30,100],[20,70],[40,120]],"expected":[170]},{"input":[[26,10]],"expected":[10]},{"input":[],"expected":[0]}]
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
