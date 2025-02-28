// ** React Imports
import { useState, useEffect, Fragment } from 'react'
import { Link } from 'react-router-dom'

// ** Store & Actions
import { getAllData, getPaginatedData } from './store'
import { useSelector, useDispatch } from 'react-redux'

// ** Third Party Components
import { ChevronDown, FileText, Archive } from 'react-feather'
import ReactPaginate from 'react-paginate'
import DataTable from 'react-data-table-component'
import { useTranslation } from 'react-i18next'

// ** Reactstrap Imports
import { Card, Row, Col,  Input, Button, UncontrolledTooltip } from 'reactstrap'

// ** Table Header
const CustomHeader = ({ handlePerPage, rowsPerPage, handleFilter, searchTerm, t }) => {
  
  return (
    <div className='invoice-list-table-header w-100 me-1 ms-50 mt-2 mb-75'>
      <Row>
        <Col xl='6' className='d-flex align-items-center p-0'>
          <div className='d-flex align-items-center w-100'>
            <label htmlFor='rows-per-page'>{t('app.tables.show')}</label>
            <Input
              className='mx-50'
              type='select'
              id='rows-per-page'
              value={rowsPerPage}
              onChange={handlePerPage}
              style={{ width: '5rem' }}
            >
              <option value='10'>10</option>
              <option value='25'>25</option>
              <option value='50'>50</option>
            </Input>
            <label htmlFor='rows-per-page'>{t('app.tables.entries')}</label>
          </div>
        </Col>
        <Col
          xl='6'
          className='d-flex align-items-sm-center justify-content-xl-end justify-content-start flex-xl-nowrap flex-wrap flex-sm-row flex-column pe-xl-1 p-0 mt-xl-0 mt-1'
        >
          <div className='d-flex align-items-center mb-sm-0 mb-1 me-1'>
            <label className='mb-0' htmlFor='search-invoice'>
             {t('app.tables.search')}
            </label>
            <Input
              id='search-invoice'
              className='ms-50 w-100'
              type='text'
              value={searchTerm}
              onChange={e => handleFilter(e.target.value)}
            />
          </div>

          <div className='d-flex align-items-center table-header-actions'>           
            <Button className='add-new-user' color='primary' >
              {t('invoices.form.add')}
            </Button>
          </div>
        </Col>
      </Row>
    </div>
  )
}

const Sales = () => {

  // Table
  const [sort, setSort] = useState('desc')
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [sortColumn, setSortColumn] = useState('reference')
  const [rowsPerPage, setRowsPerPage] = useState(10)

  // ** Store Vars
  const dispatch = useDispatch()
  const store = useSelector(state => state.invoices)

  const { t } = useTranslation()

  const columns = [
    {
      name: t('invoices.table.reference'),
      width: '20%',
      sortable: true,
      selector: row => row.reference
    },
    {
      name: t('invoices.table.date'),
      width: '20%',
      sortable: true,
      selector: row => row.date
    },
    {
      name: t('invoices.table.client'),
      width: '20%',
      sortable: true,
      selector: row => row.client.name
    },
    {
      name: t('invoices.table.totalAmount'),
      width: '15%',
      sortable: true,
      selector: row => row.totalAmount
    },
    {
      name: t('invoices.table.payedAmount'),
      width: '15%',
      sortable: true,
      selector: row => row.payedAmount
    },    
    {
      name: '',
      minWidth: '10%',
      cell: row => (
        <div className='column-action'>
          <Button.Ripple className='btn-icon' color='flat-secondary'
            tag={Link}
            to={`/sales/view/${row.id}`}
            id={`pw-tooltip-${row.id}`}
          >
            <FileText size={14} />
          </Button.Ripple>
          <UncontrolledTooltip placement='top' target={`pw-tooltip-${row.id}`}>
           {t('app.tooltips.view')}
          </UncontrolledTooltip>

          <Button.Ripple className='btn-icon' color='flat-secondary' onClick={() => setShow(true)}
            id={`edit-tooltip-${row.id}`}
          >
            <Archive size={14} />
          </Button.Ripple>
          <UncontrolledTooltip placement='top' target={`edit-tooltip-${row.id}`}>
            {t('app.tooltips.edit')}
          </UncontrolledTooltip>
        </div>
      )
    }
  ]

  // ** Get data on mount
  useEffect(() => {
    dispatch( getAllData() )
    dispatch(      
      getPaginatedData({
        sort,
        sortColumn: sortColumn,
        q: searchTerm,
        page: currentPage,
        perPage: rowsPerPage
      })      
    )
  }, [dispatch])

  // ** Table data to render
  const dataToRender = () => {
    const filters = {
      q: searchTerm
    }

    const isFiltered = Object.keys(filters).some(function (k) {
      return filters[k].length > 0
    })

    if (store.invoices.length === 0 && isFiltered) {
      return []
    } else {
      return store.filteredInvoices.slice(0, rowsPerPage)
    }
  }

  const handlePagination = page => {
    dispatch(      
      getPaginatedData({
        sort: sort,
        sortColumn: sortColumn,
        q: searchTerm,
        page: page.selected + 1,
        perPage: rowsPerPage
      })      
    )
    setCurrentPage(page.selected + 1)
  }

  const handlePerPage = e => {
    const value = parseInt(e.currentTarget.value)
    dispatch(      
      getPaginatedData({
        sort,
        sortColumn,
        q: searchTerm,
        page: currentPage,
        perPage: value
      })      
    )
    setRowsPerPage(value)
  }

  const handleFilter = val => {    
    setSearchTerm(val)
    dispatch(      
      getPaginatedData({
        sort,
        sortColumn,
        q: val,
        page: currentPage,
        perPage: rowsPerPage
      })      
    )
  }

  const handleSort = (column, sortDirection) => {
    setSort(sortDirection)
    setSortColumn(column.sortField)
    dispatch(      
      getPaginatedData({
        sort,
        sortColumn,
        q: searchTerm,
        page: currentPage,
        perPage: rowsPerPage
      })      
    )
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
    <Fragment>
      <Card className='overflow-hidden'>
        <div className='react-dataTable'>
          <DataTable
            noHeader
            subHeader
            sortServer
            pagination
            responsive
            paginationServer
            columns={columns}
            data={dataToRender()}
            onSort={handleSort}
            paginationComponent={CustomPagination}
            className='react-dataTable'
            sortIcon={<ChevronDown size={10} />}
            subHeaderComponent={
              <CustomHeader
                store={store}
                searchTerm={searchTerm}
                rowsPerPage={rowsPerPage}
                handleFilter={handleFilter}
                handlePerPage={handlePerPage}
                t={t}
              />
            }
          />
        </div>
      </Card>
    </Fragment>
  )
}

export default Sales
