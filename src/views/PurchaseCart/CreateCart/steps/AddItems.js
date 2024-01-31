// ** React Imports
import { Fragment, useEffect, useState } from 'react'

// ** Store & Actions
import { useSelector, useDispatch } from 'react-redux'
import { addItem } from '../../store/index'

// ** Reactstrap Imports
import { Col, Input, Form, Button, Label, Row } from 'reactstrap'

// ** Third Party Components
import { useTranslation } from 'react-i18next'
import Select from 'react-select'
import { useForm, Controller } from 'react-hook-form'

const AddItems = () => {

  // ** Store Vars
  const dispatch = useDispatch()
  const [productSelection, setProductSelection] = useState(false)
  const store = useSelector(state => state.products)
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
    register,
    formState: { errors }
  } = useForm()

  // ** Get data on mount
  useEffect(() => {
    const mapped = store.products.map(p => {
      return { value: p.id, label: p.name, ...p }
    })
    setOptions(mapped)
  }, [store.products])

  const onSubmit = data => {
    // TODO validate data
    dispatch(addItem(data))
  }

  const onSelectProduct = option => {
    // TODO validate product selected
    setValue('price', option.price)
    setValue('quantity', 1)
    setValue('product', { id: option.id, name: option.name })
  }

  const handleRadioBtnCheck = e => {
    setProductSelection(e.target.value === 'yes')
    setValue('new_product', e.target.value)
  }

  const handleReset = () => {
    reset({
      new_product: 'yes',
      name: '',
      purchasePrice: 0,
      price: 0,
      quantity: 0,
      selectedProduct: {}
    })
  }

  return (
    <Fragment>

      <Form onSubmit={handleSubmit(onSubmit)}>

        <Row>
          <Col xs={6}>
            <div className='form-check mb-1'>
              <Input
                id='select-product-radio'
                type='radio'
                value='no'
                name='new_product'
                checked={productSelection === true}
                onClick={(e) => handleRadioBtnCheck(e)}
                {...register('new_product')}
              />
              <Label className='form-check-label' for='select-product-radio'>
                {t('cart.purchase.form.product.select_product')}
              </Label>
            </div>
          </Col>
          <Col xs={6}>
            <div className='form-check mb-1'>
              <Input
                id='new-product-radio'
                type='radio'
                value='yes'
                name='new_product'
                checked={productSelection === false}
                onClick={(e) => handleRadioBtnCheck(e)}
                {...register('new_product')}
              />
              <Label className='form-check-label' for='new-product-radio'>
                {t('cart.purchase.form.product.add_product')}
              </Label>
            </div>
          </Col>
        </Row>

        {productSelection === true && (
          <Row className='mb-2'>
            <Col sm='6'>
              <Label sm='3' for='product'>
                {t('cart.purchase.form.product.name')}
              </Label>
              <Select
                onChange={onSelectProduct}
                className='react-select'
                classNamePrefix='select'
                options={options}
              />
            </Col>
            <Col sm='6'>
              <Label sm='3' for='purchasePrice'>
                {t('cart.purchase.form.product.purchasePrice')}
              </Label>
              <Controller
                defaultValue=''
                control={control}
                id='purchasePrice'
                name='purchasePrice'
                render={({ field }) => <Input placeholder='Price' invalid={errors.purchasePrice && true} {...field} />}
              />
            </Col>
          </Row>

        )}
        {productSelection === false && (
          <Fragment>
            <Row className='mb-3'>
              <Col sm='6'>
                <Label sm='3' for='name'>
                  {t('cart.purchase.form.product.name')}
                </Label>
                <Controller
                  defaultValue=''
                  control={control}
                  id='name'
                  name='name'
                  render={({ field }) => <Input placeholder='Price' invalid={errors.name && true} {...field} />}
                />
              </Col>

              <Col sm='6'>
                <Label sm='3' for='quantity'>
                  {t('cart.purchase.form.product.quantity')}
                </Label>
                <Controller
                  defaultValue=''
                  control={control}
                  id='quantity'
                  name='quantity'
                  render={({ field }) => <Input placeholder='Quantity' invalid={errors.price && true} {...field} />}
                />
              </Col>

              <Col sm='6'>
                <Label sm='3' for='purchasePrice'>
                  {t('cart.purchase.form.product.purchasePrice')}
                </Label>
                <Controller
                  defaultValue=''
                  control={control}
                  id='purchasePrice'
                  name='purchasePrice'
                  render={({ field }) => <Input placeholder='Price' invalid={errors.purchasePrice && true} {...field} />}
                />
              </Col>

              <Col sm='6'>
                <Label sm='3' for='quantity'>
                  {t('cart.purchase.form.product.quantity')}
                </Label>
                <Controller
                  defaultValue=''
                  control={control}
                  id='quantity'
                  name='quantity'
                  render={({ field }) => <Input placeholder='Quantity' invalid={errors.price && true} {...field} />}
                />
              </Col>
            </Row>
          </Fragment>
        )}
        <Row className='mb-1'>
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
