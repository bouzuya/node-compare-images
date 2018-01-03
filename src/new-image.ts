import { Image } from './type/image';

const newImage = (data: Buffer, height: number, width: number): Image => {
  if (height < 0 || isNaN(height)) throw new Error('assert height >= 0');
  if (width < 0 || isNaN(width)) throw new Error('assert width >= 0');
  if (data.length !== 4 * height * width)
    throw new Error('assert data.length === 4 * height * width');
  return { data, height, width };
};

export { newImage };
