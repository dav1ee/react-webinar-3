import { memo, useMemo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';

import { generatePages } from '../../utils';

import './style.css';

function Pagination({ totalItems, limit, skip, onPaginate }) {
  const cn = bem('Pagination');

  const totalPages = Math.ceil(totalItems / limit);
  const currentPage = skip / limit + 1;

  const pages = useMemo(() => generatePages(totalPages, currentPage), [totalPages, currentPage]);

  return (
    <div className={cn()}>
      {pages.map((page, index) =>
        page === '...' ? (
          <span key={index} className={cn('dots')}>
            ...
          </span>
        ) : (
          <button
            key={index}
            onClick={() => onPaginate(page)}
            className={cn('item', { active: currentPage === page })}
          >
            {page}
          </button>
        ),
      )}
    </div>
  );
}

Pagination.propTypes = {
  totalItems: PropTypes.number,
  limit: PropTypes.number,
  skip: PropTypes.number,
  onPageChange: PropTypes.func,
};

export default memo(Pagination);
