// ** React Imports
import { useState, useEffect, Fragment } from 'react'

// ** Store & Actions
import { useSelector, useDispatch } from 'react-redux'

// ** Reactstrap Imports
import { Card, CardBody, Row, Col, Input, Form, Button, Label } from 'reactstrap'

// ** Third Party Components
import Flatpickr from 'react-flatpickr'
import Select from 'react-select'
import { useForm, Controller } from 'react-hook-form'

import '@styles/react/libs/flatpickr/flatpickr.scss'

const PaymentInfo = () => {

  const {
    setValue,
    handleSubmit,
    register
  } = useForm({
    payment_for: 'client',
    payedPrice: 0,
    date: null,
    time: null,
    client: {},
    supplier: {}
  })

  const clients = useSelector(state => state.clients)
  const suppliers = useSelector(state => state.suppliers)
  const [clientOrSupplierSelection, setClientOrSupplierSelection] = useState(true)
  const [clientsOptions, setClientsoptions] = useState([])
  const [suppliersOptions, setSuppliersoptions] = useState([])

  useEffect(() => {
    const mappedClients = clients.clients.map(p => {
      return { value: p.id, label: p.name, ...p }
    })
    const mappedSuppliers = suppliers.suppliers.map(p => {
      return { value: p.id, label: p.name, ...p }
    })
    setClientsoptions(mappedClients)
    setSuppliersoptions(mappedSuppliers)
    setValue('client', {})
    setValue('supplier', {})
    setValue('payment_for', 'client')
  }, [clients.clients])

  const onSelectPaymentSource = option => {
    const attr = clientOrSupplierSelection === true ? 'client' : 'supplier'
    setValue(attr, { id: option.id, name: option.name })
  }

  const handleRadioBtnCheck = e => {
    setClientOrSupplierSelection(e.target.value === 'client')
    setValue('payment_for', e.target.value)
  }

  const onSubmit = data => {
    console.log(data)
  }

  return (
    <Fragment>
      <Form onSubmit={handleSubmit(onSubmit)}>

        <Row>
          <Col xs={4}>
            <div className='form-check mb-1'>
              <Input
                id='select-payment-radio'
                type='radio'
                value='client'
                name='payment_for'
                checked={clientOrSupplierSelection === true}
                onClick={(e) => handleRadioBtnCheck(e)}
                {...register('payment_for')}
              />
              <Label className='form-check-label' for='select-product-radio'>
                Client
              </Label>
            </div>
          </Col>
          <Col xs={4}>
            <div className='form-check mb-1'>
              <Input
                id='select-payment-radio'
                type='radio'
                value='supplier'
                name='payment_for'
                checked={clientOrSupplierSelection === false}
                onClick={(e) => handleRadioBtnCheck(e)}
                {...register('payment_for')}
              />
              <Label className='form-check-label' for='new-product-radio'>
                Supplier
              </Label>
            </div>
          </Col>
        </Row>

        <Row className='mb-2'>
          {clientOrSupplierSelection === true && (
            <Col sm='6'>
              <Label sm='3' for='name'>
                Select client
              </Label>
              <Select
                onChange={onSelectPaymentSource}
                className='react-select'
                classNamePrefix='select'
                options={clientsOptions}
              />
            </Col>
          )}
          {clientOrSupplierSelection === false && (
            <Col sm='6'>
              <Label sm='3' for='name'>
                Select supplier
              </Label>
              <Select
                onChange={onSelectPaymentSource}
                className='react-select'
                classNamePrefix='select'
                options={suppliersOptions}
              />
            </Col>
          )}
        </Row>
        <Row className='mb-1'>
          <Col className='d-flex flex-row-reverse' md={{ size: 9, offset: 3 }}>
            <Button className='me-1 float-right' color='primary' type='submit'>
              Submit
            </Button>
            <Button className='me-1 float-right' outline color='secondary' type='reset'>
              Cancel
            </Button>
          </Col>
        </Row>
      </Form>

    </Fragment >
  )
}

export default PaymentInfo
