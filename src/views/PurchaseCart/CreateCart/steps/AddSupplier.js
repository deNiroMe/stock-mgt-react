// ** React Imports
import { Fragment, useEffect, useState } from 'react'

// ** Store & Actions
import { useSelector, useDispatch } from 'react-redux'
import { setSupplier } from '../../store/index'
import { getAllData } from '../../../Suppliers/store'

// ** Reactstrap Imports
import { Col, Input, Form, Button, Label, Row } from 'reactstrap'

// ** Third Party Components
import { useTranslation } from 'react-i18next'
import Select from 'react-select'
import { useForm, Controller } from 'react-hook-form'

const AddSupplier = () => {

  // State
  const [supplierSelection, setSupplierSelection] = useState(false)
  const [options, setOptions] = useState([])

  // ** Store Vars
  const dispatch = useDispatch()
  const store = useSelector(state => state.suppliers)

  // translation 
  const { t } = useTranslation()

  // form
  const {
    reset,
    control,
    handleSubmit,
    setValue,
    register
  } = useForm()

  // ** Get data on mount
  useEffect(() => {
    dispatch(getAllData())
    const options = store.suppliers.map(p => {
      return { value: p.id, label: p.name }
    })
    setOptions(options)
  }, [dispatch])

  const onSubmit = data => {
    // TO DO validate data
    const supplier = {
      newSupplier : data.new_supplier === 'yes' ? true : false,
      selectedSupplier : data.supplier,
      name: data.name,
      city: data.city,
      phonenumber: data.phonenumber
    }
    dispatch(setSupplier(supplier))
  }

  const onSelectsupplier = option => { 
    setValue('supplier', {id: option.value, name: option.label})
  }

  const handleRadioBtnCheck = e => {
    setSupplierSelection(e.target.value === 'yes')
    setValue('new_supplier', e.target.value)
  }

  const handleReset = () => {
    reset({
      new_supplier: 'yes',
      selectedSupplier: {},
      name: '',
      city: '',
      phonenumber: ''
    })
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Row>
        <Col xs={6}>
          <div className='form-check mb-1'>
            <Input
              id='select-supplier-radio'
              type='radio'
              value='no'
              name='new_supplier'
              checked={supplierSelection === false}
              onClick={(e) => handleRadioBtnCheck(e)}
              {...register('new_supplier')}
            />
            <Label className='form-check-label' for='select-supplier-radio'>
              {t('cart.purchase.form.supplier.select_supplier')}
            </Label>
          </div>
        </Col>
        <Col xs={6}>
          <div className='form-check mb-1'>
            <Input
              id='new-supplier-radio'
              type='radio'
              value='yes'
              name='new_supplier'
              checked={supplierSelection === true}
              onClick={(e) => handleRadioBtnCheck(e)}
              {...register('new_supplier')}
            />
            <Label className='form-check-label' for='new-supplier-radio'>
              {t('cart.purchase.form.supplier.add_supplier')}
            </Label>
          </div>
        </Col>
      </Row>
      {supplierSelection === true && (
        <Fragment>
          <Row>
            <Col md='12' sm='12' className='mb-1'>
              <Label className='form-label' for='supplier-name'>
                {t('cart.purchase.form.supplier.name')}
              </Label>
              <Controller
                defaultValue=''
                control={control}
                id='supplier-name'
                name='name'
                render={({ field }) =>
                  <Input
                    {...field}
                  />
                }
              />
            </Col>
          </Row>
          <Row>
            <Col md='6' sm='12' className='mb-1'>
              <Label className='form-label' for='supplier-city'>
                {t('cart.purchase.form.supplier.city')}
              </Label>
              <Controller
                defaultValue=''
                control={control}
                id='supplier-city'
                name='city'
                render={({ field }) =>
                  <Input
                    {...field}
                  />
                }
              />
            </Col>
            <Col md='6' sm='12' className='mb-1'>
              <Label className='form-label' for='supplier-phonenumber'>
                {t('cart.purchase.form.supplier.phonenumber')}
              </Label>
              <Controller
                defaultValue=''
                control={control}
                id='supplier-phonenumber'
                name='phonenumber'
                render={({ field }) =>
                  <Input
                    {...field}
                  />
                }
              />
            </Col>
          </Row>
        </Fragment>
      )}
      {supplierSelection === false && (
        <Fragment>
          <Row>
            <Col sm='12' className='mb-4'>
              <Select
              onChange={onSelectsupplier}
                className='react-select'
                classNamePrefix='select'
                isClearable={false}
                options={options}
              />
            </Col>
          </Row>
        </Fragment>
      )}

      <Row className='mb-2'>
        <Col className='d-flex flex-row-reverse' >
          <div className='d-flex' >
            <Button outline className='me-1' color='secondary' type='reset' onClick={handleReset}>
              {t('app.buttons.reset')}
            </Button>
            <Button color='primary' type='submit'>
              {t('app.buttons.submit')}
            </Button>
          </div>
        </Col>
      </Row>

    </Form>
  )
}
export default AddSupplier
