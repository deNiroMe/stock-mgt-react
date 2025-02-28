// ** React Imports
import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'

// ** Store Actions
import { find } from '../store'
//import { getInvoiceItems } from '../../Products/ProductStatementLine/store'
import { useSelector, useDispatch } from 'react-redux'

// ** Reactstrap Imports
import { Row, Col, Alert } from 'reactstrap'

// ** Invoice Preview Components
import PreviewCard from './PreviewCard'
import PreviewActions from './PreviewActions'
import AddPaymentSidebar from '../shared-sidebar/SidebarAddPayment'
import SendInvoiceSidebar from '../shared-sidebar/SidebarSendInvoice'

// ** Styles
import '@styles/base/pages/app-invoice.scss'

const InvoicePreview = () => {
  
  // ** HooksVars
  const { id } = useParams()

  // * Store
  const dispatch = useDispatch()
  const store = useSelector(state => state.invoices)
  const items = useSelector(state => state.operations)

  // ** States
  const [sendSidebarOpen, setSendSidebarOpen] = useState(false)
  const [addPaymentOpen, setAddPaymentOpen] = useState(false)

  // ** Functions to toggle add & send sidebar
  const toggleSendSidebar = () => setSendSidebarOpen(!sendSidebarOpen)
  const toggleAddSidebar = () => setAddPaymentOpen(!addPaymentOpen)

  // ** Get invoice on mount based on id
  useEffect(() => {
    //dispatch(getInvoiceItems({ reference: id, type: 'SALE' }))
    dispatch(find(id))
  }, [ id]);

  return store.invoice !== null && store.invoice !== undefined ? (
    <div className='invoice-preview-wrapper'>
      <Row className='invoice-preview'>
        <Col xl={9} md={8} sm={12}>
          <PreviewCard invoice={store.invoice} items={items.filteredSales} />
        </Col>
        <Col xl={3} md={4} sm={12}>
          <PreviewActions id={id} setSendSidebarOpen={setSendSidebarOpen} setAddPaymentOpen={setAddPaymentOpen} />
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
        <Link to='/sales'>Invoice List</Link>
      </div>
    </Alert>
  )
}

export default InvoicePreview
