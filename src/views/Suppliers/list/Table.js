// ** React Imports
import { Fragment, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

// ** translation
import { useTranslation } from 'react-i18next'

// ** Store & Actions
import { getAllData, getPaginatedData, toggleSidebar, setElementToEdit } from '../store'
import { useDispatch, useSelector } from 'react-redux'

// ** Third Party Components
import ReactPaginate from 'react-paginate'
import DataTable from 'react-data-table-component'
import { ChevronDown, FileText, Archive } from 'react-feather'

// ** Reactstrap Imports
import { Row, Col, Card, Input, Button, UncontrolledTooltip } from 'reactstrap'

// ** Sidebar
import Sidebar from '../Sidebar/Sidebar'

// ** Styles
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'

// ** Table Header
const CustomHeader = ({ toggleSidebar, handlePerPage, rowsPerPage, handleFilter, searchTerm, t }) => {
  
  return (
    <div className='invoice-list-table-header w-100 me-1 ms-50 mt-2 mb-75'>
      <Row>
        <Col xl='6' className='d-flex align-items-center p-0'>
          <div className='d-flex align-items-center w-100'>
            <label htmlFor='rows-per-page'>{t('suppliers.table.show')}</label>
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
            <label htmlFor='rows-per-page'>{t('suppliers.table.entries')}</label>
          </div>
        </Col>
        <Col
          xl='6'
          className='d-flex align-items-sm-center justify-content-xl-end justify-content-start flex-xl-nowrap flex-wrap flex-sm-row flex-column pe-xl-1 p-0 mt-xl-0 mt-1'
        >
          <div className='d-flex align-items-center mb-sm-0 mb-1 me-1'>
            <label className='mb-0' htmlFor='search-invoice'>
             {t('suppliers.table.search')}
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
            <Button className='add-new-user' color='primary' onClick={toggleSidebar}>
              {t('suppliers.buttons.add')}
            </Button>
          </div>
        </Col>
      </Row>
    </div>
  )
}

const SuppliersList = () => {

  const { t } = useTranslation()

  // columns 
  const columns = [
    {
      name: t('suppliers.table.name'),
      sortable: true,
      minWidth: '300px',
      sortField: 'name',
      selector: row => row.name,
      cell: row => <span className='text-capitalize'>{row.name}</span>
    },
    {
      name: t('suppliers.table.phone'),
      sortable: true,
      minWidth: '172px',
      sortField: 'phone',
      selector: row => row.phone,
      cell: row => <span className='text-capitalize'>{row.phone}</span>
    },
    {
      name: t('suppliers.table.city'),
      minWidth: '138px',
      sortable: true,
      sortField: 'city',
      selector: row => row.city,
      cell: row => <span className='text-capitalize'>{row.city}</span>
    },
    {
      name: t('suppliers.table.actions'),
      minWidth: '100px',
      cell: row => (
        <div className='column-action'>
          <Button.Ripple className='btn-icon' color='flat-secondary'
            tag={Link}
            to={`/suppliers/view/${row.id}`}
            id={`pw-tooltip-${row.id}`}
          >
            <FileText size={14} />
          </Button.Ripple>
          <UncontrolledTooltip placement='top' target={`pw-tooltip-${row.id}`}>
           {t('app.tooltips.view')}
          </UncontrolledTooltip>

          <Button.Ripple className='btn-icon' color='flat-info'
            onClick={e => {
              e.preventDefault() 
              editClient(row.id)
            }}
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
  
  // ** Store Vars
  const dispatch = useDispatch()
  const store = useSelector(state => state.suppliers)

  // ** States
  const [sort, setSort] = useState('desc')
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [sortColumn, setSortColumn] = useState('name')
  const [rowsPerPage, setRowsPerPage] = useState(10)

  // ** Function to toggle sidebar
  const setOpenSidebar = () => dispatch(toggleSidebar())

  // ** Get data on mount
  useEffect(() => {
    dispatch( getAllData() )
  }, [dispatch])

  // ** Function in get data on page change
  const handlePagination = page => {
    dispatch(      
      getPaginatedData({
        sort: sort,
        sortColumn: sortColumn,
        q: searchTerm,
        page: currentPage,
        perPage: rowsPerPage
      })      
    )
    setCurrentPage(page.selected + 1)
  }

  // ** Function in get data on rows per page
  const handlePerPage = e => {
    const value = parseInt(e.currentTarget.value)
    dispatch(      
      getPaginatedData({
        sort,
        sortColumn,
        q: searchTerm,
        page: currentPage,
        perPage: rowsPerPage
      })      
    )
    setRowsPerPage(value)
  }

  // ** Function in get data on search query change
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

  const editClient = clientId => {   
    dispatch(      
      setElementToEdit(clientId)      
    )
  }

  // ** Custom Pagination
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

  // ** Table data to render
  const dataToRender = () => {
    const filters = {
      q: searchTerm
    }

    const isFiltered = Object.keys(filters).some(function (k) {
      return filters[k].length > 0
    })

    if (store.suppliers.length === 0 && isFiltered) {
      return []
    } else {
      return store.filteredSuppliers.slice(0, rowsPerPage)
    }
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
            onSort={handleSort}
            sortIcon={<ChevronDown />}
            className='react-dataTable'
            paginationComponent={CustomPagination}
            data={dataToRender()}
            subHeaderComponent={
              <CustomHeader
                store={store}
                searchTerm={searchTerm}
                rowsPerPage={rowsPerPage}
                handleFilter={handleFilter}
                handlePerPage={handlePerPage}
                toggleSidebar={setOpenSidebar}
                t={t}
              />
            }
          />
        </div>
      </Card>

      <Sidebar open={store.sidebarOpen} toggleSidebar={setOpenSidebar} store={store} />
    </Fragment>
  )
}

export default SuppliersList
