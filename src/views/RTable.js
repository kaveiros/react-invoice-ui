import React, { useEffect, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as ApiActions from '../api/ApiActions'
import {Alert, Table} from 'reactstrap'
import {Link} from 'react-router-dom'


const Rtable = () => {

    const invoices = useSelector(state => state.InvoiceReducer.invoices)
    const loading = useSelector(state => state.InvoiceReducer.loading)

    const dispatch = useDispatch()
    const onLoadInvoices = useCallback(() => dispatch(ApiActions.loadInvoices()), [])

    useEffect(() => {
        onLoadInvoices()

    }, [onLoadInvoices])

    
    let component
    if (loading) {
        component = <Alert color="dark">
            <p>Loading.....</p>
        </Alert>

    }
    else {

       
         component =  <Table>
         <thead>
           <tr>
             <th>ΑΦΜ</th>
             <th>Όνομα</th>
             <th>Αρ. Τιμολογίου</th>
             <th>Ποσό</th>
           </tr>
         </thead>
         <tbody>
              {invoices.map((data, i) => 
                 <tr key={i}>
                     <td><Link to={"/details/" + data._id}>{data.afm}</Link></td>
                     <td>{data.name}</td>
                     <td>{data.billNumber}</td>
                     <td>{data.mainAmount}</td>
                     </tr>
              )}
         </tbody>
       </Table>
    }


    return (
        <div>
           {component}
        </div>









    )

}


export default Rtable 