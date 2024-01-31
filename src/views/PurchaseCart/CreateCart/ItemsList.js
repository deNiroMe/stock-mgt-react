// ** Third Party Components
import { useTranslation } from 'react-i18next'
import { ArrowLeft, ArrowRight, Trash } from 'react-feather'
import { Row, Card, CardHeader, CardTitle, Table, Button } from 'reactstrap'

// ** Store & Actions
import { useSelector } from 'react-redux'

const ItemsList = ({ stepper }) => {

  // translation 
  const { t } = useTranslation()

  // ** Store Vars
  const items = useSelector(state => state.cart.items)

  return (
    <Row className='mb-2'>
      <Card className='overflow-hidden'>
        <CardHeader>
          <CardTitle tag='h4'>{ t('app.cart.table.title') }</CardTitle>
        </CardHeader>
        <Table responsive className='mb-2'>
          <thead>
            <tr>
              <th>{ t('app.cart.table.number') }</th>
              <th>{ t('app.cart.table.product') }</th>
              <th>{ t('app.cart.table.price') }</th>
              <th>{ t('app.cart.table.quantity') }</th>
              <th>Total</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {
              items.map( (item, index) =>
                <tr key={index}>
                  <td width="10%"> {index+1} </td>
                  <td width="40%"> {item.product.name} </td>
                  <td width="10%"> {item.price} </td>
                  <td width="10%"> {item.quantity} </td>
                  <td width="20%"> {item.quantity * item.price} </td>
                  <td width="10%">
                    <Trash className='me-50' size={15} /> 
                  </td>
                </tr> )
            }
          </tbody>
        </Table>        
        <div className='d-flex justify-content-between mb-3'>
          <Button color='secondary' className='btn-prev' outline onClick={() => stepper.previous()}>
            <ArrowLeft size={14} className='align-middle me-sm-25 me-0'></ArrowLeft>
            <span className='align-middle d-sm-inline-block d-none'>{t('app.buttons.previous')}</span>
          </Button>
          <Button color='primary' className='btn-next' onClick={() => stepper.next()}>
            <span className='align-middle d-sm-inline-block d-none'>{t('app.buttons.next')}</span>
            <ArrowRight size={14} className='align-middle ms-sm-25 ms-0'></ArrowRight>
          </Button>
        </div>
      </Card>
    </Row>
  )
}

export default ItemsList