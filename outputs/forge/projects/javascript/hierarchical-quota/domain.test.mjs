import test from 'node:test';
import assert from 'node:assert/strict';
import { solve } from './domain.mjs';
const cases = [
  {
    "input": [
      [
        0,
        50
      ],
      [
        1,
        50
      ],
      [
        2,
        30
      ],
      [
        2,
        20
      ],
      [
        0,
        1
      ]
    ],
    "expected": [
      1,
      1,
      0,
      1,
      0,
      120
    ]
  },
  {
    "input": [
      [
        1,
        51
      ]
    ],
    "expected": [
      0,
      0
    ]
  },
  {
    "input": [],
    "expected": [
      0
    ]
  }
];
cases.forEach((item,index)=>test('caso '+index,()=>{
  if (item.expected === null) assert.throws(()=>solve(item.input));
  else assert.deepEqual(solve(item.input),item.expected);
}));
test('valida limites e forma',()=>{
  assert.throws(()=>solve([[-1,1]]));
  assert.throws(()=>solve([[]]));
  assert.throws(()=>solve(Array.from({length:201},()=>[0,1])));
});
