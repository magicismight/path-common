import type { PathObject } from './types';

import { assertPath } from './assert-path';

export function parse(path: string): PathObject {
  assertPath(path);

  const ret = { root: '', dir: '', base: '', ext: '', name: '' };
  if (path.length === 0) return ret;
  let code = path.charCodeAt(0);
  const isAbsolute = code === 47; /* / */
  let start;
  if (isAbsolute) {
    ret.root = '/';
    start = 1;
  } else {
    start = 0;
  }
  let startDot = -1;
  let startPart = 0;
  let end = -1;
  let matchedSlash = true;
  let i = path.length - 1;

  // Track the state of characters (if any) we see before our first dot and
  // after any path separator we find
  let preDotState = 0;

  // Get non-dir info
  for (; i >= start; --i) {
    code = path.charCodeAt(i);
    if (code === 47 /* / */) {
      // If we reached a path separator that was not part of a set of path
      // separators at the end of the string, stop now
      if (!matchedSlash) {
        startPart = i + 1;
        break;
      }
      continue;
    }
    if (end === -1) {
      // We saw the first non-path separator, mark this as the end of our
      // extension
      matchedSlash = false;
      end = i + 1;
    }
    if (code === 46 /* . */) {
      // If this is our first dot, mark it as the start of our extension
      if (startDot === -1) startDot = i;
      else if (preDotState !== 1) preDotState = 1;
    } else if (startDot !== -1) {
      // We saw a non-dot and non-path separator before our dot, so we should
      // have a good chance at having a non-empty extension
      preDotState = -1;
    }
  }

  if (
    startDot === -1 ||
    end === -1 ||
    // We saw a non-dot character immediately before the dot
    preDotState === 0 ||
    // The (right-most) trimmed path component is exactly '..'
    (preDotState === 1 && startDot === end - 1 && startDot === startPart + 1)
  ) {
    if (end !== -1) {
      if (startPart === 0 && isAbsolute)
        ret.base = ret.name = path.slice(1, end);
      else ret.base = ret.name = path.slice(startPart, end);
    }
  } else {
    if (startPart === 0 && isAbsolute) {
      ret.name = path.slice(1, startDot);
      ret.base = path.slice(1, end);
    } else {
      ret.name = path.slice(startPart, startDot);
      ret.base = path.slice(startPart, end);
    }
    ret.ext = path.slice(startDot, end);
  }

  if (startPart > 0) ret.dir = path.slice(0, startPart - 1);
  else if (isAbsolute) ret.dir = '/';

  return ret;
}
