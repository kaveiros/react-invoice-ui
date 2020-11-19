import React, { Component, useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import DatePicker from 'reactstrap-date-picker'
import * as formActions from '../actions/FormActions'
import { connect } from 'react-redux';
import { v4 as uuidv4 } from "uuid";
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'


const InvoiceEdit = () => {
    const params = useParams()
    const baseUrl = "http://localhost:3000/"
    let _id = params.id
    const blankPayment = { amount: 0, date: 123 }
    const [paymenComponent, setPaymentComponent] = useState(0)
    const [payments, setPayments] = useState([])


    useEffect(() => {

        if (_id) {
            axios.get(baseUrl + "invoice/" + _id)
                .then(response => {
                    console.log(response.data)
                }).catch(error => {
                    console.log(error.message)

                })
        }
        else {
            console.log("No _id")
        }

    }, [_id])

    const [stateInvoice, setStateInvoice] = useState({});
    let state = {
        afm: 0,
        mainAmount: 0,
        mainDate: new Date().toISOString(),
        modalOpen: false,
        modalAmount: 0,
        modalDate: new Date().toISOString(),
        name: ""
    }

    /**
     * Toggle modal
     */
    const toggleModal = () => {
        let isOpen = this.state.modalOpen
        console.log(isOpen)
        console.log(this.state)
        if (!isOpen) {
            this.setState({ modalOpen: true })
        }
        else {
            this.setState({ modalOpen: false })
        }
    }

    /**
     * Main form events
     */
    const addAfm = (event) => {
        this.setState({ afm: event.target.value })
    }

    const addPayment = (event) => {
        setPayments(payments => [...payments, { amount: 0, date: 123 }])
        console.log(payments)

    }

    const nameChanged = (e) => {
        console.log("amount changed to " + e.target.value)

        this.setState({ name: e.target.value })

    }

    const mainAmountChanged = (e) => {
        console.log("amount changed to " + e.target.value)

        this.setState({ mainAmount: e.target.value })

    }


    const mainDateChanged = (e, f) => {

        this.setState({ mainDate: e })

    }


    const modalAmountChanged = (e) => {

        this.setState({ modalAmount: e.target.value })
    }



    const modalDateChanged = (e, f) => {
        console.log("date is " + e + " => " + f)
        this.setState({ modalDate: e })

    }

    const addModalPayment = (e) => {
        e.preventDefault()
        let id = uuidv4()
        this.setState({
            additionalPayments: [...this.state.additionalPayments, {
                additionalId: id,
                additionalAmount: this.state.modalAmount,
                additionalDate: this.state.modalDate
            }]
        })
        this.setState({ modalOpen: false })
        console.log(this.state.additionalPayments)
    }

    const deleteFunction = (event) => {
        setPayments(payments.filter(item => item.date !== 123))
        console.log(event.target)

    }

    const submitForm = (e) => {
        e.preventDefault()
        console.log("Form has been sunbmitted")
        console.log(this.state)
        this.props.onSavePayment(this.state)
    }





    return (
        <Container>
            <Card>
                <Card.Header>{_id ? "Τροποποίηση" : "Νέο τιμολογίο"}</Card.Header>
                <Card.Body>
                    <Form onSubmit={(e) => { this.submitForm(e) }}>
                        <Form.Group>
                            <Form.Label>ΑΦΜ</Form.Label>
                            <Form.Control type="input" name="email" id="afm" placeholder="ΑΦΜ" value="" />
                            {/* onChange={(e) => { this.addAfm(e) }} /> */}
                            <Form.Label>Όνομα</Form.Label>
                            <Form.Control type="input" name="name" id='name' placeholder="Όνομα εταιρίας" />
                            {/* onChange={(e) => { this.nameChanged(e) }} /> */}
                            <Form.Label>Ποσό Πληρωμής</Form.Label>
                            <Form.Control type="input" name="amount" id='payment' placeholder="amount" />
                            {/* onChange={(e) => { this.mainAmountChanged(e) }} /> */}
                            <Form.Label>Ημερομηνία πληρωμής</Form.Label>
                            <DatePicker dateFormat="DD MM YYYY" value={state.mainDate} />
                            {/* onChange={(e, f) => { this.mainDateChanged(e, f) }} /> */}
                            <Button variant="info" onClick={addPayment}>Προσθήκη Πληρωμής</Button>
                        </Form.Group>
                        <Button variant="success" type="submit">Αποθήκευση</Button>
                        <Button variant="secondary" tag={Link} to={"/all"}>Πίσω</Button>
                    </Form>
                    {payments.map((payment, idx) =>
                        <div key={idx}>
                            <Form.Group>
                                <Form.Label>Ποσό Πληρωμής</Form.Label>
                                <Form.Control type="input" name="amount" id={idx} placeholder="amount" onChange={(e) => { this.amountChanged(e) }} />
                                <Form.Label>Ημερομηνία πληρωμής</Form.Label>
                                <DatePicker id={"date-" + idx} dateFormat="DD MM YYYY"  onChange={(e, f) => { this.dateChanged(e, f) }} />
                                <Button id={"delete-" + idx} onClick={()=>deleteFunction(idx)}>delete</Button>
                            </Form.Group>
                        </div>)}
                </Card.Body>
            </Card>
        </Container>
    )


}


const mapStateToProps = (state) => {

    return {
        payments: state.FormReducer.payments
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAddPayment: (id) => dispatch(formActions.addPayment(this.state)),
        onRemovePayment: (index) => dispatch(formActions.removePayment(index)),
        onFetchPayments: () => dispatch(formActions.fetchPayments()),
        onSavePayment: (payment) => dispatch(formActions.savePayment(payment))
    }
}


//export default connect(mapStateToProps, mapDispatchToProps)(InvoiceEdit)
export default InvoiceEdit