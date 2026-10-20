import unittest
from domain import solve

CASES = [{"input":[[100,1,100,2],[100,1,100,3]],"expected":[1,0]},{"input":[[10,11,10,0]],"expected":None},{"input":[],"expected":[]}]
class DomainTest(unittest.TestCase):
    def test_contract(self):
        for case in CASES:
            with self.subTest(case=case):
                if case['expected'] is None:
                    with self.assertRaises(ValueError): solve(case['input'])
                else:
                    self.assertEqual(solve(case['input']), case['expected'])
    def test_validation(self):
        for invalid in [[[]], [[0,0,1,0]], [[1,0,1,0]]*201]:
            with self.assertRaises(ValueError): solve(invalid)
if __name__ == '__main__': unittest.main()
