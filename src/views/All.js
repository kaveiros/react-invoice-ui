import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Alert, Table } from 'reactstrap'
import * as ApiActions from '../api/ApiActions'
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


            return (
                <Table>
                    <thead>
                        <tr>
                            <th>AFM</th>
                            <th>Name</th>
                            <th>Invoice number</th>
                            <th>Remaining Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.props.invoices.map(data =>
                                <tr key={data._id}>
                                    <td>{data.afm}</td>
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