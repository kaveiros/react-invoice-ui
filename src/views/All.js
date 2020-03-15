import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Alert, Table } from 'reactstrap'
import { loadInvoices } from '../api/Api'
//import FilterableTable from 'react-filterable-table'

class All extends Component {

    componentDidMount() {
        console.log("Invoices")
        console.log(this.props.loadInvoices());
    }


    render() {
        const tableContents = this.props.bills.data.data
        console.log(tableContents)
        // return(<div>LOADING.....</div>)

        if (tableContents) {
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
                            tableContents.map(data =>
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
        else return (
            <div>
                <Alert color="dark">
                    <p>No invoices found</p>
                </Alert>
            </div>
        )

    }

}



const mapStateToProps = (state) => {
    console.log("Inside map state to props")
    console.log(state)
    return {
        bills: state
    }
}

const mapDispatchToProps = {
    loadInvoices
}
export default connect(mapStateToProps, mapDispatchToProps)(All)