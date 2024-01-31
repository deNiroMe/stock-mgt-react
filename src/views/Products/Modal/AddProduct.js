// ** React Imports
import { useEffect, useState } from 'react'

// ** Reactstrap Imports
import { Row, Col, Form, Button, Modal, Input, Label, ModalBody, ModalHeader, FormFeedback } from 'reactstrap'
import Select from 'react-select'
import { useTranslation } from 'react-i18next'

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux'
import { add } from '../store'

// ** Third Party Components
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useNavigate } from 'react-router-dom'
import { useForm, Controller } from 'react-hook-form'

// ** Utils
import { selectThemeColors } from '@utils'

export const AddProduct = ({ products, show, setShow }) => {

  const suppliers = useSelector(state => state.suppliers.suppliers)
  const [options, setOptions] = useState([])

  const dispatch = useDispatch()

  const { t } = useTranslation()
  const navigate = useNavigate()

  const MySwal = withReactContent(Swal)

  const {
    reset,
    control,
    setError,
    setValue,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      name: '',
      price: 0.0,
      purchasePrice: 0.0,
      quantity: 0
    }
  })

  useEffect(() => {
    const options = suppliers.map(p => {
      return { value: p.id, label: p.name }
    })
    setValue('suppliers', options[0])
    setValue('id', Math.floor(Math.random() * 1000) + 1000)
    setValue('date', new Date().toLocaleString().substring(0,10))
    setOptions(options)
  }, [suppliers])

  const onSubmit = data => {
    if(validateFormdata(data)) {
      dispatch(add(data))
      return MySwal.fire({
        icon: 'success',
        title: t('products.add.swal.success.title'),
        text: t('products.add.swal.success.text'),
        confirmButtonText: t('products.add.swal.confirmButtonText'),
        customClass: {
          confirmButton: 'btn btn-success'
        }
      })
      .then(function () { navigate(`/products/`); })
    }
  }

  const onSuppliersSelect = (options) => {
    let selectedSuppliers = options.map(s =>  { return {id : s.value, name: s.label}})
    setValue('suppliers', selectedSuppliers)
  }

  const validateFormdata = (data) => {
    let isValid = true
    if (!data.name || data.name.length === 0) {
      setError('name', {
        type: 'manual',
        message: t('products.form.errors.name')
      })
      isValid = false
    }
    if (products.map(p => p.name).includes(data.name)) {
      setError('name', {
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
    if (data.purchasePrice <= 0) {
      setError('purchasePrice', {
        type: 'manual',
        message: t('products.form.errors.purchasePrice')
      })
      isValid = false
    }
    console.log(data)
    console.log(isValid)
    return isValid
  }

  const handleReset = () => {
    reset({
      name: '',
      price: 0.0,
      purchasePrice: 0.0,
      quantity: 0
    })
  }

  return (
    <Modal isOpen={show} toggle={() => setShow(!show)} className='modal-dialog-centered modal-lg'>
      <ModalHeader className='bg-transparent' toggle={() => setShow(!show)}></ModalHeader>
      <ModalBody className='px-sm-5 pt-50 pb-5'>
        <div className='text-center mb-2'>
          <h1 className='mb-1'>{t('products.form.add.title')}</h1>
          <p>{t('products.form.add.subtitle')}</p>
        </div>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row className='gy-1 pt-75'>
            <Col md={6} xs={12}>
              <Label className='form-label' for='name'>
                {t('products.form.name')}
              </Label>
              <Controller
                defaultValue=''
                control={control}
                id='name'
                name='name'
                render={({ field }) => (
                  <Input {...field}
                    id='name'
                    type='text'
                    placeholder='Product XXX'
                    invalid={errors.name && true} />
                )}
              />
              {errors.name && <FormFeedback>{errors.name.message}</FormFeedback>}
            </Col>
            <Col md={6} xs={12}>
              <Label className='form-label' for='price'>
                {t('products.form.price')}
              </Label>
              <Controller
                defaultValue=''
                control={control}
                id='price'
                name='price'
                type='number'
                render={({ field }) => (
                  <Input {...field} id='price' placeholder='80.90' invalid={errors.price && true} />
                )}
              />
              {errors.price && <FormFeedback>{errors.price.message}</FormFeedback>}
            </Col>
            <Col xs={6}>
              <Label className='form-label' for='purchasePrice'>
                {t('products.form.purchasePrice')}
              </Label>
              <Controller
                defaultValue=''
                control={control}
                id='purchasePrice'
                name='purchasePrice'
                type='number'
                render={({ field }) => (
                  <Input {...field} id='purchasePrice' placeholder='70.80' invalid={errors.purchasePrice && true} />
                )}
              />
              {errors.purchasePrice && <FormFeedback>{errors.purchasePrice.message}</FormFeedback>}
            </Col>
            <Col xs={6}>
              <Label className='form-label' for='quantity'>
                {t('products.form.quantity')}
              </Label>
              <Controller
                control={control}
                id='quantity'
                name='quantity'
                type='number'
                render={({ field }) => (
                  <Input {...field} id='quantity' placeholder='100' invalid={errors.quantity && true} />
                )}
              />
              {errors.quantity && <FormFeedback>{errors.quantity.message}</FormFeedback>}
            </Col>
            <Col md={12} xs={12}>
              <Label className='form-label' for='status'>
                Supplier:
              </Label>
              <Select
                id='status'
                isMulti
                isClearable={false}
                onChange={onSuppliersSelect}
                className='react-select'
                classNamePrefix='select'
                options={options}
                theme={selectThemeColors}
                defaultValue={options[0]}
              />
            </Col>
            <Col xs={12} className='text-center mt-2 pt-50'>
              <Button type='submit' className='me-1' color='primary'>
                {t('app.buttons.submit')}
              </Button>
              <Button
                type='reset'
                color='secondary'
                outline
                onClick={() => {
                  handleReset()
                  setShow(false)
                }}
              >
                {t('app.buttons.discard')}
              </Button>
            </Col>
          </Row>
        </Form>
      </ModalBody>
    </Modal>
  )
}
