// ** React Imports
import { Fragment } from 'react'
import { Link } from 'react-router-dom'

// ** Reactstrap Imports
import { Card, CardBody, Button, Input } from 'reactstrap'

const EditActions = ({ id, setSendSidebarOpen, setAddPaymentOpen }) => {
  return (
    <Fragment>
      <Card className='invoice-action-wrapper'>
        <CardBody>
          <Button tag={Link} to={`/sales/view/${id}`} color='primary' block outline className='mb-75'>
            Preview
          </Button>
          <Button color='primary' block outline className='mb-75'>
            Save
          </Button>
          <Button color='primary' block className='mb-75' onClick={() => setSendSidebarOpen(true)}>
            Add Product
          </Button>
          <Button color='success' block onClick={() => setAddPaymentOpen(true)}>
            Add Payment
          </Button>
        </CardBody>
      </Card>
    </Fragment>
  )
}

export default EditActions
