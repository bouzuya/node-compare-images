export type Result =
  NotSameDimension |
  Same;

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
