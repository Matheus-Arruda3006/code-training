import unittest
from domain import solve

CASES = [{"input":[[1,1,100,100,0],[1,2,1,100,0],[1,1,10,100,1]],"expected":[1,0,0]},{"input":[[0,0,101,100,0]],"expected":[0]},{"input":[],"expected":[]}]
class DomainTest(unittest.TestCase):
    def test_contract(self):
        for case in CASES:
            with self.subTest(case=case):
                if case['expected'] is None:
                    with self.assertRaises(ValueError): solve(case['input'])
                else:
                    self.assertEqual(solve(case['input']), case['expected'])
    def test_validation(self):
        for invalid in [[[]], [[-1,0,0,0,0]], [[0,0,0,0,0]]*201]:
            with self.assertRaises(ValueError): solve(invalid)
if __name__ == '__main__': unittest.main()
