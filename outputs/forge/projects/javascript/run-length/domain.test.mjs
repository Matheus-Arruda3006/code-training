import test from 'node:test';
import assert from 'node:assert/strict';
import { solve } from './domain.mjs';
const cases = [
  {
    "input": [
      [
        2
      ],
      [
        2
      ],
      [
        3
      ],
      [
        2
      ]
    ],
    "expected": [
      2,
      2,
      3,
      1,
      2,
      1
    ]
  },
  {
    "input": [
      [
        -1
      ],
      [
        -1
      ]
    ],
    "expected": [
      -1,
      2
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
  assert.throws(()=>solve([[-10001]]));
  assert.throws(()=>solve([[]]));
  assert.throws(()=>solve(Array.from({length:201},()=>[-10000])));
});
