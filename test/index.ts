import { Test, run, test } from 'beater';
import * as assert from 'power-assert';
import { Image, add } from '../src';

const newImage = (): Image => {
  const data = new Buffer(4 * 1);
  data[0] = 0x00;
  data[1] = 0x00;
  data[2] = 0x00;
  data[3] = 0x00;
  return { data, height: 1, width: 1 };
};

const tests: Test[] = [
  test('add', () => {
    const d = newImage();
    assert(d.width === d.width);
    assert(add(1, 2) === 3);
  })
];

run(tests).catch(() => process.exit(1));
