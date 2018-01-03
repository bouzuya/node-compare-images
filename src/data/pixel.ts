import { U8 } from './u8';

export interface Pixel {
  r: U8;
  g: U8;
  b: U8;
  a: U8;
}

const isSamePixel = (p1: Pixel, p2: Pixel): boolean => {
  return p1.r === p2.r && p1.g === p2.g && p1.b === p2.b && p1.a === p2.a;
};

const newPixel = (r: U8, g: U8, b: U8, a: U8): Pixel => {
  return { r, g, b, a };
};

export { isSamePixel, newPixel };
