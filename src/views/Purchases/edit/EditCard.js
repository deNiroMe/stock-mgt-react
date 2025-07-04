// ** React Imports
import { useState } from 'react'

// ** Third Party Components
import Flatpickr from 'react-flatpickr'
import Repeater from '@components/repeater'
import { SlideDown } from 'react-slidedown'
import { X, Plus, Hash } from 'react-feather'

// ** Reactstrap Imports
import { Row, Col, Card, Input, Label, Button, CardBody, CardText, InputGroup, InputGroupText } from 'reactstrap'

// ** Styles
import 'react-slidedown/lib/slidedown.css'
import '@styles/react/libs/flatpickr/flatpickr.scss'
import '@styles/base/pages/app-invoice.scss'

const InvoiceEditCard = ({ invoice, items }) => {
  // ** States
  const [count, setCount] = useState(1)
  const [picker, setPicker] = useState(new Date())
  const [dueDatepicker, setDueDatePicker] = useState(new Date())

  // ** Deletes form
  const deleteForm = e => {
    e.preventDefault()
    e.target.closest('.repeater-wrapper').remove()
  }

  const note =
    'It was a pleasure working with you and your team. We hope you will keep us in mind for future freelance projects. Thank You!'

  return (
    <Card className='invoice-preview-card'>
      {/* Header */}
      <CardBody className='invoice-padding pb-0'>
        <div className='d-flex justify-content-between flex-md-row flex-column invoice-spacing mt-0'>
          <div>
            <div className='logo-wrapper'>
              <svg viewBox='0 0 139 95' version='1.1' height='24'>
                <defs>
                  <linearGradient id='invoice-linearGradient-1' x1='100%' y1='10.5120544%' x2='50%' y2='89.4879456%'>
                    <stop stopColor='#000000' offset='0%'></stop>
                    <stop stopColor='#FFFFFF' offset='100%'></stop>
                  </linearGradient>
                  <linearGradient
                    id='invoice-linearGradient-2'
                    x1='64.0437835%'
                    y1='46.3276743%'
                    x2='37.373316%'
                    y2='100%'
                  >
                    <stop stopColor='#EEEEEE' stopOpacity='0' offset='0%'></stop>
                    <stop stopColor='#FFFFFF' offset='100%'></stop>
                  </linearGradient>
                </defs>
                <g stroke='none' strokeWidth='1' fill='none' fillRule='evenodd'>
                  <g transform='translate(-400.000000, -178.000000)'>
                    <g transform='translate(400.000000, 178.000000)'>
                      <path
                        className='text-primary'
                        d='M-5.68434189e-14,2.84217094e-14 L39.1816085,2.84217094e-14 L69.3453773,32.2519224 L101.428699,2.84217094e-14 L138.784583,2.84217094e-14 L138.784199,29.8015838 C137.958931,37.3510206 135.784352,42.5567762 132.260463,45.4188507 C128.736573,48.2809251 112.33867,64.5239941 83.0667527,94.1480575 L56.2750821,94.1480575 L6.71554594,44.4188507 C2.46876683,39.9813776 0.345377275,35.1089553 0.345377275,29.8015838 C0.345377275,24.4942122 0.230251516,14.560351 -5.68434189e-14,2.84217094e-14 Z'
                        style={{ fill: 'currentColor' }}
                      ></path>
                      <path
                        d='M69.3453773,32.2519224 L101.428699,1.42108547e-14 L138.784583,1.42108547e-14 L138.784199,29.8015838 C137.958931,37.3510206 135.784352,42.5567762 132.260463,45.4188507 C128.736573,48.2809251 112.33867,64.5239941 83.0667527,94.1480575 L56.2750821,94.1480575 L32.8435758,70.5039241 L69.3453773,32.2519224 Z'
                        fill='url(#invoice-linearGradient-1)'
                        opacity='0.2'
                      ></path>
                      <polygon
                        fill='#000000'
                        opacity='0.049999997'
                        points='69.3922914 32.4202615 32.8435758 70.5039241 54.0490008 16.1851325'
                      ></polygon>
                      <polygon
                        fill='#000000'
                        opacity='0.099999994'
                        points='69.3922914 32.4202615 32.8435758 70.5039241 58.3683556 20.7402338'
                      ></polygon>
                      <polygon
                        fill='url(#invoice-linearGradient-2)'
                        opacity='0.099999994'
                        points='101.428699 0 83.0667527 94.1480575 130.378721 47.0740288'
                      ></polygon>
                    </g>
                  </g>
                </g>
              </svg>
              <h3 className='text-primary invoice-logo'>Vuexy</h3>
            </div>
            <p className='card-text mb-25'>Office 149, 450 South Brand Brooklyn</p>
            <p className='card-text mb-25'>San Diego County, CA 91905, USA</p>
            <p className='card-text mb-0'>+1 (123) 456 7891, +44 (876) 543 2198</p>
          </div>
          <div className='invoice-number-date mt-md-0 mt-2'>
            <div className='d-flex align-items-center justify-content-md-end mb-1'>
              <h4 className='invoice-title'>Invoice</h4>
              <InputGroup className='input-group-merge invoice-edit-input-group disabled'>
                <InputGroupText>
                  <Hash size={15} />
                </InputGroupText>
                <Input
                  type='number'
                  className='invoice-edit-input'
                  value={invoice.id}
                  placeholder='53634'
                  disabled
                />
              </InputGroup>
            </div>
            <div className='d-flex align-items-center mb-1'>
              <span className='title'>Date:</span>
              <Flatpickr
                value={picker}
                onChange={date => setPicker(date)}
                className='form-control invoice-edit-input date-picker'
              />
            </div>
            <div className='d-flex align-items-center'>
              <span className='title'>Due Date:</span>
              <Flatpickr
                value={dueDatepicker}
                onChange={date => setDueDatePicker(date)}
                className='form-control invoice-edit-input due-date-picker'
              />
            </div>
          </div>
        </div>
      </CardBody>
      {/* /Header */}

      <hr className='invoice-spacing' />

      {/* Product Details */}
      <CardBody className='invoice-padding invoice-product-details'>
        {items.map((item, i) => {

          return (
              <Row className='repeater-wrapper'>
                <Col className='d-flex product-details-border position-relative pe-0' sm='12'>
                  <Row className='w-100 pe-lg-0 pe-1 py-2'>
                    <Col className='mb-lg-0 mt-2' lg='5' sm='12'>
                      <CardText className='col-title mb-md-50 mb-0'>Item</CardText>
                      <Input defaultValue={item.product.name} />
                    </Col>
                    <Col className='my-lg-0 mt-2' lg='2' sm='12'>
                      <CardText className='col-title mb-md-50 mb-0'>Price</CardText>
                      <Input type='number' defaultValue={item.price} />
                    </Col>
                    <Col className='my-lg-0 my-2' lg='2' sm='12'>
                      <CardText className='col-title mb-md-2 mb-0'>Qty</CardText>
                      <Input type='number' defaultValue={item.quantity}  />
                    </Col>
                  </Row>
                  <div className='d-flex justify-content-center border-start invoice-product-actions py-50 px-25'>
                    <X size={18} className='cursor-pointer' onClick={deleteForm} />
                  </div>
                </Col>
              </Row>
          )
        })}

      </CardBody>
      {/* /Product Details */}

      {/* Invoice Total */}
      <CardBody className='invoice-padding'>
        <Row className='invoice-sales-total-wrapper'>
          <Col className='mt-md-0 mt-3' md={{ size: '6', order: 1 }} xs={{ size: 12, order: 2 }}>
            <div className='d-flex align-items-center mb-1'>
              <Label for='salesperson' className='form-label'>
                Salesperson:
              </Label>
              <Input type='text' className='ms-50' id='salesperson' placeholder='Edward Crowley' />
            </div>
          </Col>
          <Col className='d-flex justify-content-end' md={{ size: '6', order: 2 }} xs={{ size: 12, order: 1 }}>
            <div className='invoice-total-wrapper'>
              <div className='invoice-total-item'>
                <p className='invoice-total-title'>Subtotal:</p>
                <p className='invoice-total-amount'>$1800</p>
              </div>
              <div className='invoice-total-item'>
                <p className='invoice-total-title'>Discount:</p>
                <p className='invoice-total-amount'>$28</p>
              </div>
              <div className='invoice-total-item'>
                <p className='invoice-total-title'>Tax:</p>
                <p className='invoice-total-amount'>21%</p>
              </div>
              <hr className='my-50' />
              <div className='invoice-total-item'>
                <p className='invoice-total-title'>Total:</p>
                <p className='invoice-total-amount'>$1690</p>
              </div>
            </div>
          </Col>
        </Row>
      </CardBody>
      {/* /Invoice Total */}

      <span className='invoice-spacing mt-0' ></span>

    </Card>
  )
}

export default InvoiceEditCard
