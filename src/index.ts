import {
  Image,
  getPixel,
  isSameDimension,
  newBlankImage,
  newImage,
  setPixel
} from './data/image';
import { isSamePixel, newPixel } from './data/pixel';
import {
  NotSame,
  NotSameDimension,
  Result,
  Same,
  newNotSame,
  newNotSameDimension,
  newSame
} from './data/result';

const compareImages = (
  image1: Image,
  image2: Image
): Result => {
  if (!isSameDimension(image1, image2)) {
    return newNotSameDimension(image1, image2);
  }
  const errorPixel = newPixel(0xff, 0x00, 0xff, 0xff);
  const height = image1.height; // = image2.height
  const width = image1.width; // = image2.width
  const diffImage = newBlankImage(height, width);
  let isSame = true;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const p1 = getPixel(image1, x, y);
      const p2 = getPixel(image2, x, y);
      if (isSamePixel(p1, p2)) {
        setPixel(diffImage, x, y, p1); // = p2
      } else {
        setPixel(diffImage, x, y, errorPixel);
        isSame = false;
      }
    }
  }
  return isSame
    ? newSame(image1, image2)
    : newNotSame(image1, image2, diffImage);
};

export {
  Image,
  NotSame,
  NotSameDimension,
  Result,
  Same,
  compareImages,
  newImage
};
