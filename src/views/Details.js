import React from 'react'
import { Component } from "react";
import { connect } from 'react-redux'
import * as ApiActions from '../api/ApiActions'
import { Button, Card, CardHeader, Alert, CardBody, CardTitle, CardSubtitle, CardText, CardDeck } from 'reactstrap';
import { Link } from 'react-router-dom'

class Details extends Component {

    componentDidMount() {
        const _id = this.props.match.params.id
        console.log(_id)
        this.props.onLoadInvoive(_id)
        console.log(this.props.invoice)
    }

    render() {


        if (this.props.error) {
            return (
                <Alert color="danger">
                    <p>Error occured fetching invoice details</p>
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

        const payments = this.props.invoice.paymentDates
        return (

            <Card>
                <CardHeader>Ονομα εταιρίας: {this.props.invoice.name}</CardHeader>
                <CardBody>
                    <CardTitle>ΑΦΜ: {this.props.invoice.afm}</CardTitle>
                    <CardSubtitle>Αριθμός τιμολογίου: {this.props.invoice.billNumber}</CardSubtitle>
                    <CardText>Τελευταια πληρωμη: {this.props.invoice.billDate}</CardText>
                    <h5>Επιπλέον πληρωμές αν υπάρχουν</h5>
                    {payments && (
                        this.props.invoice.paymentDates.map(d =>
                            <CardDeck>
                                <Card>
                                    <CardText>Ποσό:{d.amount}</CardText>
                                    <CardText>Ημερομηνία:{d.date}</CardText>
                                </Card>
                            </CardDeck>
                        )

                    )

                    }
                    <Button color="success" tag={Link} to={"/form"}>Νέο τιμολόγιο</Button>
                </CardBody>

            </Card>

        )
    }


}

const matchStateToProps = (state) => {

    return {
        invoice: state.invoices
    }

}

const mapDispatchToProps = (dispatch) => {
    return {
        onLoadInvoive: _id => dispatch(ApiActions.loadSingleInvoice(_id))
    }
}

export default connect(matchStateToProps, mapDispatchToProps)(Details) 