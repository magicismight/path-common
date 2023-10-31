import { assertPath } from './assert-path';
import { normalizeStringPosix } from './normalize-string-posix';

export function normalize(path: string): string {
  assertPath(path);

  if (path.length === 0) return '.';

  const isAbsolute = path.charCodeAt(0) === 47; /* / */
  const trailingSeparator = path.charCodeAt(path.length - 1) === 47; /* / */

  // Normalize the path
  let result = normalizeStringPosix(path, !isAbsolute);

  if (result.length === 0 && !isAbsolute) result = '.';
  if (result.length > 0 && trailingSeparator) result += '/';

  if (isAbsolute) return '/' + result;
  return result;
}
