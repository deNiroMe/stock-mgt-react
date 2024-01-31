[
  '{{repeat(50)}}',
  {
    id: '{{integer(100, 999)}}',
    reference: 'PAIE000{{integer(100, 999)}}',
    totalAmount: '{{floating(100, 400, 2, "0,0.00DH")}}',
    date: '{{date(new Date(2014, 0, 1), new Date(), "YYYY-MM-dd")}}',
    time: '{{date(new Date(2014, 0, 1), new Date(), "hh:mm")}}',
    type: 'SALE',
    source: 
      {
        id: '{{index()}}',
        name: '{{firstName()}} {{surname()}}'
      },
    ventilation : [
      '{{repeat(1, 5)}}',
      {
        reference : 'REF000{{integer(100, 999)}}',
        payedAmount : '{{floating(10, 100, 2, "0,0.00DH")}}'
      }
    ]
    
  }
]