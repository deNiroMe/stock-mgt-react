// ** React Imports
import { Fragment } from 'react'

// ** translation
import { useTranslation } from 'react-i18next'

// ** Reactstrap Imports
import { Card, CardBody, Button, Badge } from 'reactstrap'

// ** Third Party Components
import Swal from 'sweetalert2'
import { Check, Briefcase } from 'react-feather'
import withReactContent from 'sweetalert2-react-content'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Store & Actions
import { remove } from '../../store'
import { useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom";

// ** Sidebar
import Sidebar from '../../Sidebar/Sidebar'

// ** Styles
import '@styles/react/libs/react-select/_react-select.scss'

const InfoCard = ({ supplier, open, editSupplier, setOpenSidebar }) => {

  const { t } = useTranslation()
  const navigate = useNavigate();
  
  const MySwal = withReactContent(Swal)

  // ** Store Vars
  const dispatch = useDispatch()

  const handleSuspendedClick = () => {
    return MySwal.fire({
      title: t('suppliers.swal.title'),
      text: t('suppliers.swal.text'),
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: t('suppliers.swal.confirmButtonText'),
      customClass: {
        confirmButton: 'btn btn-primary',
        cancelButton: 'btn btn-outline-danger ms-1'
      },
      buttonsStyling: false
    }).then(function (result) {
      if (result.value) {
        dispatch(      
          remove(supplier.id)      
        )        
        MySwal.fire({
          icon: 'success',
          title: t('suppliers.swal.success.title'),
          text: t('suppliers.swal.success.text'),
          confirmButtonText: t('suppliers.swal.success.confirmButtonText'),
          customClass: {
            confirmButton: 'btn btn-success'
          }
        }).then(function () { navigate("/suppliers"); })
      } else if (result.dismiss === MySwal.DismissReason.cancel) {
        MySwal.fire({          
          title: t('suppliers.swal.error.title'),
          text: t('suppliers.swal.error.text'),
          icon: 'error',
          customClass: {
            confirmButton: 'btn btn-success'
          }
        })
      }
    })
  }

  return (
    <Fragment>
      <Card>
        <CardBody>
          <div className='user-avatar-section'>
            <div className='d-flex align-items-center flex-column'>
            <Avatar
                initials
                color={supplier.avatarColor || 'light-warning'}
                className='rounded mt-3 mb-2'
                content= {supplier.name || 'A D'}
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
                  <h4>{supplier !== null ? supplier.name : 'Eleanor Aguilar'}</h4>
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
                <small>{t('suppliers.card.total_payments')}</small>
              </div>
            </div>
            <div className='d-flex align-items-start'>
              <Badge color='light-primary' className='rounded p-75'>
                <Briefcase className='font-medium-2' />
              </Badge>
              <div className='ms-75'>
                <h4 className='mb-0'>568</h4>
                <small>{t('suppliers.card.total_invoices')}</small>
              </div>
            </div>
          </div>
          <h4 className='fw-bolder border-bottom pb-50 mb-1'>{t('suppliers.card.details')}</h4>
          <div className='info-container'>
            {supplier !== null ? (
              <ul className='list-unstyled'>
                <li className='mb-75'>
                  <span className='fw-bolder me-25'>{t('suppliers.card.name')}</span>
                  <span>{supplier.name}</span>
                </li>                
                <li className='mb-75'>
                  <span className='fw-bolder me-25'>{t('suppliers.card.phone')}</span>
                  <span>{supplier.phone}</span>
                </li>
                <li className='mb-75'>
                  <span className='fw-bolder me-25'>{t('suppliers.card.city')}</span>
                  <span>{supplier.city}</span>
                </li>
              </ul>
            ) : null}
          </div>
          <div className='d-flex justify-content-center pt-2'>
            <Button color='primary'
              onClick={e => {
                e.preventDefault() 
                editSupplier(supplier.id)
              }}
            >
            {t('app.buttons.edit')}
            </Button>
            <Button className='ms-1' color='danger' outline onClick={handleSuspendedClick}>
            {t('app.buttons.delete')}
            </Button>
          </div>
        </CardBody>
      </Card>
      
      <Sidebar open={open} toggleSidebar={setOpenSidebar}/>
    </Fragment>
  )
}

export default InfoCard
