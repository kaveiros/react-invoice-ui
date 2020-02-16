import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Alert} from 'reactstrap'
import FilterableTable from 'react-filterable-table'

class All extends Component {

    render() {
        
        if (this.props.bills.length > 0) {
            return (
                    this.props.bills.map(bill =>
                    <div>
                        <div>{bill._id}</div>
                        <div>{bill.afm}</div>
                        <div>{bill.name}</div>
                    </div>
                    )
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
    console.log(state)
    return {
        bills: state
    }
}
export default connect(mapStateToProps)(All)