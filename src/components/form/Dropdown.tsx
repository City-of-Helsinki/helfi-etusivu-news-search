import { Combobox } from 'hds-react';
import type { ComboboxProps } from 'hds-react';
import { useEffect, useState } from 'react';

import useAggregations from '../../hooks/useAggregations';
import type { Aggregations } from '../../types/Aggregations';
import OptionType from '../../types/OptionType';

type DropdownProps = Omit<
  ComboboxProps<OptionType>,
  'options' | 'clearButtonAriaLabel' | 'selectedItemRemoveButtonAriaLabel' | 'toggleButtonAriaLabel'
> & {
  aggregations: Aggregations;
  componentId: string;
  initialValue: any;
  label: string;
  weight?: number;
  indexKey: string;
  initialize: Function;
  setQuery: Function;
  clearButtonAriaLabel?: string;
  selectedItemRemoveButtonAriaLabel?: string;
  toggleButtonAriaLabel?: string;
};

export const Dropdown = ({
  aggregations,
  componentId,
  indexKey,
  initialize,
  initialValue,
  label,
  weight,
  placeholder,
  setQuery,
  clearButtonAriaLabel = Drupal.t('Clear selection', {}, { context: 'News archive clear button aria label' }),
  selectedItemRemoveButtonAriaLabel = Drupal.t('Remove item', {}, { context: 'News archive remove item aria label' }),
  toggleButtonAriaLabel = Drupal.t('Open the combobox', {}, { context: 'News archive open dropdown aria label' }),
}: DropdownProps) => {
  const options: OptionType[] = useAggregations(aggregations, indexKey);
  const [loading, setLoading] = useState<boolean>(true);
  const [defaultValue, setDefaultValue] = useState<OptionType[]>([]);

  useEffect(() => {
    if (loading && aggregations && options) {
      const values = initialValue.map((value: string) =>
        options.find((option) => option.value.toLocaleLowerCase() === value)
      );

      setDefaultValue(values);
      setQuery({
        value: values.map((value: OptionType) => value.value),
      });
      initialize(componentId);
      setLoading(false);
    }
  }, [aggregations, componentId, initialize, initialValue, loading, options, setQuery]);

  return (
    <div className='news-form__filter'>
      <div
        className='news-form__filter-container'
        style={weight ? ({ '--menu-z-index': weight++ } as React.CSSProperties) : {}}
      >
        {loading ? (
          <Combobox
            className='news-form__combobox'
            clearButtonAriaLabel={clearButtonAriaLabel}
            disabled={true}
            label={label}
            options={[]}
            placeholder={placeholder}
            multiselect={true}
            selectedItemRemoveButtonAriaLabel={selectedItemRemoveButtonAriaLabel}
            toggleButtonAriaLabel={toggleButtonAriaLabel}
            theme={{
              '--focus-outline-color': 'var(--hdbt-color-black)',
              '--multiselect-checkbox-background-selected': 'var(--hdbt-color-black)',
              '--placeholder-color': 'var(--hdbt-color-black)',
            }}
          />
        ) : (
          <Combobox
            className='news-form__combobox'
            clearButtonAriaLabel={clearButtonAriaLabel}
            defaultValue={defaultValue}
            label={label}
            options={options}
            onChange={(value: OptionType[]) => {
              setQuery({
                value: value.map((value: OptionType) => value.value),
              });
            }}
            placeholder={placeholder}
            multiselect={true}
            selectedItemRemoveButtonAriaLabel={selectedItemRemoveButtonAriaLabel}
            toggleButtonAriaLabel={toggleButtonAriaLabel}
            theme={{
              '--focus-outline-color': 'var(--hdbt-color-black)',
              '--multiselect-checkbox-background-selected': 'var(--hdbt-color-black)',
              '--placeholder-color': 'var(--hdbt-color-black)',
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Dropdown;
