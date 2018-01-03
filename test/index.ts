import { Test, run } from 'beater';
import { tests as compareImagesTests } from './compare-images';
import { tests as newImageTests } from './new-image';

const tests: Test[] = ([] as Test[])
  .concat(compareImagesTests)
  .concat(newImageTests);

run(tests).catch(() => process.exit(1));
