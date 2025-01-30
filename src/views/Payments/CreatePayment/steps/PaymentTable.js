// ** React Imports
import { useState, useEffect, Fragment } from 'react'

// ** Store & Actions
import { useSelector, useDispatch } from 'react-redux'

// ** Reactstrap Imports
import { Card, CardBody, Row, Col, Input, Form, Button, Label } from 'reactstrap'
import DataTable from 'react-data-table-component'
import { ChevronDown, FileText, Archive } from 'react-feather'

// ** Third Party Components
import Flatpickr from 'react-flatpickr'
import Select from 'react-select'
import { useForm, Controller } from 'react-hook-form'

import '@styles/react/libs/flatpickr/flatpickr.scss'


const PaymentTable = () => {


  const columns = [
    {
      width: '10%',
      sortable: false,
      selector: _ => (
        <div className='form-check form-check-success'>
            <Input type='checkbox' id='success-checkbox' defaultChecked />
          </div>
      )
    },
    {
      name: 'reference',
      width: '20%',
      sortable: true,
      selector: row => row.reference
    },
    {
      name: 'Date',
      width: '15%',
      sortable: true,
      selector: row => row.date
    },
    {
      name: 'total price',
      width: '20%',
      sortable: true,
      selector: row => row.totalAmount
    },
    {
      name: 'payed amount',
      width: '15%',
      sortable: true,
      selector: row => row.payedAmount
    },
    {
      name: 'Amount to pay',
      width: '15%',
      sortable: true,
      selector: row => (
        <div className='column-action'>
          <Input type='text'
                  name='payedPrice'
                  id='payedPrice'
                  defaultValue={row.totalAmount - row.payedAmount}          
          >
                  
          </Input>
        </div>
      )
    }
  ]

  const payments = [
    {
      "reference": "PAIE000342",
      "date": "2017-09-25",
      "totalAmount": 186.46,
      "payedAmount": 106.46
    },
    {
      "reference": "PAIE000342",
      "date": "2017-09-28",
      "totalAmount": 1006.46,
      "payedAmount": 501.46
    },
    {
      "reference": "PAIE000342",
      "date": "2017-09-28",
      "totalAmount": 1006.46,
      "payedAmount": 501.46
    },
    {
      "reference": "PAIE000342",
      "date": "2017-09-28",
      "totalAmount": 1206.46,
      "payedAmount": 501.46
    }
  ]

  return (
    <Fragment>
        <div className='react-dataTable'>
          <DataTable
            noHeader         
            subHeader
            pagination
            responsive 
            columns={columns}
            data={payments}
            className='react-dataTable'
            sortIcon={<ChevronDown size={10} />}
          />
        </div>
    </Fragment >
  )
}

export default PaymentTable
