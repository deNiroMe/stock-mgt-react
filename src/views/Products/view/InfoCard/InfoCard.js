// ** React Imports
import { useState, Fragment } from 'react'

// ** translation
import { useTranslation } from 'react-i18next'

// ** Reactstrap Imports
import { Card, CardBody, Button, Badge, Row } from 'reactstrap'

// ** Third Party Components
import Swal from 'sweetalert2'
import { Check, Briefcase } from 'react-feather'
import withReactContent from 'sweetalert2-react-content'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Store & Actions
import { remove, setElementToEdit } from '../../store'
import { useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom";

// * Compenents 
import { EditProduct } from '../../Modal/EditProduct'

// ** Styles
import '@styles/react/libs/react-select/_react-select.scss'

const InfoCard = ({ products, product }) => {

  const { t } = useTranslation()

  const navigate = useNavigate()

  const MySwal = withReactContent(Swal)

  // Modal 
  const [show, setShow] = useState(false)

  // ** Store Vars
  const dispatch = useDispatch()

  const handleSuspendedClick = () => {
    return MySwal.fire({
      title: t('products.swal.title'),
      text: t('products.swal.text'),
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: t('products.swal.confirmButtonText'),
      customClass: {
        confirmButton: 'btn btn-primary',
        cancelButton: 'btn btn-outline-danger ms-1'
      },
      buttonsStyling: false
    }).then(function (result) {
      if (result.value) {
        dispatch(
          remove(product.id)
        )
        MySwal.fire({
          icon: 'success',
          title: t('products.swal.success.title'),
          text: t('products.swal.success.text'),
          confirmButtonText: t('products.swal.success.confirmButtonText'),
          customClass: {
            confirmButton: 'btn btn-success'
          }
        }).then(function () { navigate("/products"); })
      } else if (result.dismiss === MySwal.DismissReason.cancel) {
        MySwal.fire({
          title: t('products.swal.error.title'),
          text: t('products.swal.error.text'),
          icon: 'error',
          customClass: {
            confirmButton: 'btn btn-success'
          }
        })
      }
    })
  }

  const editProduct = () => {
    console.log(product)
    dispatch(
      setElementToEdit(product.id)
    )
    setShow(true)
  }

  return (
    <Fragment>
      <Card>
        <CardBody>
          <Row >
            <div className='user-avatar-section'>
              <div className='d-flex align-items-center flex-column'>
                <Avatar
                  initials
                  color={product.avatarColor || 'light-success'}
                  className='rounded mt-3 mb-2'
                  content={product.name || 'A D'}
                  contentStyles={{
                    borderRadius: 0,
                    fontSize: 'calc(48px)',
                    width: '100%',
                    height: '100%'
                  }}
                  style={{
                    height: '110px',
                    width: '110px'
                  }}
                />
                <div className='d-flex flex-column align-items-center text-center'>
                  <div className='user-info'>
                    <h4>{product !== null ? product.name : 'Eleanor Aguilar'}</h4>
                  </div>
                </div>
              </div>
            </div>
            <div className='d-flex justify-content-around my-2 pt-75'>
              <div className='d-flex align-items-start me-2'>
                <Badge color='light-primary' className='rounded p-75'>
                  <Check className='font-medium-2' />
                </Badge>
                <div className='ms-75'>
                  <h4 className='mb-0'>1.23k</h4>
                  <small>{t('products.card.total_purchases')}</small>
                </div>
              </div>
              <div className='d-flex align-items-start'>
                <Badge color='light-primary' className='rounded p-75'>
                  <Briefcase className='font-medium-2' />
                </Badge>
                <div className='ms-75'>
                  <h4 className='mb-0'>568</h4>
                  <small>{t('products.card.total_sales')}</small>
                </div>
              </div>
            </div>
            <h4 className='fw-bolder border-bottom pb-50 mb-1 text-center'>{t('products.card.details')}</h4>
            <div className='info-container'>
              {product !== null ? (
                <ul className='list-unstyled'>
                  <li className='mb-75'>
                    <span className='fw-bolder me-25'>{t('products.card.name')}</span>
                    <span className='float-end pe-2'>{product.name}</span>
                  </li>
                  <li className='mb-75'>
                    <span className='fw-bolder me-25'>{t('products.card.date')}</span>
                    <span className='float-end pe-2'>{product.date}</span>
                  </li>
                  <li className='mb-75'>
                    <span className='fw-bolder me-25'>{t('products.card.price')}</span>
                    <span className='float-end pe-2'>{product.price}</span>
                  </li>
                  <li className='mb-75'>
                    <span className='fw-bolder me-25'>{t('products.card.purchasePrice')}</span>
                    <span className='float-end pe-2'>{product.purchasePrice}</span>
                  </li>
                  <li className='mb-75'>
                    <span className='fw-bolder me-25'>{t('products.card.quantity')}</span>
                    <span className='float-end pe-2'>{product.quantity}</span>
                  </li>
                  <li className='mb-75'>
                    <span className='fw-bolder me-25'>{t('products.card.suppliers')}</span>
                    <span className='float-end pe-2'>
                      {product
                        .suppliers
                        .map(s => <span><Badge className='text-capitalize' color='light-secondary' pill>{s.name}</Badge></span>)
                      }
                    </span>
                  </li>
                </ul>
              ) : null}
            </div>
          </Row>
          <Row >
            <div className='d-flex justify-content-center pt-2'>
              <Button color='primary' onClick={editProduct}>
                {t('app.buttons.edit')}
              </Button>
              <Button className='ms-1' color='danger' outline onClick={handleSuspendedClick}>
                {t('app.buttons.delete')}
              </Button>
            </div>
          </Row>
        </CardBody>
      </Card>

      <EditProduct products={products} show={show} setShow={setShow} />

    </Fragment>
  )
}

export default InfoCard
