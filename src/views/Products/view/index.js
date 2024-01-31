// ** React Imports
import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'

// ** Store & Actions
import { find, setElementToEdit } from '../store'
import { useSelector, useDispatch } from 'react-redux'

// ** Reactstrap Imports
import { Row, Col, Alert } from 'reactstrap'

// ** User View Components
import ProductsTabs from './Tabs'
import InfoCard from './InfoCard/InfoCard'

// ** Styles
import '@styles/react/apps/app-users.scss'

const ProductView = () => {

  // ** Store Vars
  const store = useSelector(state => state.products)
  const dispatch = useDispatch()
  const [active, setActive] = useState('1')

  // ** Hooks
  const { id } = useParams()

  // ** Get client on mount
  useEffect(() => {
    console.log(id)
    dispatch(find(id))
  }, [dispatch, store.selectedProduct])

  const toggleTab = tab => {
    if (active !== tab) {
      setActive(tab)
    }
  }

  const editProduct = productId => {   
    dispatch(      
      setElementToEdit(productId)      
    )
  }

  return store.selectedProduct !== null && store.selectedProduct !== undefined ? (
    <div className='app-user-view'>
      <Row>
        <Col xl='4' lg='5' xs={{ order: 1 }} md={{ order: 0, size: 5 }}>
          <InfoCard 
            products={store.products}
            product={store.selectedProduct} 
            editProduct={editProduct}
          />
        </Col>
        <Col xl='8' lg='7' xs={{ order: 0 }} md={{ order: 1, size: 7 }}>
          <ProductsTabs active={active} toggleTab={toggleTab}/>
        </Col>
      </Row>
    </div>
  ) : (
    <Alert color='danger'>
      <h4 className='alert-heading'>Supplier not found</h4>
      <div className='alert-body'>
      Supplier with id: {id} doesn't exist. Check list of all Users: <Link to='/apps/user/list'>products List</Link>
      </div>
    </Alert>
  )
}
export default ProductView
