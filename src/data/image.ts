import { Pixel } from './pixel';

export interface Image {
  data: Buffer;
  height: number;
  width: number;
}

const getPixel = (image: Image, x: number, y: number): Pixel => {
  const data = image.data;
  const index = 4 * (y * image.width + x);
  return {
    r: data[index],
    g: data[index + 1],
    b: data[index + 2],
    a: data[index + 3]
  };
};

const isSameDimension = (image1: Image, image2: Image): boolean => {
  return image1.height === image2.height && image1.width === image2.width;
};

const newBlankImage = (height: number, width: number): Image => {
  const data = new Buffer(4 * height * width);
  return newImage(data, height, width);
};

const newImage = (data: Buffer, height: number, width: number): Image => {
  if (height < 0 || isNaN(height)) throw new Error('assert height >= 0');
  if (width < 0 || isNaN(width)) throw new Error('assert width >= 0');
  if (data.length !== 4 * height * width)
    throw new Error('assert data.length === 4 * height * width');
  return { data, height, width };
};

const setPixel = (image: Image, x: number, y: number, p: Pixel): void => {
  const data = image.data;
  const index = 4 * (y * image.width + x);
  data[index] = p.r;
  data[index + 1] = p.g;
  data[index + 2] = p.b;
  data[index + 3] = p.a;
};

export {
  getPixel,
  isSameDimension,
  newBlankImage,
  newImage,
  setPixel
};
