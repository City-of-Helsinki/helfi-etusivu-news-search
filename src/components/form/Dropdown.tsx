import { Combobox } from 'hds-react';
import type { ComboboxProps } from 'hds-react';
import { useEffect } from 'react';

import useAggregations from '../../hooks/useAggregations';
import type { Aggregations } from '../../types/Aggregations';
import OptionType from '../../types/OptionType';

type DropdownProps = Omit<
  ComboboxProps<OptionType>,
  'options' | 'clearButtonAriaLabel' | 'selectedItemRemoveButtonAriaLabel' | 'toggleButtonAriaLabel'
> & {
  aggregations: Aggregations;
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
  clearButtonAriaLabel = Drupal.t('Clear selection', {}, { context: 'News archive clear button aria label' }),
  selectedItemRemoveButtonAriaLabel = Drupal.t('Remove item', {}, { context: 'News archive remove item aria label' }),
  toggleButtonAriaLabel = Drupal.t('Open the combobox', {}, { context: 'News archive open dropdown aria label' }),
  ...rest
}: DropdownProps) => {
  const options: OptionType[] = useAggregations(aggregations, indexKey);

  useEffect(() => {
    if (!value || !value.length) {
      setQuery({ value: null });
    } else {
      setQuery({ value: value.map((option: OptionType) => option.value) });
    }
  }, [value, setQuery]);

  return (
    <div className="news-form__filter">
      <Combobox
        clearButtonAriaLabel={clearButtonAriaLabel}
        label={label}
        options={options}
        onChange={(value: OptionType[]) => {
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
