import { assertPath } from './assert-path';
import { normalize } from './normalize';

export function join(...paths: string[]): string {
  if (arguments.length === 0) return '.';
  let joined;

  for (const arg of arguments) {
    assertPath(arg);
    if (arg.length > 0) {
      if (joined === undefined) joined = arg;
      else joined += '/' + arg;
    }
  }

  if (joined === undefined) return '.';
  return normalize(joined);
}
