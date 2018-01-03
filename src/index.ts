import { newImage } from './new-image';
import { Image } from './type/image';
import { Pixel } from './type/pixel';
import { U8 } from './type/u8';
import { NotSame, NotSameDimension, Result, Same } from './type/result';

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

const isSamePixel = (p1: Pixel, p2: Pixel): boolean => {
  return p1.r === p2.r && p1.g === p2.g && p1.b === p2.b && p1.a === p2.a;
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

const newPixel = (r: U8, g: U8, b: U8, a: U8): Pixel => {
  return { r, g, b, a };
};

const newSame = (_image1: Image, _image2: Image): Same => {
  return { type: 'is_same' };
};

const setPixel = (image: Image, x: number, y: number, p: Pixel): void => {
  const data = image.data;
  const index = 4 * (y * image.width + x);
  data[index] = p.r;
  data[index + 1] = p.g;
  data[index + 2] = p.b;
  data[index + 3] = p.a;
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
      const p1 = getPixel(image1, x, y);
      const p2 = getPixel(image2, x, y);
      if (isSamePixel(p1, p2)) {
        setPixel(diffImage, x, y, p1); // = p2
      } else {
        setPixel(diffImage, x, y, newPixel(0xff, 0x00, 0xff, 0xff));
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
