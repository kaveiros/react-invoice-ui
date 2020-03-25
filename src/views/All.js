import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Alert, Table } from 'reactstrap'
import * as ApiActions from '../api/ApiActions'
import { Link } from 'react-router-dom'
//import FilterableTable from 'react-filterable-table'

class All extends Component {

    
    componentDidMount() {
        this.props.onLoadInvoices()
       console.log(this.props);
    }
    



    render() {



        if (this.props.error) {
            return (
                <Alert color="danger">
                    <p>Error occured fetching invoices</p>
                </Alert>
            )

        }
        if (this.props.loading) {
            return (
                <Alert color="dark">
                    <p>Loading.....</p>
                </Alert>
            )

        }

        if(!this.props.invoices) {
            return (
                <Alert color="dark">
                    <p>Loading.....</p>
                </Alert>
            )        }


            return (
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
                            this.props.invoices.map(data =>
                                <tr key={data._id}>
                                    <td><Link to={"/details/" + data._id}>{data.afm}</Link></td>
                                    <td>{data.name}</td>
                                    <td>{data.billNumber}</td>
                                    <td>{data.remainingAmount}</td>

                                </tr>
                            )}


                    </tbody>
                </Table>
            )




    }
    

}



const mapStateToProps = (state) => {
 
    return {
        invoices: state.invoices,
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