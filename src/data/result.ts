import { Image } from './image';

export type Result =
  NotSame |
  NotSameDimension |
  Same;

export interface NotSame {
  payload: {
    diffImage: Image;
  };
  type: 'is_not_same';
}

export interface NotSameDimension {
  payload: {
    height: number;
    width: number;
  };
  type: 'is_not_same_dimension';
}

export interface Same {
  type: 'is_same';
}

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

export { newNotSame, newNotSameDimension, newSame };
