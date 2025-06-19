import type { MaskitoOptions } from '@maskito/core';

export const phoneMask: MaskitoOptions = {
  mask: [
    '+',
    '7',
    ' ',
    '(',
    /\d/,
    /\d/,
    /\d/,
    ')',
    ' ',
    /\d/,
    /\d/,
    /\d/,
    '-',
    /\d/,
    /\d/,
    '-',
    /\d/,
    /\d/,
  ],
};
