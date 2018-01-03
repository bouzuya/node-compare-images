import { Test, test } from 'beater';
import * as assert from 'power-assert';
import { newImage } from '../src';

const category = 'newImage ';
const tests: Test[] = [
  test(category, () => {
    const height1 = 1;
    const width1 = 1;
    const data1 = new Buffer(4 * height1 * width1);
    data1.fill(0x00);
    const image1 = newImage(data1, height1, width1);
    assert.deepEqual(image1.data, data1);
    assert(image1.height === height1);
    assert(image1.width === width1);
  }),
  test(category + 'height < 0', () => {
    const height1 = -1;
    const width1 = 1;
    const data1 = new Buffer(4 * 1 * width1);
    data1.fill(0x00);
    try {
      newImage(data1, height1, width1);
      assert.fail('should throw Error');
    } catch (e) {
      assert(e.message === 'assert height >= 0');
    }
  }),
  test(category + 'height is NaN', () => {
    const height1 = NaN;
    const width1 = 1;
    const data1 = new Buffer(4 * 1 * width1);
    data1.fill(0x00);
    try {
      newImage(data1, height1, width1);
      assert.fail('should throw Error');
    } catch (e) {
      assert(e.message === 'assert height >= 0');
    }
  }),
  test(category + 'width < 0', () => {
    const height1 = 1;
    const width1 = -1;
    const data1 = new Buffer(4 * height1 * 1);
    data1.fill(0x00);
    try {
      newImage(data1, height1, width1);
      assert.fail('should throw Error');
    } catch (e) {
      assert(e.message === 'assert width >= 0');
    }
  }),
  test(category + 'width is NaN', () => {
    const height1 = 1;
    const width1 = NaN;
    const data1 = new Buffer(4 * height1 * 1);
    data1.fill(0x00);
    try {
      newImage(data1, height1, width1);
      assert.fail('should throw Error');
    } catch (e) {
      assert(e.message === 'assert width >= 0');
    }
  }),
  test(category + 'invalid data.length', () => {
    const height1 = 1;
    const width1 = 1;
    const data1 = new Buffer(height1 * width1);
    data1.fill(0x00);
    try {
      newImage(data1, height1, width1);
      assert.fail('should throw Error');
    } catch (e) {
      assert(e.message === 'assert data.length === 4 * height * width');
    }
  })
];

export { tests };
