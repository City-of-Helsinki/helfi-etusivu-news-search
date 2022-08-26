import { Combobox } from 'hds-react';
import type { ComboboxProps } from 'hds-react';
import { useEffect } from 'react';

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
  setValue: Function;
  value: OptionType[];
  clearButtonAriaLabel?: string;
  selectedItemRemoveButtonAriaLabel?: string;
  toggleButtonAriaLabel?: string;
};

export const Dropdown = ({
  aggregations,
  indexKey,
  label,
  setQuery,
  setValue,
  value,
  clearButtonAriaLabel = Drupal.t('Clear selection'),
  selectedItemRemoveButtonAriaLabel = Drupal.t('Remove item'),
  toggleButtonAriaLabel = Drupal.t('Open the combobox'),
  ...rest
}: DropdownProps) => {
  const options: OptionType[] = useAggregations(aggregations, indexKey);

  useEffect(() => {
    if (!value || !value.length) {
      setQuery({ value: null });
    } else {
      setQuery({ value: value.map((option: any) => option.value) });
    }
  }, [value, setQuery]);

  return (
    <div className="news-form__filter">
      <Combobox
        clearButtonAriaLabel={clearButtonAriaLabel}
        label={label}
        options={options}
        onChange={(value: any) => {
          setValue(value);
        }}
        multiselect={true}
        selectedItemRemoveButtonAriaLabel={selectedItemRemoveButtonAriaLabel}
        toggleButtonAriaLabel={toggleButtonAriaLabel}
        value={value}
      />
    </div>
  );
};

export default Dropdown;
