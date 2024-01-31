// ** React Imports
import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'

// ** Store & Actions
import { find, toggleSidebar, setElementToEdit } from '../store'
import { useSelector, useDispatch } from 'react-redux'

// ** Reactstrap Imports
import { Row, Col, Alert } from 'reactstrap'

// ** User View Components
import ClientTabs from './Tabs'
import InfoCard from './InfoCard/InfoCard'

// ** Styles
import '@styles/react/apps/app-users.scss'

const ClientView = () => {

  // ** Store Vars
  const store = useSelector(state => state.clients)
  const dispatch = useDispatch()
  const [active, setActive] = useState('1')

  // ** Hooks
  const { id } = useParams()

  // ** Get client on mount
  useEffect(() => {
    dispatch(find(id))
  }, [dispatch, store.sidebarOpen])

  const toggleTab = tab => {
    if (active !== tab) {
      setActive(tab)
    }
  }

  const setOpenSidebar = () => dispatch(toggleSidebar())

  const editClient = clientId => {   
    dispatch(      
      setElementToEdit(clientId)      
    )
  }

  return store.selectedClient !== null && store.selectedClient !== undefined ? (
    <div className='app-user-view'>
      <Row>
        <Col xl='4' lg='5' xs={{ order: 1 }} md={{ order: 0, size: 5 }}>
          <InfoCard 
            client={store.selectedClient} 
            open={store.sidebarOpen} 
            setOpenSidebar={setOpenSidebar} 
            editClient={editClient}
          />
        </Col>
        <Col xl='8' lg='7' xs={{ order: 0 }} md={{ order: 1, size: 7 }}>
          <ClientTabs active={active} toggleTab={toggleTab}/>
        </Col>
      </Row>
    </div>
  ) : (
    <Alert color='danger'>
      <h4 className='alert-heading'>User not found</h4>
      <div className='alert-body'>
        User with id: {id} doesn't exist. Check list of all Users: <Link to='/apps/user/list'>Users List</Link>
      </div>
    </Alert>
  )
}
export default ClientView
