import { Image } from './type/image';

const compareImages = (
  image1: Image,
  image2: Image
): boolean => {
  return image1.height === image2.height && image1.width === image2.width;
};

export { Image, compareImages };
