# node-compare-images

A library to compare images for Node.js.

## Installation

```sh
npm install @bouzuya/compare-images
```

## Usage

```js
import * as assert from 'assert';
import {
  compareImages,
  getDiffImage,
  isSame
} from '@bouzuya/compare-images';

// image1: { data: Buffer; height: number; width: number; }
const image1 = /* ... */;
const image2 = /* ... */;
const result = compareImages(image1, image2);
assert(isSame(result) === false);
// diffImage: { data: Buffer; height: number; width: number; }
const diffImage = getDiffImage(result);
```

```js
import * as assert from 'assert';
import {
  compareImages,
  getDiffDimension,
  isSameDimension
} from '@bouzuya/compare-images';

// image1: { data: Buffer; height: number; width: number; }
const image1 = /* ... */;
const image2 = /* ... */;
const result = compareImages(image1, image2);
assert(isSameDimension(result) === false);
// diffDimension: {
//   height: number; // image1.height - image2.height
//   width: number; // image1.width - image2.width
// }
const diffDimension = getDiffDimension(result);
```

## Badges

[![npm version][npm-badge-url]][npm-url]
[![Travis CI][travisci-badge-url]][travisci-url]

[npm-badge-url]: https://img.shields.io/npm/v/@bouzuya/compare-images.svg
[npm-url]: https://www.npmjs.com/package/@bouzuya/compare-images
[travisci-badge-url]: https://img.shields.io/travis/bouzuya/node-compare-images.svg?branch=master
[travisci-url]: https://travis-ci.org/bouzuya/node-compare-images

## License

[MIT](LICENSE)

## Author

[bouzuya][user] &lt;[m@bouzuya.net][email]&gt; ([http://bouzuya.net][url])

[user]: https://github.com/bouzuya
[email]: mailto:m@bouzuya.net
[url]: http://bouzuya.net
