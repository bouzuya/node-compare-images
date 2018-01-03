import { newImage } from './new-image';
import { Image } from './type/image';
import { NotSame, NotSameDimension, Result, Same } from './type/result';

const isSameDimension = (image1: Image, image2: Image): boolean => {
  return image1.height === image2.height && image1.width === image2.width;
};

const newNotSameDimension = (image1: Image, image2: Image): NotSameDimension => {
  return {
    payload: {
      height: image1.height - image2.height,
      width: image1.width - image2.width
    },
    type: 'is_not_same_dimension'
  };
};

const newNotSame = (
  _image1: Image,
  _image2: Image,
  diffImage: Image
): NotSame => {
  return {
    payload: {
      diffImage
    },
    type: 'is_not_same'
  };
};

const newSame = (_image1: Image, _image2: Image): Same => {
  return { type: 'is_same' };
};

const compareImages = (
  image1: Image,
  image2: Image
): Result => {
  if (!isSameDimension(image1, image2)) {
    return newNotSameDimension(image1, image2);
  }
  const height = image1.height; // = image2.height
  const width = image1.width; // = image2.width
  const diffImageData = new Buffer(4 * height * width);
  const diffImage = newImage(diffImageData, height, width);
  let isSame = true;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const index = 4 * (y * width + x);
      const r1 = image1.data[index];
      const g1 = image1.data[index + 1];
      const b1 = image1.data[index + 2];
      const a1 = image1.data[index + 3];
      const r2 = image2.data[index];
      const g2 = image2.data[index + 1];
      const b2 = image2.data[index + 2];
      const a2 = image2.data[index + 3];
      const isSamePixel = r1 === r2 && g1 === g2 && b1 === b2 && a1 === a2;
      if (isSamePixel) {
        diffImage.data[index] = r1; // = r2
        diffImage.data[index + 1] = g1; // = g2
        diffImage.data[index + 2] = b1; // = b2
        diffImage.data[index + 3] = a1; // = a2
      } else {
        diffImage.data[index] = 0xff;
        diffImage.data[index + 1] = 0x00;
        diffImage.data[index + 2] = 0xff;
        diffImage.data[index + 3] = 0xff;
        isSame = false;
      }
    }
  }
  if (isSame) {
    return newSame(image1, image2);
  } else {
    return newNotSame(image1, image2, diffImage);
  }
};

export {
  Image,
  compareImages,
  newImage
};
