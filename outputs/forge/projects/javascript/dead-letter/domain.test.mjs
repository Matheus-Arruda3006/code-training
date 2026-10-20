import test from 'node:test';
import assert from 'node:assert/strict';
import { solve } from './domain.mjs';
const cases = [
  {
    "input": [
      [
        200,
        0
      ],
      [
        429,
        2
      ],
      [
        503,
        5
      ],
      [
        404,
        1
      ]
    ],
    "expected": [
      0,
      1,
      2,
      2
    ]
  },
  {
    "input": [
      [
        408,
        4
      ]
    ],
    "expected": [
      1
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
  assert.throws(()=>solve([[99,0]]));
  assert.throws(()=>solve([[]]));
  assert.throws(()=>solve(Array.from({length:201},()=>[100,0])));
});
