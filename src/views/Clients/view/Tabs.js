// ** React Imports
import { Fragment } from 'react'

// ** translation
import { useTranslation } from 'react-i18next'

// ** Reactstrap Imports
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap'

// ** Icons Imports
import { User, Lock } from 'react-feather'

// ** Client Components
import InvoiceList from './InvoiceList/InvoiceList'
import PaymentList from './PaymentList/PaymentList'

const ClientTabs = ({ active, toggleTab }) => {

  // ** translation
  const { t } = useTranslation()

  return (
    <Fragment>
      <Nav pills className='mb-2'>
        <NavItem>
          <NavLink active={active === '1'} onClick={() => toggleTab('1')}>
            <User className='font-medium-3 me-50' />
            <span className='fw-bold'>{t('clients.tabs.invoices')}</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink active={active === '2'} onClick={() => toggleTab('2')}>
            <Lock className='font-medium-3 me-50' />
            <span className='fw-bold'>{t('clients.tabs.payments')}</span>
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={active}>
        <TabPane tabId='1'>
          <InvoiceList />
        </TabPane>
        <TabPane tabId='2'>
          <PaymentList />
        </TabPane>
      </TabContent>
    </Fragment>
  )

}

export default ClientTabs
