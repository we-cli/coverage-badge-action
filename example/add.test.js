import assert from 'assert'
import { add } from './add.js'

export let testAdd = () => {
  assert.equal(add(1, 2), 3)
  assert.equal(add(0, -1), -1)
  assert.equal(add(0, NaN), NaN)
  assert.equal(add('', NaN), 'NaN')
}
