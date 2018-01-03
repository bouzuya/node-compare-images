import { Image } from './type/image';

const compareImages = (
  image1: Image,
  image2: Image
): boolean => {
  return image1.height === image2.height && image1.width === image2.width;
};

const newImage = (data: Buffer, height: number, width: number): Image => {
  if (height < 0 || isNaN(height)) throw new Error('assert height >= 0');
  if (width < 0 || isNaN(width)) throw new Error('assert width >= 0');
  if (data.length !== 4 * height * width)
    throw new Error('assert data.length === 4 * height * width');
  return { data, height, width };
};

export {
  Image,
  compareImages,
  newImage
};
