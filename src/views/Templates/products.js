[
    '{{repeat(99)}}',
    {
      id: '{{integer(100, 999)}}',
      name: '{{firstName()}}',
      price: '{{floating(100, 400, 2, "0,0.00DH")}}',
      date: '{{date(new Date(2014, 0, 1), new Date(), "YYYY-MM-dd")}}',
      purchasePrice: '{{floating(100, 400, 2, "0,0.00DH")}}',
      quantity: '{{integer(50, 109)}}',
      suppliers: [
        '{{repeat(0,1)}}',
        {
          id: '{{index()}}',
          name: '{{firstName()}} {{surname()}}'
        }
      ]
    }
]