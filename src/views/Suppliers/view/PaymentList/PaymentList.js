// ** React Imports
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

// ** translation
import { useTranslation } from 'react-i18next'

// ** Third Party Components
import ReactPaginate from 'react-paginate'
import DataTable from 'react-data-table-component'
import { ChevronDown, Eye,  Download  } from 'react-feather'

// ** Reactstrap Imports
import { Card, UncontrolledTooltip } from 'reactstrap'

// ** Store & Actions
import { getAllData, getPaginatedData } from '../../../Payments/store'
import { useDispatch, useSelector } from 'react-redux'

// ** Styles
import '@styles/react/apps/app-invoice.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'

const PaymentList = () => {

  const { t } = useTranslation()

  // ** Store Vars
  const dispatch = useDispatch()
  const store = useSelector(state => state.payments)

  // ** States
  const [value] = useState('')
  const [rowsPerPage] = useState(6)
  const [sort, setSort] = useState('desc')
  const [sortColumn, setSortColumn] = useState('date')
  const [currentPage, setCurrentPage] = useState(1)

  const columns = [
    {
      name: t('payments.table.reference'),
      minWidth: '107px',
      selector: row => row.reference,
      cell: row => <Link className='fw-bolder' to={"#"}>{`#${row.reference}`}</Link>
    },
    {
      name: t('payments.table.date'),
      minWidth: '200px',
      sortable: true,
      sortField: 'date',
      cell: row => row.date
    },
    {
      name: t('payments.table.totalAmount'),
      sortable: true,
      sortField: 'total',
      minWidth: '150px',
      selector: row => row.payedAmount,
      cell: row => <span>${row.payedAmount || 0}</span>
    },
    {
      name: '',
      minWidth: '110px',
      cell: row => (
        <div className='column-action d-flex align-items-center'>
          <Link className='text-body' to={"#"} id={`pw-tooltip-${row.id}`}>
            <Eye size={17} className='mx-1' />
          </Link>
          <UncontrolledTooltip placement='top' target={`pw-tooltip-${row.id}`}>
            {t('app.tooltips.view')}
          </UncontrolledTooltip>
  
          <Download className='text-body cursor-pointer' size={17} id={`download-tooltip-${row.id}`} />
          <UncontrolledTooltip placement='top' target={`download-tooltip-${row.id}`}>
           {t('app.tooltips.download')}
          </UncontrolledTooltip>
        </div>
      )
    }
  ]

  useEffect(() => {
    dispatch( getAllData() )
    dispatch(      
      getPaginatedData({
        sort,
        sortColumn: sortColumn,
        q: value,
        page: currentPage,
        perPage: rowsPerPage
      })      
    )
  }, [dispatch, store.payments.length])

  const dataToRender = () => {
    const filters = {
      q: value
    }

    const isFiltered = Object.keys(filters).some(function (k) {
      return filters[k].length > 0
    })

    if (store.payments.length > 0) {
      return store.payments.slice(0, rowsPerPage)
    } else if (store.payments.length === 0 && isFiltered) {
      return []
    } else {
      return store.payments.slice(0, rowsPerPage)
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
        sortColumn: column.sortField
      })
    )
  }

  const handlePagination = page => {
    dispatch(      
      getPaginatedData({
        sort: sort,
        sortColumn: sortColumn,
        page: currentPage,
        perPage: rowsPerPage
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

export default PaymentList
