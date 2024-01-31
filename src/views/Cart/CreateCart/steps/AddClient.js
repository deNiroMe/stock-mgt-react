// ** React Imports
import { Fragment, useEffect, useState } from 'react'

// ** Store & Actions
import { useSelector, useDispatch } from 'react-redux'
import { setClient } from '../../store/index'
import { getAllData } from '../../../Clients/store'

// ** Reactstrap Imports
import { Col, Input, Form, Button, Label, Row } from 'reactstrap'

// ** Third Party Components
import { useTranslation } from 'react-i18next'
import Select from 'react-select'
import { useForm, Controller } from 'react-hook-form'

const AddClient = () => {

  // State
  const [clientSelection, setClientSelection] = useState(false)
  const [options, setOptions] = useState([])

  // ** Store Vars
  const dispatch = useDispatch()
  const store = useSelector(state => state.clients)

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
    const options = store.clients.map(p => {
      return { value: p.id, label: p.name }
    })
    setOptions(options)
  }, [dispatch, store.clients])

  const onSubmit = data => {
    // TO DO validate data
    const client = {
      newClient : data.new_client === 'yes' ? true : false,
      selectedClient : data.client,
      name: data.name,
      city: data.city,
      phonenumber: data.phonenumber
    }
    dispatch(setClient(client))
  }

  const onSelectClient = option => { 
    setValue('client', {id: option.value, name: option.label})
  }

  const handleRadioBtnCheck = e => {
    setClientSelection(e.target.value === 'yes')
    setValue('new_client', e.target.value)
  }

  const handleReset = () => {
    reset({
      new_client: 'yes',
      selectedClient: {},
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
              id='select-client-radio'
              type='radio'
              value='no'
              name='new_client'
              checked={clientSelection === false}
              onClick={(e) => handleRadioBtnCheck(e)}
              {...register('new_client')}
            />
            <Label className='form-check-label' for='select-client-radio'>
              {t('cart.form.client.select_client')}
            </Label>
          </div>
        </Col>
        <Col xs={6}>
          <div className='form-check mb-1'>
            <Input
              id='new-client-radio'
              type='radio'
              value='yes'
              name='new_client'
              checked={clientSelection === true}
              onClick={(e) => handleRadioBtnCheck(e)}
              {...register('new_client')}
            />
            <Label className='form-check-label' for='new-client-radio'>
              {t('cart.form.client.add_client')}
            </Label>
          </div>
        </Col>
      </Row>
      {clientSelection === true && (
        <Fragment>
          <Row>
            <Col md='12' sm='12' className='mb-1'>
              <Label className='form-label' for='client-name'>
                {t('cart.form.client.name')}
              </Label>
              <Controller
                defaultValue=''
                control={control}
                id='client-name'
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
              <Label className='form-label' for='client-city'>
                {t('cart.form.client.city')}
              </Label>
              <Controller
                defaultValue=''
                control={control}
                id='client-city'
                name='city'
                render={({ field }) =>
                  <Input
                    {...field}
                  />
                }
              />
            </Col>
            <Col md='6' sm='12' className='mb-1'>
              <Label className='form-label' for='client-phonenumber'>
                {t('cart.form.client.phonenumber')}
              </Label>
              <Controller
                defaultValue=''
                control={control}
                id='client-phonenumber'
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
      {clientSelection === false && (
        <Fragment>
          <Row>
            <Col sm='12' className='mb-4'>
              <Select
              onChange={onSelectClient}
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
export default AddClient
