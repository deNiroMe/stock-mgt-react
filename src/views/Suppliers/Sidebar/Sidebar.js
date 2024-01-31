// ** React Import
import { useState, useEffect } from 'react'

// ** Custom Components
import Sidebar from '@components/sidebar'

// ** Third Party Components
import { useForm, Controller } from 'react-hook-form'

// ** Reactstrap Imports
import { Button, Label, Form, Input } from 'reactstrap'

import { useTranslation } from 'react-i18next'

// ** Store & Actions
import { add, edit, setElementToEdit } from '../store'
import { useDispatch, useSelector } from 'react-redux'

const defaultValues = {
  id: -1,
  phone: '',
  city: '',
  name: ''
}

const SidebarNewSupplier = ({ open, toggleSidebar }) => {
  // ** States
  const store = useSelector(state => state.suppliers)
  const [data, setData] = useState(null)
  const [action, setAction] = useState('add')

  // ** Store Vars
  const dispatch = useDispatch()

  // ** translation
  const { t } = useTranslation()

  // ** Vars
  const {
    control,
    setValue,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues })

  useEffect(() => {
    if (Object.keys(store.toEditSupplier).length !== 0) {
      setAction('edit')
      setValue('id', store.toEditSupplier.id)
      setValue('name', store.toEditSupplier.name)
      setValue('city', store.toEditSupplier.city)
      setValue('phone', store.toEditSupplier.phone)
    } else {
      setAction('add')
    }
  }, [dispatch, store.sidebarOpen])

  // ** Function to handle form submit
  const onSubmit = data => {
    setData(data)
    if (checkIsValid(data)) {
      if (action === 'edit') {
        dispatch(
          edit({
            id: data.id,
            city: data.city,
            phone: data.phone,
            name: data.name
          })
        )
      } else {
        dispatch(
          add({
            id: Math.floor(Math.random() * 900),
            city: data.city,
            phone: data.phone,
            name: data.name
          })
        )
      }      
      toggleSidebar()
    }
  }

  const checkIsValid = data => {
    if (data.name === null || data.name === '') {
      setError('name', {
        type: 'manual'
      })
      return false
    } else if (store.suppliers.map(supplier => supplier.name).includes(data.name) && action != 'edit') {
      setError('name', {
        type: 'manual',
        message: 'supplier déja existant'
      })
      return false
    }
    return true
  }

  const handleSidebarClosed = () => {
    for (const key in defaultValues) {
      setValue(key, '')
    }
    setAction('add')
    dispatch(setElementToEdit(-1))
  }

  return (
    <Sidebar
      size='lg'
      open={open}
      title={action == 'add' ? t('suppliers.form.add') : t('suppliers.form.edit')}
      headerClassName='mb-1'
      contentClassName='pt-0'
      toggleSidebar={toggleSidebar}
      onClosed={handleSidebarClosed}
    >
      <Form onSubmit={handleSubmit(onSubmit)}>
        <div className='mb-1'>
          <Label className='form-label' for='name'>
            {t('suppliers.form.name')} <span className='text-danger'>*</span>
          </Label>
          <Controller
            name='name'
            control={control}
            render={({ field }) => (
              <Input id='name' placeholder='John Doe' invalid={errors.name && true} {...field} />
            )}
          />
          { errors.name && (
            <p>{errors.name.message}</p>
          )}
        </div>

        <div className='mb-1'>
          <Label className='form-label' for='phone'>
            {t('suppliers.form.phone')} <span className='text-danger'>*</span>
          </Label>
          <Controller
            name='phone'
            control={control}
            render={({ field }) => (
              <Input id='phone' placeholder='(397) 294-5153' invalid={errors.phone && true} {...field} />
            )}
          />
        </div>
        <div className='mb-1'>
          <Label className='form-label' for='city'>
            {t('suppliers.form.city')} <span className='text-danger'>*</span>
          </Label>
          <Controller
            name='city'
            control={control}
            render={({ field }) => (
              <Input id='city ' placeholder='Company Pvt Ltd' invalid={errors.city && true} {...field} />
            )}
          />
        </div>
        <Button type='submit' className='me-1' color='primary'>
          {action == 'add' ? t('suppliers.buttons.submit') : t('suppliers.buttons.edit')}
        </Button>
        <Button type='reset' color='secondary' outline onClick={toggleSidebar}>
          {t('suppliers.buttons.cancel')}
        </Button>
      </Form>
    </Sidebar>
  )
}

export default SidebarNewSupplier
