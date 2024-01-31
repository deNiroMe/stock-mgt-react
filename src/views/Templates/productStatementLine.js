[
  '{{repeat(100)}}',
  {
    id: '{{integer(100, 999)}}',
    type: 'SALE',
    date: '{{date(new Date(2014, 0, 1), new Date(), "YYYY-MM-dd")}}',
    time: '{{date(new Date(2014, 0, 1), new Date(), "hh:mm:ss Z")}}',
    referenceId: '{{integer(100, 999)}}',
    price: '{{floating(100, 400, 2, "0,0.00DH")}}',
    quantity: '{{integer(50, 109)}}',
    product: [
      {
        id: '{{integer(100, 999)}}',
        name: '{{firstName()}} {{surname()}}'
      }
    ]
  }
] 