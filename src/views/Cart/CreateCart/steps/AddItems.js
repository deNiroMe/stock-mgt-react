// ** React Imports
import { Fragment, useEffect, useState } from 'react'

// ** Store & Actions
import { useSelector, useDispatch } from 'react-redux'
import { addItem } from '../../store/index'

// ** Reactstrap Imports
import { Col, Input, Form, Button, Label, Row, FormFeedback } from 'reactstrap'

// ** Third Party Components
import { useTranslation } from 'react-i18next'
import Select from 'react-select'
import { useForm, Controller } from 'react-hook-form'

const AddItems = () => {

  // ** Store Vars
  const dispatch = useDispatch()
  const store = useSelector(state => state.products)
  const items = useSelector(state => state.cart.items)
  const [options, setOptions] = useState([])

  // translation 
  const { t } = useTranslation()

  // form
  const {
    reset,
    control,
    setError,
    setValue,
    handleSubmit,
    formState: { errors }
  } = useForm({
    price: 0,
    quantity: 0,
    product: {}
  })

  // ** Get data on mount
  useEffect(() => {
    const mapped = store.products.map(p => {
      return { value: p.id, label: p.name, ...p }
    })
    setOptions(mapped)
    setValue('product', {})
  }, [store.products, items])

  const onSubmit = data => {
    if(validateFormdata(data)) {
      dispatch(addItem(data))
    }
  }

  const validateFormdata = (data) => {
    let isValid = true
    if (!data.product.name || data.product.name.length === 0) {
      setError('product', {
        type: 'manual',
        message: t('products.form.errors.name')
      })
      isValid = false
    }
    if (items.map(p => p.product.name).includes(data.name)) {
      setError('product', {
        type: 'manual',
        message: t('products.form.errors.name_exists')
      })
    }
    if (data.quantity <= 0) {
      setError('quantity', {
        type: 'manual',
        message: t('products.form.errors.quantity')
      })
      isValid = false
    }
    if (data.price <= 0) {
      setError('price', {
        type: 'manual',
        message: t('products.form.errors.price')
      })
      isValid = false
    }
    console.log(data)
    console.log(isValid)
    return isValid
  }

  const onSelectProduct = option => {
    // TODO validate product selected
    setValue('price', option.price)    
    setValue('quantity', 1)    
    setValue('product', {id: option.id, name: option.name})
  }

  const handleReset = () => {
    reset({
      price: 0,
      quantity: 0,
      product: {}
    })
  }

  return (
    <Fragment>

      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row className='mb-1'>
          <Label sm='3' for='product'>
            { t('cart.form.product.name') }
          </Label>
          <Col sm='9'>
                <Select
                  onChange={onSelectProduct}
                  className='react-select'
                  classNamePrefix='select'
                  options={options}
                />
            {errors.product && <FormFeedback>{errors.product.message}</FormFeedback>}
          </Col>
        </Row>

        <Row className='mb-1'>
          <Label sm='3' for='Email'>
            {t('cart.form.product.price')}
          </Label>
          <Col sm='9'>
            <Controller
              defaultValue=''
              control={control}
              id='price'
              name='price'
              render={({ field }) => <Input placeholder='Price' invalid={errors.price && true} {...field} />}
            />
            {errors.price && <FormFeedback>{errors.price.message}</FormFeedback>}
          </Col>
        </Row>

        <Row className='mb-1'>
          <Label sm='3' for='mobile'>
            {t('cart.form.product.quantity')}
          </Label>
          <Col sm='9'>
            <Controller
              defaultValue=''
              control={control}
              id='quantity'
              name='quantity'
              render={({ field }) => <Input placeholder='Quantity' invalid={errors.price && true} {...field} />}
            />
            {errors.quantity && <FormFeedback>{errors.quantity.message}</FormFeedback>}
          </Col>
        </Row>

        <Row className='mb-2'>
          <Col className='d-flex flex-row-reverse' md={{ size: 9, offset: 3 }}>
            <Button className='me-1 float-right' color='primary' type='submit'>
              {t('app.buttons.submit')}
            </Button>
            <Button className='me-1 float-right' outline color='secondary' type='reset' onClick={handleReset}>
              {t('app.buttons.reset')}
            </Button>
          </Col>
        </Row>
      </Form>

    </Fragment>
  )
}
export default AddItems
