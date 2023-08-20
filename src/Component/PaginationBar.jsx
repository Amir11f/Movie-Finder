import React from 'react'
import { Link } from 'react-router-dom'

function PaginationBar(props) {
  const { currentPage, totalPages, handleClick } = props

  const visiblePages = []
  let minPage = Math.max(1, currentPage - 2)
  let maxPage = Math.min(totalPages, currentPage + 2)

  if (maxPage - minPage < 4) {
    if (currentPage < totalPages / 2) {
      maxPage = Math.min(totalPages, minPage + 4)
    } else {
      minPage = Math.max(1, maxPage - 4)
    }
  }

  for (let i = minPage; i <= maxPage; i++) {
    visiblePages.push(i)
  }

  return (
    <div className="pagination">
      {currentPage > 1 && (
        <Link to={`/page/${currentPage - 1}`} onClick={() => handleClick(currentPage - 1)}>
          <button className="page-link">
            <i className="fas fa-chevron-left"></i>
          </button>
        </Link>
      )}

      {minPage > 1 && <span className="page-link">...</span>}

      {visiblePages.map((page) => (
        <Link to={`/page/${page}`} key={page} onClick={() => handleClick(page)}>
          <button className={`page-link${currentPage === page ? ' active' : ''}`}>{page}</button>
        </Link>
      ))}

      {maxPage < totalPages && <span className="page-link">...</span>}

      {currentPage < totalPages && (
        <Link to={`/page/${currentPage + 1}`} onClick={() => handleClick(currentPage + 1)}>
          <button className="page-link">
            <i className="fas fa-chevron-right"></i>
          </button>
        </Link>
      )}
    </div>
  )
}

export default PaginationBar
