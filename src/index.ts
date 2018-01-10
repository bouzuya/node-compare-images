import { Dimension } from './data/dimension';
import {
  Image,
  getPixel,
  isSameDimension,
  newBlankImage,
  newImage,
  setPixel
} from './data/image';
import { Pixel, isSamePixel, newPixel } from './data/pixel';
import {
  Result,
  getAllPixelCount,
  getDiffDimension,
  getDiffImage,
  getDiffPixelCount,
  isSame as isSameResult,
  isSameDimension as isSameDimensionResult,
  newNotSameDimensionResult,
  newNotSameResult,
  newSameResult
} from './data/result';

const comparePixels = (p1: Pixel, p2: Pixel): [boolean, Pixel] => {
  return isSamePixel(p1, p2)
    ? [true, p1] // p1 = p2
    : [false, newPixel(0xff, 0x00, 0xff, 0xff)];
};

const compareImages = (
  image1: Image,
  image2: Image
): Result => {
  if (!isSameDimension(image1, image2)) {
    return newNotSameDimensionResult(image1, image2);
  }
  const height = image1.height; // = image2.height
  const width = image1.width; // = image2.width
  const diffImage = newBlankImage(height, width);
  let samePixelCount = 0;
  let isSame = true;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const p1 = getPixel(image1, x, y);
      const p2 = getPixel(image2, x, y);
      const [b, p] = comparePixels(p1, p2);
      setPixel(diffImage, x, y, p);
      samePixelCount += b ? 1 : 0;
      isSame = isSame && b;
    }
  }
  const allPixelCount = width * height;
  const diffPixelCount = allPixelCount - samePixelCount;
  return isSame
    ? newSameResult()
    : newNotSameResult(diffImage, allPixelCount, diffPixelCount);
};

export {
  Dimension,
  Image,
  Result,
  compareImages,
  getAllPixelCount,
  getDiffImage,
  getDiffDimension,
  getDiffPixelCount,
  isSameResult as isSame,
  isSameDimensionResult as isSameDimension,
  newImage
};
