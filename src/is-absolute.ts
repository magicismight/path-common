import { assertPath } from './assert-path';

export function isAbsolute(path: string): boolean {
  assertPath(path);
  return path.length > 0 && path.charCodeAt(0) === 47 /* / */;
}
