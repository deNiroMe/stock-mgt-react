// ** Custom Components
import Sidebar from '@components/sidebar'

// ** Icons Imports
import { Link } from 'react-feather'

// ** Reactstrap Imports
import { Form, Input, Label, Badge, Button } from 'reactstrap'

const SidebarSendInvoice = ({ open, toggleSidebar }) => {
  return (
    <Sidebar
      size='lg'
      open={open}
      title='Add Product'
      headerClassName='mb-1'
      contentClassName='p-0'
      bodyClassName='pb-sm-0 pb-3'
      toggleSidebar={toggleSidebar}
    >
      <Form>
        <div className='mb-1'>
          <Label for='product-name' className='form-label'>
            Select Product
          </Label>
          <Input id='product-name' />
        </div>
        <div className='mb-1'>
          <Label for='product-price' className='form-label'>
            Price
          </Label>
          <Input id='product-price' />
        </div>
        <div className='mb-1'>
          <Label for='invoice-subject' className='form-label'>
            Quantity
          </Label>
          <Input id='product-quantity' />
        </div>
        <div className='d-flex flex-wrap mt-2'>
          <Button className='me-1' color='primary' onClick={toggleSidebar}>
            Send
          </Button>
          <Button color='secondary' outline onClick={toggleSidebar}>
            Cancel
          </Button>
        </div>
      </Form>
    </Sidebar>
  )
}

export default SidebarSendInvoice
