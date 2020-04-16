import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Alert, Table } from 'reactstrap'
import * as ApiActions from '../api/ApiActions'
import { Link } from 'react-router-dom'
//import FilterableTable from 'react-filterable-table'

class All extends Component {

    
    componentDidMount() {
        this.props.onLoadInvoices()
       //console.log(this.props);
    }
    



    render() {

        const {error} = this.props





            return (
                <div>

                {this.props.error && (
            
                    <Alert color="danger">
                        <p>Error occured fetching invoices</p>
                    </Alert>
                )
    
            }
            {this.props.loading &&
                (
                    <Alert color="dark">
                        <p>Loading.....</p>
                    </Alert>
                )
    
            }
    
            {!this.props.invoices &&
                (
                    <Alert color="dark">
                        <p>Loading.....</p>
                    </Alert>
                )        
            }
            {console.log(this.props)}
            {!error && (
                <Table>
                <thead>
                    <tr>
                        <th>ΑΦΜ</th>
                        <th>Όνομα</th>
                        <th>Αρ. Τιμολογίου</th>
                        <th>Υπόλοιπο</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.props.invoices.map((data, index) =>
                            <tr key={index}>
                                <td><Link to={"/details/" + data._id}>{data.afm}</Link></td>
                                <td>{data.name}</td>
                                <td>{data.billNumber}</td>
                                <td>{data.mainAmount}</td>

                            </tr>
                        )}


                </tbody>
            </Table>

            )

            }




                </div>
            )




    }
    

}



const mapStateToProps = (state) => {
 
    return {
        invoices: state.InvoiceReducer.invoices,
        loading: state.loading,
        error: state.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        
        onLoadInvoices: () => dispatch(ApiActions.loadInvoices())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(All)