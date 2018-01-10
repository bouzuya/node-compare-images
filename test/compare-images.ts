import { Test, test } from 'beater';
import * as assert from 'power-assert';
import {
  Image,
  compareImages,
  getAllPixelCount,
  getDiffDimension,
  getDiffImage,
  getDiffPixelCount,
  isSame,
  isSameDimension,
  newImage
} from '../src';

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
    const result = compareImages(image1, image2);
    assert(isSameDimension(result) === false);
    const { height, width } = getDiffDimension(result);
    assert(height === 0);
    assert(width === -1);
  }),
  test(category + 'not same dimention (height)', () => {
    const image1 = newDummyImage(1, 1);
    const image2 = newDummyImage(2, 1);
    const result = compareImages(image1, image2);
    assert(isSameDimension(result) === false);
    const { height, width } = getDiffDimension(result);
    assert(height === -1);
    assert(width === 0);
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
    assert(isSameDimension(result) === true);
    assert(isSame(result) === false);
    assert(getAllPixelCount(result) === 9);
    assert(getDiffImage(result).height === 3);
    assert(getDiffImage(result).width === 3);
    assert(getDiffImage(result).data[0] === 0xff);
    assert(getDiffImage(result).data[0 + 1] === 0x00);
    assert(getDiffImage(result).data[0 + 2] === 0xff);
    assert(getDiffImage(result).data[0 + 3] === 0xff);
    assert(getDiffPixelCount(result) === 1);
  }),
  test(category + 'same dimention', () => {
    const image1 = newDummyImage(1, 1);
    const image2 = newDummyImage(1, 1);
    const result = compareImages(image1, image2);
    assert(isSameDimension(result) === true);
    assert(isSame(result) === true);
  })
];

export { tests };
