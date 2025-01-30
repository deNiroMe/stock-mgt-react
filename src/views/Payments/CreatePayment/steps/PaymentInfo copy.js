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
    control,
    setValue,
    handleSubmit,
    register,
    formState: { errors }
  } = useForm({
    payment_for: 'client',
    payedPrice: 0,
    date: null,
    time: null,
    client: {},
    supplier: {}
  })

  const clients = useSelector(state => state.clients)
  const suppliers = useSelector(state => state.products)
  const [clientOrSupplierSelection, setClientOrSupplierSelection] = useState(false)
  const [picker, setPicker] = useState(new Date())
  const [basic, setBasic] = useState(new Date())
  const [clientsOptions, setClientsoptions] = useState([])
  const [suppliersOptions, setSuppliersoptions] = useState([])
  const paymentMethods = [
    { value: 'CASH', label: 'Cash' },
    { value: 'CREDIT_CARD', label: 'Credit Card' },
    { value: 'VIREMENT', label: 'Virement' }
  ]

  useEffect(() => {
    const mappedClients = clients.clients.map(p => {
      return { value: p.id, label: p.name, ...p }
    })
    console.log(mappedClients)
    setClientsoptions(mappedClients)
    setValue('client', {})
    setValue('supplier', {})
    setValue('payment_for', 'client')
    setValue('payedPrice', 0)
    setValue('date', new Date().toLocaleString().substring(0, 10))
    setValue('time', new Date().toLocaleString().substring(11, 16))
  }, [clients.clients])

  const onSelectPaymentSource = option => {
    const attr = clientOrSupplierSelection === true ? 'client' : 'supplier'
    setValue(attr, { id: option.id, name: option.name })
  }

  const onDateChange = date => {
    setPicker(date)
    setValue('date', date[0].toLocaleString().substring(0, 10))
  }

  const onTimeChange = time => {
    setBasic(time)
    setValue('time', time[0].toLocaleString().substring(11, 16))
  }

  const onMethodChange = method => {
    setValue('method', method.value)
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
          <Col xs={6}>
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
          <Col xs={6}>
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
                options={clientsOptions}
              />
            </Col>
          )}
          <Col md='6' sm='12' className='mb-1'>
            <Label className='form-label' for='payedPrice'>
              Payed Price
            </Label>
            <Controller
              control={control}
              name='payedPrice'
              id='payedPrice'
              placeholder='Price'
              render={({ field }) =>
                <Input type='text'
                  name='payedPrice'
                  id='payedPrice'
                  placeholder='payedPrice'
                  {...field} />
              }
            />
          </Col>
        </Row>
        <Row>
          <Col md='4' sm='12' className='mb-1'>
            <Label className='form-label' for='payment_method'>
              Payment Method
            </Label>
            <Select
              isClearable={false}
              onChange={onMethodChange}
              defaultValue={[paymentMethods[0]]}
              name='method'
              options={paymentMethods}
              className='react-select'
              classNamePrefix='select'
            />
          </Col>
          <Col md='4' sm='12' className='mb-1'>
            <Label className='form-label' for='date'>
              Date
            </Label>
            <Flatpickr
              id='date'
              name="date"
              className='form-control'
              value={picker}
              options={{
                allowInput: true
              }}
              onChange={onDateChange}
            />
          </Col>
          <Col md='4' sm='12' className='mb-1'>
            <Label className='form-label' for='time'>
              Time
            </Label>
            <Flatpickr
              className='form-control'
              value={basic}
              id='timepicker'
              name="time"
              readOnly={false}
              options={{
                allowInput: true,
                enableTime: true,
                noCalendar: true,
                dateFormat: 'H:i',
                time_24hr: true
              }}
              onChange={onTimeChange}
            />
          </Col>
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
