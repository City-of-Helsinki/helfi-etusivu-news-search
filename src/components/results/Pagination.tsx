import { IconAngleLeft, IconAngleRight } from 'hds-react';
import React, { Fragment, useEffect, useState } from 'react';

import SearchComponents from '../../enum/SearchComponents';
import useSearchParams from '../../hooks/useSearchParams';

type PaginationProps = {
  pages: number;
  totalPages: number;
  currentPage: number;
  setPage: Function;
  setSize: Function;
};

export const Pagination = ({ pages, totalPages, currentPage, setPage, setSize }: PaginationProps) => {
  const [page, setCurrentPage] = useState<number>(currentPage);
  const [initialParams, updateParams] = useSearchParams();

  useEffect(() => {
    if (initialParams.page) {
      setCurrentPage(Number(initialParams.page));
    }
  }, []);

  const updatePage = (e: React.MouseEvent<HTMLElement>, index: number) => {
    e.preventDefault();
    setPage(index);
    updateParams({
      page: index + 1,
    });
  };

  const getPagination = (current: number, pages: number, totalPages: number) => {
    const pagesPerSide = (pages - 1) / 2;
    let pagesLeft = pagesPerSide * 2;
    let prevPages: Array<number> = [];
    let nextPages: Array<number> = [];

    if (pagesPerSide > 0) {
      for (let i = current - 1; prevPages.length < pagesPerSide && i >= 0; i--) {
        prevPages.push(i);
        pagesLeft--;
      }

      for (let i = current + 1; pagesLeft > 0 && i < totalPages; i++) {
        nextPages.push(i);
        pagesLeft--;
      }
    }

    prevPages.reverse();

    return {
      prevPages,
      nextPages,
    };
  };

  const { prevPages, nextPages } = getPagination(page, pages, totalPages);
  const prevPageExists = page - 1 >= 0;
  const nextPageExists = page + 1 < totalPages;
  const firstWithinRange = prevPages.includes(0) || !prevPages.length;
  const lastWithinRange = nextPages.includes(totalPages - 1) || !nextPages.length;

  if (!Number.isFinite(totalPages)) {
    return null;
  }

  return (
    <div className='hds-pagination-container'>
      <nav
        className='hds-pagination pager'
        role='navigation'
        aria-label={Drupal.t('Pagination', {}, { context: 'Pagination aria-label' })}
        data-next={Drupal.t('Next', {}, { context: 'Pagination next page link text' })}
      >
        {prevPageExists ? (
          <a
            aria-label={
              Drupal.t('Go to previous page number', {}, { context: 'Pagination previous page link title' }) +
              ` ${page}`
            }
            className='hds-button hds-pagination__button-prev'
            href={`?${SearchComponents.RESULTS}=${page}`}
            onClick={(e) => {
              if (prevPageExists) {
                updatePage(e, page - 1);
              }
            }}
            title={
              Drupal.t('Go to previous page number', {}, { context: 'Pagination previous page link title' }) +
              ` ${page}`
            }
            type='button'
            rel='prev'
            role='button'
          >
            <IconAngleLeft />
            <span aria-hidden='true' className='hds-pagination__button-prev-label'>
              {Drupal.t('Previous', {}, { context: 'Pagination previous page link text' })}
            </span>
          </a>
        ) : (
          <button
            className='hds-button hds-pagination__button-prev'
            disabled
            title={Drupal.t('Go to previous page', {}, { context: 'Pagination previous page link title' })}
            type='button'
          >
            <IconAngleLeft />
            <span aria-hidden='true' className='hds-pagination__button-prev-label'>
              {Drupal.t('Previous', {}, { context: 'Pagination previous page link text' })}
            </span>
          </button>
        )}
        <ul className='pager__items js-pager__items hds-pagination__pages'>
          {!firstWithinRange && (
            <Fragment>
              <li>
                <a
                  href={`?${SearchComponents.RESULTS}=1`}
                  onClick={(e) => {
                    if (prevPageExists) {
                      updatePage(e, 0);
                    }
                  }}
                  className='hds-pagination__item-link'
                >
                  1
                </a>
              </li>
              {prevPages[0] - 1 > 0 && (
                <li className='pager__item pager__item--ellipsis' role='presentation'>
                  <span className='hds-pagination__item-ellipsis'>&hellip;</span>
                </li>
              )}
            </Fragment>
          )}
          {prevPages.map((pageIndex, i) => (
            <li className='pager__item' key={i}>
              <a
                aria-label={Drupal.t('Go to page @key', { '@key': pageIndex + 1 })}
                href={`?${SearchComponents.RESULTS}=${pageIndex + 1}`}
                className='hds-pagination__item-link'
                onClick={(e) => updatePage(e, pageIndex)}
                key={pageIndex}
              >
                {pageIndex + 1}
              </a>
            </li>
          ))}
          <li className='pager__item is-active'>
            <a
              href={`?${SearchComponents.RESULTS}=${page + 1}`}
              className='hds-pagination__item-link hds-pagination__item-link--active'
            >
              {page + 1}
            </a>
          </li>
          {nextPages.map((pageIndex, i) => (
            <li className='pager__item' key={i}>
              <a
                aria-label={Drupal.t('Go to page @key', { '@key': pageIndex + 1 })}
                href={`?${SearchComponents.RESULTS}=${pageIndex + 1}`}
                className='hds-pagination__item-link'
                onClick={(e) => updatePage(e, pageIndex)}
                key={pageIndex}
              >
                {pageIndex + 1}
              </a>
            </li>
          ))}
          {!lastWithinRange && (
            <Fragment>
              {nextPages[nextPages.length - 1] + 1 !== totalPages && (
                <li>
                  <span className='hds-pagination__item-ellipsis'>...</span>
                </li>
              )}
              <li>
                <a
                  href={`?${SearchComponents.RESULTS}=${totalPages - 1}`}
                  onClick={(e) => updatePage(e, totalPages - 1)}
                  className='hds-pagination__item-link'
                >
                  {totalPages}
                </a>
              </li>
            </Fragment>
          )}
        </ul>
        {nextPageExists ? (
          <a
            aria-label={
              Drupal.t('Go to next page number', {}, { context: 'Pagination next page link title' }) + ` ${page + 2}`
            }
            className='hds-button hds-pagination__button-next'
            href={`?${SearchComponents.RESULTS}=${page + 2}`}
            onClick={(e) => {
              if (nextPageExists) {
                updatePage(e, page + 1);
              }
            }}
            title={
              Drupal.t('Go to next page number', {}, { context: 'Pagination next page link title' }) + ` ${page + 2}`
            }
            type='button'
            rel='next'
            role='button'
          >
            <span aria-hidden='true' className='hds-pagination__button-next-label'>
              {Drupal.t('Next', {}, { context: 'Pagination next page link text' })}
            </span>
            <IconAngleRight />
          </a>
        ) : (
          <button
            className='hds-button hds-pagination__button-next'
            disabled
            title={Drupal.t('Go to next page', {}, { context: 'Pagination next page link title' })}
            type='button'
          >
            <span aria-hidden='true' className='hds-pagination__button-next-label'>
              {Drupal.t('Next', {}, { context: 'Pagination next page link text' })}
            </span>
            <IconAngleRight />
          </button>
        )}
      </nav>
    </div>
  );
};

export default Pagination;
