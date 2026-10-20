import test from 'node:test';
import assert from 'node:assert/strict';
import { solve } from './domain.js';
const cases = [
  {
    "input": [
      [
        110,
        100,
        10
      ],
      [
        111,
        100,
        10
      ],
      [
        1,
        0,
        20
      ]
    ],
    "expected": [
      0,
      1,
      1
    ]
  },
  {
    "input": [
      [
        0,
        0,
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
  assert.throws(()=>solve([[-1,0,0]]));
  assert.throws(()=>solve([[]]));
  assert.throws(()=>solve(Array.from({length:201},()=>[0,0,0])));
});
