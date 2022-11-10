import { OptionType } from '../types/OptionType';

export const optionsToValue = (options: OptionType[]) => {
  return options.map((option) => option.value);
};
