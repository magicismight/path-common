import { assertPath } from './assert-path';

export function dirname(path: string): string {
  assertPath(path);
  if (path.length === 0) return '.';
  let code = path.charCodeAt(0);
  const hasRoot = code === 47; /* / */
  let end = -1;
  let matchedSlash = true;
  for (let i = path.length - 1; i >= 1; --i) {
    code = path.charCodeAt(i);
    if (code === 47 /* / */) {
      if (!matchedSlash) {
        end = i;
        break;
      }
    } else {
      // We saw the first non-path separator
      matchedSlash = false;
    }
  }

  if (end === -1) return hasRoot ? '/' : '.';
  if (hasRoot && end === 1) return '//';
  return path.slice(0, end);
}
