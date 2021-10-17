import { useMemo } from 'react'
import { useTable, usePagination, useSortBy } from 'react-table'
import Pagination from './Pagination'

function Table ({ columns, data }) {
  const dataTable = useMemo(() => data)

  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page, // Instead of using 'rows', we'll use page,
    // which has only the rows for the active page

    // The rest of these things are super handy, too ;)
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize }
  } = useTable(
    {
      columns,
      data: dataTable
    },
    useSortBy,
    usePagination
  )

  const IconSort = ({ column }) => {
    const desc = column.isSortedDesc ? ' ▼' : ' ▲'

    return (
      <span>
        {
          column.isSorted ? desc : ''
        }
      </span>
    )
  }

  return (
    <>
      <table
        {...getTableProps()}
        className='table-auto w-full text-left whitespace-no-wrap'
      >
        <thead>
          {headerGroups.map((headerGroup, ig) => (
            <tr key={ig} {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column, index) => (
                <th
                  className='px-4 py-3 title-font tracking-wider font-medium text-envy-900 text-sm bg-sandal-100 last:hidden md:last:block'
                  key={index}
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                >
                  {column.render('Header')}
                  <IconSort column={column} />
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row)
            return (
              <tr
                className='border-b-2 border-sandal-200'
                key={i}
                {...row.getRowProps()}
              >
                {row.cells.map((cell, index) => {
                  if (cell.column.id === 'link') {
                    return (
                      <td
                        className='px-4 py-3'
                        key={index}
                        {...cell.getCellProps()}
                      >
                        <a
                          href={cell.value}
                          title={cell.value}
                          className='text-blue-400'
                          target='_blank'
                          rel='noopener noreferrer'
                        >
                          {cell.render('Cell')}
                        </a>
                      </td>
                    )
                  }

                  if (cell.column.id === 'comments') {
                    return (
                      <td
                        className='px-4 py-3 text-gray-600 text-left'
                        key={index}
                        {...cell.getCellProps()}
                      >
                        {cell.render('Cell')}
                      </td>
                    )
                  }

                  if (cell.column.id === 'labels') {
                    return (
                      <td key={index} className='text-justify'>
                        {cell.value.map((item) => (
                          <span
                            key={item}
                            className='text-green-600 bg-green-200 text-xs font-thin inline-block py-1 px-2 rounded-full last:mr-0 mr-1'
                          >
                            {item}
                          </span>
                        ))}
                      </td>
                    )
                  }

                  if (cell.column.id === 'state') {
                    return (
                      <td
                        className='px-4 py-3 hidden md:block'
                        key={index}
                        {...cell.getCellProps()}
                      >
                        {cell.render('Cell')}
                      </td>
                    )
                  }

                  return (
                    <td
                      className='px-4 py-3'
                      key={index}
                      {...cell.getCellProps()}
                    >
                      {cell.render('Cell')}
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>

      <Pagination
        canPreviousPage={canPreviousPage}
        canNextPage={canNextPage}
        pageOptions={pageOptions}
        pageCount={pageCount}
        gotoPage={gotoPage}
        nextPage={nextPage}
        previousPage={previousPage}
        setPageSize={setPageSize}
        pageIndex={pageIndex}
        pageSize={pageSize}
      />
    </>
  )
}

export default Table
