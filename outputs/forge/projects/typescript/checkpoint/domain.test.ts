import test from 'node:test';
import assert from 'node:assert/strict';
import { solve } from './domain.js';
const cases = [
  {
    "input": [
      [
        2
      ],
      [
        0
      ],
      [
        1
      ],
      [
        1
      ],
      [
        4
      ],
      [
        3
      ]
    ],
    "expected": [
      -1,
      0,
      2,
      2,
      2,
      4
    ]
  },
  {
    "input": [
      [
        0
      ]
    ],
    "expected": [
      0
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
  assert.throws(()=>solve([[-1]]));
  assert.throws(()=>solve([[]]));
  assert.throws(()=>solve(Array.from({length:201},()=>[0])));
});
