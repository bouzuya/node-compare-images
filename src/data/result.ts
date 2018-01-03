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
