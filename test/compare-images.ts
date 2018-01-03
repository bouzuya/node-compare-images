import { Test, test } from 'beater';
import * as assert from 'power-assert';
import { Image, compareImages, newImage } from '../src';

const newDummyImage = (height: number, width: number): Image => {
  const data = new Buffer(4 * width * height);
  data.fill(0x00);
  return newImage(data, height, width);
};

const category = 'compareImages ';
const tests: Test[] = [
  test(category + 'not same dimention (width)', () => {
    const image1 = newDummyImage(1, 1);
    const image2 = newDummyImage(1, 2);
    const result = compareImages(image1, image2)
    if (result.type !== 'is_not_same_dimension') throw new Error();
    assert(result.payload.height === 0);
    assert(result.payload.width === -1);
  }),
  test(category + 'not same dimention (height)', () => {
    const image1 = newDummyImage(1, 1);
    const image2 = newDummyImage(2, 1);
    const result = compareImages(image1, image2)
    if (result.type !== 'is_not_same_dimension') throw new Error();
    assert(result.payload.height === -1);
    assert(result.payload.width === 0);
  }),
  test(category + 'same dimention', () => {
    const image1 = newDummyImage(1, 1);
    const image2 = newDummyImage(1, 1);
    const result = compareImages(image1, image2)
    assert(result.type === 'is_same');
  })
];

export { tests };
