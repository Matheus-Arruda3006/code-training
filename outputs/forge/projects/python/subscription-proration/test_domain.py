import unittest
from domain import solve

CASES = [{"input":[[1000,15,30],[999,1,30]],"expected":[500,33]},{"input":[[100,32,31]],"expected":None},{"input":[[100,0,28]],"expected":[0]},{"input":[],"expected":[]}]
class DomainTest(unittest.TestCase):
    def test_contract(self):
        for case in CASES:
            with self.subTest(case=case):
                if case['expected'] is None:
                    with self.assertRaises(ValueError): solve(case['input'])
                else:
                    self.assertEqual(solve(case['input']), case['expected'])
    def test_validation(self):
        for invalid in [[[]], [[-1,0,1]], [[0,0,1]]*201]:
            with self.assertRaises(ValueError): solve(invalid)
if __name__ == '__main__': unittest.main()
