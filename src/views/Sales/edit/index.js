// ** React Imports
import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'

// ** Store Actions
import { find } from '../store'
//import { getInvoiceItems } from '../../Products/ProductStatementLine/store'
import { useSelector, useDispatch } from 'react-redux'

// ** Reactstrap Imports
import { Alert, Row, Col } from 'reactstrap'

// ** Invoice Edit Components
import EditCard from './EditCard'
import EditActions from './EditActions'
import SendInvoiceSidebar from '../shared-sidebar/SidebarSendInvoice'
import AddPaymentSidebar from '../shared-sidebar/SidebarAddPayment'

const InvoiceEdit = () => {
  // ** Hooks
  const { id } = useParams()

  // * Store
  const dispatch = useDispatch()
  const store = useSelector(state => state.invoices)
  const items = useSelector(state => state.statementLine)

  // ** States
  const [data, setData] = useState(null)
  const [sendSidebarOpen, setSendSidebarOpen] = useState(false)
  const [addPaymentOpen, setAddPaymentOpen] = useState(false)

  // ** Functions to toggle add & send sidebar
  const toggleSendSidebar = () => setSendSidebarOpen(!sendSidebarOpen)
  const toggleAddSidebar = () => setAddPaymentOpen(!addPaymentOpen)

  // ** Get invoice on mount based on id
  useEffect(() => {
   //dispatch(getInvoiceItems({reference : id, type : 'SALE'}))
    dispatch(find(id))
  }, [])

  return store.invoice !== null && store.invoice !== undefined ? (
    <div className='invoice-edit-wrapper'>
      <Row className='invoice-edit'>
        <Col xl={9} md={8} sm={12}>
          <EditCard invoice={store.invoice} items={items.statementLines}/>
        </Col>
        <Col xl={3} md={4} sm={12}>
          <EditActions id={id} setSendSidebarOpen={setSendSidebarOpen} setAddPaymentOpen={setAddPaymentOpen} />
        </Col>
      </Row>
      <SendInvoiceSidebar toggleSidebar={toggleSendSidebar} open={sendSidebarOpen} />
      <AddPaymentSidebar toggleSidebar={toggleAddSidebar} open={addPaymentOpen} />
    </div>
  ) : (
    <Alert color='danger'>
      <h4 className='alert-heading'>Invoice not found</h4>
      <div className='alert-body'>
        Invoice with id: {id} doesn't exist. Check list of all invoices:{' '}
        <Link to='/apps/invoice/list'>Invoice List</Link>
      </div>
    </Alert>
  )
}

export default InvoiceEdit
