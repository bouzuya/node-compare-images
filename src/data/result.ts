import { Dimension } from './dimension';
import { Image } from './image';

export type Result =
  NotSameResult |
  NotSameDimensionResult |
  SameResult;

export interface NotSameResult {
  payload: {
    diffImage: Image;
  };
  type: 'not_same';
}

export interface NotSameDimensionResult {
  payload: {
    dimension: {
      height: number;
      width: number;
    };
  };
  type: 'not_same_dimension';
}

export interface SameResult {
  type: 'same';
}

const getDiffDimension = (result: Result): Dimension => {
  if (result.type !== 'not_same_dimension') {
    throw new Error('assert result.type === not_same_dimension');
  }
  return result.payload.dimension;
}

const getDiffImage = (result: Result): Image => {
  if (result.type !== 'not_same') {
    throw new Error('assert result.type === not_same');
  }
  return result.payload.diffImage;
};

const isSameDimension = (result: Result): boolean => {
  return result.type !== 'not_same_dimension';
};

const isSame = (result: Result): boolean => {
  return result.type === 'same';
};

const newNotSameDimensionResult = (
  image1: Image,
  image2: Image
): NotSameDimensionResult => {
  return {
    payload: {
      dimension: {
        height: image1.height - image2.height,
        width: image1.width - image2.width
      }
    },
    type: 'not_same_dimension'
  };
};

const newNotSameResult = (
  _image1: Image,
  _image2: Image,
  diffImage: Image
): NotSameResult => {
  return {
    payload: {
      diffImage
    },
    type: 'not_same'
  };
};

const newSameResult = (_image1: Image, _image2: Image): SameResult => {
  return { type: 'same' };
};

export {
  getDiffDimension,
  getDiffImage,
  isSameDimension,
  isSame,
  newNotSameResult,
  newNotSameDimensionResult,
  newSameResult
};
