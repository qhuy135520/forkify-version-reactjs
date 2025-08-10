// components/Pagination.js
export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  searchResults,
}) {
  if (totalPages <= 1) return <div className='pagination'></div>

  return (
    <div className='pagination'>
      {currentPage > 1 && (
        <button
          className='btn--inline pagination__btn--prev'
          onClick={() => onPageChange(currentPage - 1, searchResults)}
        >
          <svg className='search__icon'>
            <use href='assets/images/icons.svg#icon-arrow-left'></use>
          </svg>
          <span>Page {currentPage - 1}</span>
        </button>
      )}

      {currentPage < totalPages && (
        <button
          className='btn--inline pagination__btn--next'
          onClick={() => onPageChange(currentPage + 1, searchResults)}
        >
          <span>Page {currentPage + 1}</span>
          <svg className='search__icon'>
            <use href='assets/images/icons.svg#icon-arrow-right'></use>
          </svg>
        </button>
      )}
    </div>
  )
}
