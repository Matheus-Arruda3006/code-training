import test from 'node:test';
import assert from 'node:assert/strict';
import { solve } from './domain.mjs';
const cases = [
  {
    "input": [
      [
        1,
        0,
        10
      ],
      [
        1,
        1,
        12
      ],
      [
        1,
        1,
        4
      ],
      [
        1,
        2,
        1
      ]
    ],
    "expected": [
      10,
      -1,
      6,
      6
    ]
  },
  {
    "input": [
      [
        0,
        1,
        1
      ]
    ],
    "expected": [
      -1
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
  assert.throws(()=>solve([[-1,0,1]]));
  assert.throws(()=>solve([[]]));
  assert.throws(()=>solve(Array.from({length:201},()=>[0,0,1])));
});
