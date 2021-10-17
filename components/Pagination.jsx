import React from 'react'

import ChevronRight from './Icons/ChevronRight'
import ChevronDoubleRight from './Icons/ChevronDoubleRight'
import ChevronLeft from './Icons/ChevronLeft'
import ChevronDoubleLeft from './Icons/ChevronDoubleLeft'

function Pagination({
  setPageSize,
  gotoPage,
  previousPage,
  nextPage,
  canPreviousPage,
  canNextPage,
  pageCount,
  pageIndex,
  pageSize,
  pageOptions
}) {
  return (
    <>
      <div className='flex justify-center items-center space-x-4 py-2 flex-col md:flex-row gap-2 md:gap-0'>
        <div className='flex justify-center'>
          <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
            <ChevronDoubleLeft />
          </button>{' '}
          <button onClick={() => previousPage()} disabled={!canPreviousPage}>
            <ChevronLeft />
          </button>{' '}
          <button onClick={() => nextPage()} disabled={!canNextPage}>
            <ChevronRight />
          </button>{' '}
          <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
            <ChevronDoubleRight />
          </button>{' '}
        </div>
        <span>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{' '}
        </span>
        <span>
          | Go to page:{' '}
          <input
            type='number'
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const value = e.target.value
              const goTo = value ? Number(value) - 1 : 0
              gotoPage(goTo)
            }}
            style={{ width: '100px' }}
          />
        </span>{' '}
        <select
          value={pageSize}
          onChange={(e) => setPageSize(Number(e.target.value))}
        >
          {[10, 20, 30, 40, 50].map((perPage) => (
            <option key={perPage} value={perPage}>
              Show {perPage}
            </option>
          ))}
        </select>
      </div>
    </>
  )
}

export default Pagination
