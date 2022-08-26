import { Combobox } from 'hds-react';
import type { ComboboxProps } from 'hds-react';

import useAggregations from '../../hooks/useAggregations';
import OptionType from '../../types/OptionType';

type DropdownProps = Omit<
  ComboboxProps<OptionType>,
  'options' | 'clearButtonAriaLabel' | 'selectedItemRemoveButtonAriaLabel' | 'toggleButtonAriaLabel'
> & {
  aggregations: any;
  label: string;
  indexKey: string;
  setQuery: Function;
  clearButtonAriaLabel?: string;
  selectedItemRemoveButtonAriaLabel?: string;
  toggleButtonAriaLabel?: string;
};

export const Dropdown = ({
  aggregations,
  indexKey,
  label,
  setQuery,
  clearButtonAriaLabel = Drupal.t('Clear selection'),
  selectedItemRemoveButtonAriaLabel = Drupal.t('Remove item'),
  toggleButtonAriaLabel = Drupal.t('Open the combobox'),
  ...rest
}: DropdownProps) => {
  const options: OptionType[] = useAggregations(aggregations, indexKey);

  return (
    <Combobox
      clearButtonAriaLabel={clearButtonAriaLabel}
      label={label}
      options={options}
      onChange={(value: any) => {
        setQuery({ value: value.map((option: any) => option.value) });
      }}
      multiselect={true}
      selectedItemRemoveButtonAriaLabel={selectedItemRemoveButtonAriaLabel}
      toggleButtonAriaLabel={toggleButtonAriaLabel}
    />
  );
};

export default Dropdown;
