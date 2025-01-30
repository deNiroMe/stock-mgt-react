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
import { useDispatch, useSelector } from 'react-redux'
import { getPaginatedOperations } from '../../store/operations'

// ** Styles
import '@styles/react/apps/app-invoice.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'

const Purchases = ({active}) => {

  const { t } = useTranslation()

  // ** Store Vars
  const dispatch = useDispatch()
  const store = useSelector(state => state.operations)

  // ** States
  const [value] = useState('')
  const [rowsPerPage] = useState(7)
  const [sort, setSort] = useState('desc')
  const [currentPage, setCurrentPage] = useState(1)
  const [sortColumn, setSortColumn] = useState('id')

  const columns = [
    {
      name: t('statementLines.table.purchase'),
      minWidth: '15%',
      selector: row => row.referenceId,
      cell: row => <span>{`REF-${row.id}`}</span>
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
    dispatch(      
      getPaginatedOperations({
        sort: sort,
        page: currentPage,
        perPage: rowsPerPage,
        sortColumn: sortColumn,
        type: 'PURCHASE'
      })      
    )
  }, [dispatch, active])

  const dataToRender = () => {
    const filters = {
      q: value
    }
    const isFiltered = Object.keys(filters).some(function (k) {
      return filters[k].length > 0
    })
    if (store.filteredPurchases.length > 0) {
      return store.filteredPurchases
    } else if (store.filteredPurchases.length === 0 && isFiltered) {
      return []
    } else {
      return store.filteredPurchases.slice(0, rowsPerPage)
    }
  }

  const handleSort = (column, sortDirection) => {
    setSort(sortDirection)
    setSortColumn(column.sortField)
    dispatch(
      getPaginatedOperations({
        page: currentPage,
        sort: sortDirection,
        perPage: rowsPerPage,
        sortColumn: column.sortField,
        type: 'PURCHASE'
      })
    )
  }

  const handlePagination = page => {
    setCurrentPage(page.selected + 1)
    dispatch(      
      getPaginatedOperations({
        sort: sort,
        page: page.selected + 1,
        perPage: rowsPerPage,
        sortColumn: sortColumn,
        type: 'PURCHASE'
      })      
    )
  }

  const CustomPagination = () => {    
    const count = Number(Math.ceil(store.totalPurchases / rowsPerPage)) 
    return (
      <ReactPaginate
        nextLabel={''}
        previousLabel={''}
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
            pagination
            sortServer
            paginationServer
            subHeader={false}
            columns={columns}
            onSort={handleSort}
            data={dataToRender()}
            paginationComponent={CustomPagination}
            sortIcon={<ChevronDown size={10} />}
          />
        </div>
      </Card>
    </div>
  )
}

export default Purchases
