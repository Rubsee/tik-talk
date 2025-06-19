import { MaskitoOptions } from '@maskito/core';

export const emailMask: MaskitoOptions = {
  mask: (state) => {
    const raw = state.value;

    const regex = /^[\p{L}\d.\-@]*$/u;

    return regex.test(raw) ? /^([\p{L}\d.\-]+@?[\p{L}\d.\-]*$)/u : /.^/; // запрет на ввод
  },
  preprocessors: [],
  postprocessors: [],
};
