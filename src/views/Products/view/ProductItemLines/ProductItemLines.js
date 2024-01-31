// ** React Imports
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

// ** translation
import { useTranslation } from 'react-i18next'

// ** Third Party Components
import ReactPaginate from 'react-paginate'
import DataTable from 'react-data-table-component'
import { ChevronDown, Eye } from 'react-feather'

// ** Reactstrap Imports
import { Card, UncontrolledTooltip } from 'reactstrap'

// ** Store & Actions
import { getAllData, getPaginatedData } from '../../../ItemLines/store'
import { useDispatch, useSelector } from 'react-redux'

// ** Styles
import '@styles/react/apps/app-invoice.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'

const ProductItemLines = ({type}) => {

  const { t } = useTranslation()

  // ** Store Vars
  const dispatch = useDispatch()
  const store = useSelector(state => state.items)

  // ** States
  const [value] = useState('')
  const [rowsPerPage] = useState(7)
  const [sort, setSort] = useState('desc')
  const [sortColumn, setSortColumn] = useState('date')
  const [currentPage, setCurrentPage] = useState(1)

  const label = type == 'PURCHASE' ? t('statementLines.table.purchase') : t('statementLines.table.invoice')

  const columns = [
    {
      name: label,
      minWidth: '15%',
      selector: row => row.referenceId,
      cell: row => <span>{`REF${row.referenceId}`}</span>
    },
    {
      name: t('statementLines.table.date'),
      minWidth: '30%',
      sortable: true,
      sortField: 'date',
      cell: row => row.date
    },
    {
      name: t('statementLines.table.price'),
      sortable: true,
      sortField: 'total',
      minWidth: '20%',
      selector: row => row.price,
      cell: row => <span>${row.price || 0}</span>
    },
    {
      name: t('statementLines.table.quantity'),
      sortable: true,
      sortField: 'total',
      minWidth: '20%',
      selector: row => row.quantity,
      cell: row => <span>${row.quantity || 0}</span>
    },
    {
      name: '',
      minWidth: '15%',
      cell: row => (
        <div className='column-action d-flex align-items-center'>
          <Link className='text-body' to={"#"} id={`pw-tooltip-${row.id}`}>
            <Eye size={17} className='mx-1' />
          </Link>
          <UncontrolledTooltip placement='top' target={`pw-tooltip-${row.id}`}>
            {t('app.tooltips.view')}
          </UncontrolledTooltip>
        </div>
      )
    }
  ]

  useEffect(() => {
    dispatch( getAllData(type) )
    dispatch(      
      getPaginatedData({
        sort,
        sortColumn: sortColumn,
        q: value,
        page: currentPage,
        perPage: rowsPerPage,
        type: type
      })      
    )
  }, [dispatch, store.items.length])

  const dataToRender = () => {
    const filters = {
      q: value
    }

    const isFiltered = Object.keys(filters).some(function (k) {
      return filters[k].length > 0
    })

    if (store.items.length > 0) {
      return store.items.slice(0, rowsPerPage)
    } else if (store.items.length === 0 && isFiltered) {
      return []
    } else {
      return store.items.slice(0, rowsPerPage)
    }
  }

  const handleSort = (column, sortDirection) => {
    setSort(sortDirection)
    setSortColumn(column.sortField)
    dispatch(
      getAllData({
        q: value,
        page: currentPage,
        sort: sortDirection,
        perPage: rowsPerPage,
        sortColumn: column.sortField,        
        type: type
      })
    )
  }

  const handlePagination = page => {
    dispatch(      
      getPaginatedData({
        sort: sort,
        sortColumn: sortColumn,
        page: currentPage,
        perPage: rowsPerPage,
        type: type
      })      
    )
    setCurrentPage(page.selected + 1)
  }

  const CustomPagination = () => {
    
    const count = Number(Math.ceil(store.total / rowsPerPage))
    
    return (
      <ReactPaginate
        previousLabel={''}
        nextLabel={''}
        pageCount={count || 1}
        activeClassName='active'
        forcePage={currentPage !== 0 ? currentPage - 1 : 0}
        onPageChange={page => handlePagination(page)}
        pageClassName={'page-item'}
        nextLinkClassName={'page-link'}
        nextClassName={'page-item next'}
        previousClassName={'page-item prev'}
        previousLinkClassName={'page-link'}
        pageLinkClassName={'page-link'}
        containerClassName={'pagination react-paginate justify-content-end my-2 pe-1'}
      />
    )
  }

  return (
    <div className='invoice-list-wrapper'>
      <Card>
        <div className='invoice-list-dataTable react-dataTable'>
          <DataTable
            noHeader
            subHeader
            sortServer
            pagination
            responsive
            paginationServer
            columns={columns}
            onSort={handleSort}
            sortIcon={<ChevronDown />}
            className='react-dataTable'
            paginationComponent={CustomPagination}
            data={dataToRender()}
          />
        </div>
      </Card>
    </div>
  )
}

export default ProductItemLines
