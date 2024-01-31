// ** React Imports
import { useEffect, useState } from 'react'

// ** Store & Actions
import { addCartDetails } from '../../store/index'
import { addAll } from '../../../Products/ProductStatementLine/store'
import { add as addInvoice } from '../../../Sales/store'
import { useSelector, useDispatch } from 'react-redux'

// ** Reactstrap Imports
import { Row, Col, Input, Form, Button, Label } from 'reactstrap'

// ** Third Party Components
import Swal from 'sweetalert2'
import Flatpickr from 'react-flatpickr'
import Select from 'react-select'

// ** Third Party hooks
import { useTranslation } from 'react-i18next'
import { useForm, Controller } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import withReactContent from 'sweetalert2-react-content'

import '@styles/react/libs/flatpickr/flatpickr.scss'

const CompleteCart = () => {

  const MySwal = withReactContent(Swal)
  const [picker, setPicker] = useState(new Date())
  const [basic, setBasic] = useState(new Date())
  const paymentMethods = [
    { value: 'CASH', label: 'Cash' },
    { value: 'CREDIT_CARD', label: 'Credit Card' },
    { value: 'VIREMENT', label: 'Virement' }
  ]

  // translation 
  const { t } = useTranslation()

  const navigate = useNavigate()

  const {
    reset,
    control,
    setValue,
    handleSubmit
  } = useForm()

  // ** Store Vars
  const dispatch = useDispatch()
  const items = useSelector(state => state.cart.items)
  const client = useSelector(state => state.cart.client)
  const order = useSelector(state => state.cart.cartInfo)

  // ** Get data on mount
  useEffect(() => {
    setValue('date', new Date().toLocaleString().substring(0,10))
    setValue('time', new Date().toLocaleString().substring(11,16))
  }, [items])

  const onSubmit = data => {
    dispatch(addCartDetails(data))
    return MySwal.fire({
      title: t('cart.swal.title'),
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: t('cart.swal.confirmButtonText'),
      customClass: {
        confirmButton: 'btn btn-primary',
        cancelButton: 'btn btn-outline-danger ms-1'
      },
      buttonsStyling: false
    }).then(function (result) {
      if (result.value) {
        const ref = Math.floor(Math.random() * 1100) + 3
        const list = items.map((item,i) => {
          return {
            id: ref+i,
            type: "PURCHASE",
            date: order.date,
            time: order.time,
            referenceId: ref,
            price: item.price,
            quantity: item.quantity,
            product:  item.product
          }
        })
        const a = {
          id: ref,
          reference: `REF0${ref}`,
          totalAmount: 186.46,
          payedAmount: 113.99,
          date: order.date,
          time: order.time,
          client: client.selectedClient,
          salesPerson: {
            "id": 0,
            "name": "Hannah Joyner"
          }
        }
        console.log(list)
        console.log(a)
        dispatch( addAll(list) )
        dispatch( addInvoice(a) )        
        MySwal.fire({
          icon: 'success',
          title: t('cart.swal.success.title'),
          text: t('cart.swal.success.text'),
          confirmButtonText: t('cart.swal.success.confirmButtonText'),
          customClass: {
            confirmButton: 'btn btn-success'
          }
        })
        .then(function () { navigate("/sales"); })
      } 
      else if (result.dismiss === MySwal.DismissReason.cancel) {
        MySwal.fire({          
          title: t('cart.swal.error.title'),
          text: t('cart.swal.error.text'),
          icon: 'error',
          customClass: {
            confirmButton: 'btn btn-success'
          }
        })
      }
    })
  }

  const onDateChange = date => { 
    setPicker(date)
    setValue('date', date[0].toLocaleString().substring(0,10))
  }

  const onTimeChange = time => {
    setBasic(time)
    setValue('time', time[0].toLocaleString().substring(11,16))
  }

  const onMethodChange = method => {
    setValue('method', method.value)
  }

  const handleReset = () => {
    reset({})
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Row>
        <Col md='6' sm='12' className='mb-1'>
          <Label className='form-label' for='price'>
            { t('cart.form.detail.price') }
          </Label>
          <Controller
            control={control}
            name='price'
            id='price'
            placeholder='Price'
            render={({ field }) =>
              <Input type='text'
                name='price'
                id='price'
                placeholder='Price'
                {...field} />
            }
          />

        </Col>
        <Col md='6' sm='12' className='mb-1'>
          <Label className='form-label' for='payment_method'>
          { t('cart.form.detail.payment_method') }
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
        <Col md='6' sm='12' className='mb-1'>
          <Label className='form-label' for='date'>
          { t('cart.form.detail.date') }
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
        <Col md='6' sm='12' className='mb-1'>
          <Label className='form-label' for='time'>
          { t('cart.form.detail.time') }
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
        <Col sm='12' className='mb-1'>
          <div className='d-flex flex-row-reverse'>
            <Button color='primary' type='submit'>
             { t('app.buttons.submit') }
            </Button>
            <Button outline color='secondary' className='me-1' type='reset'>
             { t('app.buttons.reset') }
            </Button>
          </div>
        </Col>
      </Row>
    </Form>
  )
}
export default CompleteCart
