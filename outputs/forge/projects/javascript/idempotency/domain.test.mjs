import test from 'node:test';
import assert from 'node:assert/strict';
import { solve } from './domain.mjs';
const cases = [
  {
    "input": [
      [
        1,
        10
      ],
      [
        1,
        10
      ],
      [
        1,
        20
      ],
      [
        2,
        20
      ]
    ],
    "expected": [
      1,
      0,
      -1,
      1
    ]
  },
  {
    "input": [
      [
        0,
        0
      ],
      [
        0,
        0
      ]
    ],
    "expected": [
      1,
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
  assert.throws(()=>solve([[-1,0]]));
  assert.throws(()=>solve([[]]));
  assert.throws(()=>solve(Array.from({length:201},()=>[0,0])));
});
