// ** React Imports
import { Link } from 'react-router-dom'

// ** Reactstrap Imports
import { Card, CardBody, Button } from 'reactstrap'

const PreviewActions = ({ id, setSendSidebarOpen, setAddPaymentOpen }) => {
  return (
    <Card className='invoice-action-wrapper'>
      <CardBody>
        <Button color='secondary' tag={Link} to='/apps/invoice/print' target='_blank' block outline className='mb-75'>
          Print
        </Button>
        <Button tag={Link} to={`/sales/edit/${id}`} color='secondary' block outline className='mb-75'>
          Edit
        </Button>
        <Button color='primary' block className='mb-75' onClick={() => setSendSidebarOpen(true)}>
          Add Product
        </Button>
        <Button color='success' block onClick={() => setAddPaymentOpen(true)}>
          Add Payment
        </Button>
      </CardBody>
    </Card>
  )
}

export default PreviewActions
