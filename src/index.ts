import { Image } from './type/image';
import { Result } from './type/result';
import { newImage } from './new-image';

const isSameDimension = (image1: Image, image2: Image): boolean => {
  return image1.height === image2.height && image1.width === image2.width;
};

const compareImages = (
  image1: Image,
  image2: Image
): Result => {
  if (!isSameDimension(image1, image2)) {
    return {
      payload: {
        height: image1.height - image2.height,
        width: image1.width - image2.width
      },
      type: 'is_not_same_dimension'
    };
  }

  return { type: 'is_same' };
};

export {
  Image,
  compareImages,
  newImage
};
