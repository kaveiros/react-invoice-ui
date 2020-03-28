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

    createNewHandler = () => {
        this.props.onCreateNewInvoice();

    }

    render() {


        if (this.props.error) {
            return (
                <Alert color="danger">
                    <p>Σφάλμα ανάκτησης τιμολογίου</p>
                </Alert>
            )

        }
        if (this.props.loading) {
            return (
                <Alert color="dark">
                    <p>Φορτώνει.....</p>
                </Alert>
            )

        }


        return (

            <Card>
                <CardHeader>Ονομα εταιρίας: {this.props.invoice.name}</CardHeader>
                <CardBody>
                    <CardTitle>ΑΦΜ: {this.props.invoice.afm}</CardTitle>
                    <CardSubtitle>Αριθμός τιμολογίου: {this.props.invoice.billNumber}</CardSubtitle>
                    <CardText>Τελευταια πληρωμη: {this.props.invoice.billDate}</CardText>
                    {this.props.invoice.paymentDates != null && this.props.invoice.paymentDates.length > 0 ?

                        (<div>
                            <h5>Επιπλέον πληρωμές αν υπάρχουν</h5>
                            {
                                this.props.invoice.paymentDates.map(d =>
                                    <CardDeck>
                                        <Card>
                                            <CardText>Ποσό:{d.amount}</CardText>
                                            <CardText>Ημερομηνία:{d.date}</CardText>
                                        </Card>
                                    </CardDeck>)}


                        </div>) : (<Alert color="secondary">
                            <p>Δεν υπάρχουν επιπλέον πληρωμές</p>
                            </Alert>) 
                            }
                    <Button color="success" onClick={this.createNewHandler} tag={Link} to={"/form"}>Νέο τιμολόγιο</Button>


                </CardBody>

            </Card>

        )
    }


}

const matchStateToProps = (state) => {

    return {
        invoice: state.InvoiceReducer.invoice
    }

}

const mapDispatchToProps = (dispatch) => {
    return {
        onLoadInvoive: _id => dispatch(ApiActions.loadSingleInvoice(_id)),
        onCreateNewInvoice: () => dispatch(ApiActions.createNewInvoice())
    }
}

export default connect(matchStateToProps, mapDispatchToProps)(Details) 