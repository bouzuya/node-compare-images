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
    if (result.type !== 'not_same_dimension') throw new Error();
    assert(result.payload.height === 0);
    assert(result.payload.width === -1);
  }),
  test(category + 'not same dimention (height)', () => {
    const image1 = newDummyImage(1, 1);
    const image2 = newDummyImage(2, 1);
    const result = compareImages(image1, image2)
    if (result.type !== 'not_same_dimension') throw new Error();
    assert(result.payload.height === -1);
    assert(result.payload.width === 0);
  }),
  test(category + 'not same', () => {
    const data = new Buffer(4 * 3 * 3);
    data.fill(0x00);
    const d1 = new Buffer(data);
    const d2 = new Buffer(data);
    d2[0] = 0x99;
    d2[0 + 1] = 0x99;
    d2[0 + 2] = 0x99;
    d2[0 + 3] = 0xff;
    const image1 = newImage(d1, 3, 3);
    const image2 = newImage(d2, 3, 3);
    const result = compareImages(image1, image2);
    if (result.type !== 'not_same') throw new Error();
    assert(result.payload.diffImage.height === 3);
    assert(result.payload.diffImage.width === 3);
    assert(result.payload.diffImage.data[0] === 0xff);
    assert(result.payload.diffImage.data[0 + 1] === 0x00);
    assert(result.payload.diffImage.data[0 + 2] === 0xff);
    assert(result.payload.diffImage.data[0 + 3] === 0xff);
  }),
  test(category + 'same dimention', () => {
    const image1 = newDummyImage(1, 1);
    const image2 = newDummyImage(1, 1);
    const result = compareImages(image1, image2);
    assert(result.type === 'same');
  })
];

export { tests };
