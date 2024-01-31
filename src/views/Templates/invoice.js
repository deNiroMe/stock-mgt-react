[
    '{{repeat(125)}}',
    {
      id: '{{integer(100, 999)}}',
      reference: 'REF000{{integer(100, 999)}}',
      totalAmount: '{{floating(100, 400, 2, "0,0.00DH")}}',
      payedAmount: '{{floating(100, 400, 2, "0,0.00DH")}}',
      date: '{{date(new Date(2014, 0, 1), new Date(), "YYYY-MM-dd")}}',
      time: '{{date(new Date(2014, 0, 1), new Date(), "hh:mm")}}',
      client: 
        {
          id: '{{index()}}',
          name: '{{firstName()}} {{surname()}}'
        },
      salesPerson: 
        {
          id: '{{index()}}',
          name: '{{firstName()}} {{surname()}}'
        }
      
    }
]