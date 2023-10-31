import type { PathObject } from './types';

export function format(pathObject: Partial<PathObject>): string {
  if (pathObject === null || typeof pathObject !== 'object') {
    throw new TypeError(
      'The "pathObject" argument must be of type Object. Received type ' +
        typeof pathObject
    );
  }
  const sep = '/';

  const dir = pathObject.dir || pathObject.root;
  const base =
    pathObject.base || (pathObject.name || '') + (pathObject.ext || '');
  if (!dir) {
    return base;
  }
  if (dir === pathObject.root) {
    return dir + base;
  }
  return dir + sep + base;
}
