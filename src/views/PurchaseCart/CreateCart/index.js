// ** React Imports
import { useRef, useState } from 'react'

// ** Custom Components
import Wizard from '@components/wizard'

// ** Third Party Components
import { useTranslation } from 'react-i18next'

// * reactstrap components
import { Row } from 'reactstrap'

// ** Icons Imports
import { FileText, User, MapPin } from 'react-feather'

// ** Steps
import AddItems from './steps/AddItems'
import AddSupplier from './steps/AddSupplier'
import CompleteCart from './steps/CompleteCart'
import ItemsList from './ItemsList'

const CreateCart = () => {

  // ** Ref
  const ref = useRef(null)

  // ** translation 
  const { t } = useTranslation()

  // ** State
  const [stepper, setStepper] = useState(null)

  const steps = [
    {
      id: 'account-details',
      title: t('cart.purchase.stepper.title.select_products'),
      subtitle: t('cart.purchase.stepper.subtitle.select_products_info'),
      icon: <FileText size={18} />,
      content: <AddItems type='modern-vertical' />
    },
    {
      id: 'personal-info',
      title: t('cart.purchase.stepper.title.select_supplier'),
      subtitle: t('cart.purchase.stepper.subtitle.select_supplier_info'),
      icon: <User size={18} />,
      content: <AddSupplier type='modern-vertical' />
    },
    {
      id: 'step-address',
      title: t('cart.purchase.stepper.title.invoice_details'),
      subtitle: t('cart.purchase.stepper.subtitle.invoice_details_info'),
      icon: <MapPin size={18} />,
      content: <CompleteCart  type='modern-vertical' />
    }
  ]
  
  return (    
    <div className='modern-vertical-wizard'>
      <Row className='mb-2'>
        <Wizard
          type='modern-vertical'
          ref={ref}
          steps={steps}
          options={{
            linear: false
          }}
          instance={el => setStepper(el)}
        />
      </Row>
      <ItemsList stepper={stepper} />
    </div>
  )
}

export default CreateCart
