import test from 'node:test';
import assert from 'node:assert/strict';
import { solve } from './domain.js';
const cases = [
  {
    "input": [
      [
        1,
        100,
        70
      ],
      [
        1,
        30,
        60
      ],
      [
        2,
        50,
        20
      ]
    ],
    "expected": [
      2,
      30
    ]
  },
  {
    "input": [
      [
        3,
        10,
        20
      ]
    ],
    "expected": [
      3,
      -10
    ]
  },
  {
    "input": [],
    "expected": []
  }
];
cases.forEach((item,index)=>test('caso '+index,()=>{
  if (item.expected === null) assert.throws(()=>solve(item.input));
  else assert.deepEqual(solve(item.input),item.expected);
}));
test('valida limites e forma',()=>{
  assert.throws(()=>solve([[-1,0,0]]));
  assert.throws(()=>solve([[]]));
  assert.throws(()=>solve(Array.from({length:201},()=>[0,0,0])));
});
