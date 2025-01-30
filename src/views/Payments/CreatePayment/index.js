// ** React Imports
import { useRef, useState } from 'react'

// ** Custom Components
import Wizard from '@components/wizard'

// ** Steps
import PaymentSource from './steps/PaymentSource'
import PaymentInfo from './steps/PaymentInfo'
import PaymentTable from './steps/PaymentTable'

// ** Icons Imports
import { FileText, User } from 'react-feather'

const CreatePayment = () => {
  // ** Ref
  const ref = useRef(null)

  // ** State
  const [stepper, setStepper] = useState(null)

  const steps = [
    {
      id: 'payment-source',
      title: 'Payment Source',
      subtitle: 'Select Payment source.',
      icon: <FileText size={18} />,
      content: <PaymentSource stepper={stepper} type='wizard-modern' />
    },
    {
      id: 'payment-info',
      title: 'Payment Info',
      subtitle: 'Enter Payment Infos.',
      icon: <FileText size={18} />,
      content: <PaymentInfo stepper={stepper} type='wizard-modern' />
    },
    {
      id: 'payment-table',
      title: 'Payment Table',
      subtitle: 'Select Payments to add.',
      icon: <User size={18} />,
      content: <PaymentTable stepper={stepper} type='wizard-modern' />
    }
  ]

  return (
    <div className='modern-horizontal-wizard'>
      <Wizard
        type='modern-horizontal'
        ref={ref}
        steps={steps}
        options={{
          linear: false
        }}
        instance={el => setStepper(el)}
      />
    </div>
  )
}

export default CreatePayment
