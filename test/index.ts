import { Test, run, test } from 'beater';
import * as assert from 'power-assert';
import { Image, compareImages } from '../src';
import { tests as newImageTests } from './new-image';

const newImage = (height: number, width: number): Image => {
  const data = new Buffer(4 * width * height);
  data.fill(0x00);
  return { data, height, width };
};

const category = 'compareImages ';
const tests: Test[] = [
  test(category + 'not same dimention (width)', () => {
    const image1 = newImage(1, 1);
    const image2 = newImage(1, 2);
    assert(compareImages(image1, image2) === false);
  }),
  test(category + 'not same dimention (height)', () => {
    const image1 = newImage(1, 1);
    const image2 = newImage(2, 1);
    assert(compareImages(image1, image2) === false);
  }),
  test(category + 'same dimention', () => {
    const image1 = newImage(1, 1);
    const image2 = newImage(1, 1);
    assert(compareImages(image1, image2) === true);
  })
].concat(newImageTests);

run(tests).catch(() => process.exit(1));
