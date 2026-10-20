import test from 'node:test';
import assert from 'node:assert/strict';
import { solve } from './domain.js';
const cases = [
  {
    "input": [
      [
        11,
        3
      ],
      [
        10,
        7
      ],
      [
        10,
        5
      ],
      [
        12,
        1
      ],
      [
        10,
        6
      ]
    ],
    "expected": [
      10,
      6,
      10,
      7,
      11,
      3
    ]
  },
  {
    "input": [
      [
        10,
        6
      ],
      [
        10,
        6
      ]
    ],
    "expected": null
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
  assert.throws(()=>solve([[-1,0]]));
  assert.throws(()=>solve([[]]));
  assert.throws(()=>solve(Array.from({length:201},()=>[0,0])));
});
