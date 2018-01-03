import { Dimension } from './data/dimension';
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
  Result,
  getDiffDimension,
  getDiffImage,
  isSame,
  isSameDimension as isSameDimensionResult,
  newNotSameResult,
  newNotSameDimensionResult,
  newSameResult
} from './data/result';

const compareImages = (
  image1: Image,
  image2: Image
): Result => {
  if (!isSameDimension(image1, image2)) {
    return newNotSameDimensionResult(image1, image2);
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
    ? newSameResult(image1, image2)
    : newNotSameResult(image1, image2, diffImage);
};

export {
  Dimension,
  Image,
  Result,
  compareImages,
  getDiffImage,
  getDiffDimension,
  isSame,
  isSameDimensionResult as isSameDimension,
  newImage
};
