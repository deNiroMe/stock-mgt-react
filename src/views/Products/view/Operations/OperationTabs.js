// ** React Imports
import { Fragment } from 'react'
import { useEffect, useLayoutEffect } from 'react'

// ** translation
import { useTranslation } from 'react-i18next'

// ** Reactstrap Imports
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap'

// ** Icons Imports
import { User, Lock } from 'react-feather'

// ** Store & Actions
import { getOperations } from '../../store/operations'
import { useDispatch } from 'react-redux'


const OperationTabs = ({ active, toggleTab, sales, purchases }) => {

  // ** translation
  const { t } = useTranslation()

  // dispatch
  const dispatch = useDispatch()

  useLayoutEffect(() => {   
    console.log('op tabs')
    dispatch( getOperations() )
  }, [dispatch])

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
          {purchases} 
        </TabPane>
        <TabPane tabId='2'>
          {sales} 
        </TabPane>
      </TabContent>
    </Fragment>
  )

}

export default OperationTabs
