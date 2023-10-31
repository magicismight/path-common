import type { Path } from './types';
import { resolve } from './resolve';
import { normalize } from './normalize';
import { isAbsolute } from './is-absolute';
import { join } from './join';
import { relative } from './relative';
import { dirname } from './dirname';
import { basename } from './basename';
import { extname } from './extname';
import { format } from './format';
import { parse } from './parse';

const sep = '/';
const delimiter = ':';
const win32 = null;
const posix = null;

export {
  resolve,
  normalize,
  isAbsolute,
  join,
  relative,
  dirname,
  basename,
  extname,
  format,
  parse,
  sep,
  delimiter,
  win32,
  posix
};

export type { Path };
