import { Button, IconCross } from 'hds-react';
import { MouseEventHandler } from 'react';

import type OptionType from '../types/OptionType';

type SelectionsContainerProps = {
  clearSelection: Function;
  clearSelections: MouseEventHandler<HTMLButtonElement>;
  filters: filtersType;
};

type filtersType = {
  topics: OptionType[];
  neighbourhoods: OptionType[];
  groups: OptionType[];
};

const SelectionsContainer = ({ clearSelection, clearSelections, filters }: SelectionsContainerProps) => {
  if (!filters.topics.length && !filters.neighbourhoods.length && !filters.groups.length) {
    return null;
  }

  const transformedFilters: any = [];
  const { t } = Drupal;
  for (const [key, options] of Object.entries(filters)) {
    options.forEach((option: OptionType) => {
      transformedFilters.push(
        <li
          className="content-tags__tags__tag content-tags__tags--interactive"
          onClick={() => clearSelection(option, key)}
        >
          <Button
            aria-label={t('Remove item', {}, { context: 'News archive remove item aria label' })}
            className="news-form__remove-selection-button"
            iconRight={<IconCross />}
            variant="supplementary"
          >
            {option.value}
          </Button>
        </li>
      );
    });
  }

  return (
    <div className="news-form__selections-wrapper">
      <ul className="news-form__selections-container content-tags__tags">
        {transformedFilters}
        <li className="news-form__clear-all">
          <Button
            className="news-form__clear-all-button"
            iconLeft={<IconCross className="news-form__clear-all-icon" />}
            onClick={clearSelections}
            variant="supplementary"
          >
            {Drupal.t('Clear selections', {}, { context: 'News archive clear selections' })}
          </Button>
        </li>
      </ul>
    </div>
  );
};

export default SelectionsContainer;