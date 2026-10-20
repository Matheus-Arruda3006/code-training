import test from 'node:test';
import assert from 'node:assert/strict';
import { solve } from './domain.js';
const cases = [
  {
    "input": [
      [
        1,
        0
      ],
      [
        2,
        10
      ],
      [
        1,
        30
      ],
      [
        1,
        61
      ],
      [
        2,
        20
      ]
    ],
    "expected": [
      1,
      1,
      1,
      2,
      1
    ]
  },
  {
    "input": [
      [
        1,
        4
      ],
      [
        1,
        3
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
