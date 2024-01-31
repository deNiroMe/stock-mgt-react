// ** React Imports
import { Fragment } from 'react'

// ** translation
import { useTranslation } from 'react-i18next'

// ** Reactstrap Imports
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap'

// ** Icons Imports
import { User, Lock } from 'react-feather'

// ** Client Components
import ProductItemLines from './ProductItemLines/ProductItemLines'

const ProductTabs = ({ active, toggleTab }) => {

  // ** translation
  const { t } = useTranslation()

  return (
    <Fragment>
      <Nav pills className='mb-2'>
        <NavItem>
          <NavLink active={active === '1'} onClick={() => toggleTab('1')}>
            <User className='font-medium-3 me-50' />
            <span className='fw-bold'>{t('products.tabs.purchases')}</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink active={active === '2'} onClick={() => toggleTab('2')}>
            <Lock className='font-medium-3 me-50' />
            <span className='fw-bold'>{t('products.tabs.sales')}</span>
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={active}>
        <TabPane tabId='1'>
        <ProductItemLines type = 'SALE'/>
        </TabPane>
        <TabPane tabId='2'>
          <ProductItemLines type = 'PURCHASE'/>
        </TabPane>
      </TabContent>
    </Fragment>
  )

}

export default ProductTabs
