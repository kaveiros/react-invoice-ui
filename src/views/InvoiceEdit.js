import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import * as formActions from '../actions/FormActions'
import { v4 as uuidv4 } from "uuid";
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


const InvoiceEdit = () => {
    const params = useParams()
    const baseUrl = "http://localhost:3000/"
    let _id = params.id
    const blankPayment = { id: uuidv4(), amount: 0, date: new Date() }
    const [paymenComponent, setPaymentComponent] = useState(0)
    const [payments, setPayments] = useState([])
    const [startDate, setStartDate] = useState(new Date());
    const [name, setName] = useState()
    const [afm, setAfm] = useState()
    const [mainAmount, setMainAmount] = useState(0)


    useEffect(() => {

        const getPaymentIfexists = () => {
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

        }

        getPaymentIfexists();



    }, [_id])

    const [stateInvoice, setStateInvoice] = useState({});
    // let state = {
    //     afm: 0,
    //     mainAmount: 0,
    //     mainDate: new Date().toISOString(),
    //     modalOpen: false,
    //     modalAmount: 0,
    //     modalDate: new Date().toISOString(),
    //     name: ""
    // }


    /**
     * Main form events
     */
    const handleAfm = (event) => {
        setAfm(event.target.value)
    }

    const addPayment = (event) => {
        console.log(payments.length)
        setPayments(payments => [...payments, blankPayment])
        console.log(payments)

    }

    const handleName = (e) => {
        setName(e.target.value)
        console.log(name)
    }

    const handleMainAmount = (e) => {
        setMainAmount(e.target.value)
        console.log(mainAmount)
    }


    const handleMainDate = (dateEvent) => {
        setStartDate(dateEvent)
        console.log(dateEvent)
    }

    const handleDate = (date, dateId) => {
        let newPayments = payments.map((payment, index) => payment.id === dateId ? { id: payment.id, amount: payment.amount, date: date } : payment)
        console.log(newPayments)
        setPayments(newPayments)
    }

    const handleAmount = (e) => {

        let paymentId = e.target.id
        let amount = e.target.value
        let newPayments = payments.map((payment, index) => payment.id === paymentId ? { id: payment.id, amount: amount, date: payment.date } : payment)
        setPayments(newPayments)
        console.log(newPayments)

    }

    const deleteFunction = (id) => {
        setPayments(payments.filter(item => item.id !== id))
        console.log(id)

    }

    const submitForm = (e) => {
        e.preventDefault()
        console.log("Form has been sunbmitted")
        let payment = {
            afm: afm,
            name: name,
            mainAmount: mainAmount,
            startDate: startDate,
            additionalPayments: payments
        }
        console.log(payment)
        //this.props.onSavePayment(this.state)
    }





    return (
        <Container>
            <Card>
                <Card.Header>{_id ? "Τροποποίηση" : "Νέο τιμολογίο"}</Card.Header>
                <Card.Body>
                    <Form onSubmit={submitForm} >
                        <Form.Group>
                            <Form.Label>ΑΦΜ</Form.Label>
                            <Form.Control type="input" name="email" id="afm" placeholder="ΑΦΜ" onChange={handleAfm} />
                            <Form.Label>Όνομα</Form.Label>
                            <Form.Control type="input" name="name" id='name' placeholder="Όνομα εταιρίας" onChange={handleName} />
                            <Form.Label>Ποσό Πληρωμής</Form.Label>
                            <Form.Control type="input" name="amount" id='payment' placeholder="ποσό" onChange={handleMainAmount} />
                            <Form.Label>Ημερομηνία πληρωμής</Form.Label>
                            <Form.Row>
                                <DatePicker selected={startDate} onChange={handleMainDate} />
                            </Form.Row>
                            {/* <DatePicker dateFormat="DD MM YYYY" value={state.mainDate} /> */}
                            {/* onChange={(e, f) => { this.mainDateChanged(e, f) }} /> */}
                            <Button variant="info" onClick={addPayment}>Προσθήκη Πληρωμής</Button>
                        </Form.Group>

                        {payments.map((payment, idx) =>
                            <Card key={idx}>
                                <Card.Title>Πληρωμή {idx + 1}</Card.Title>
                                <Card.Body>
                                    <Form.Group>
                                        <Form.Label>Ποσό Πληρωμής</Form.Label>
                                        <Form.Control type="input" name="amount" id={payment.id} placeholder="ποσό" onChange={handleAmount} />
                                        <Form.Label>Ημερομηνία πληρωμής</Form.Label>
                                        <Form.Label>{payment.id}</Form.Label>
                                        <Form.Row>
                                            <DatePicker id={payment.id} selected={payment.date} onSelect={(date) => handleDate(date, payment.id)} />
                                        </Form.Row>
                                        <Button id={"delete-" + idx} onClick={() => deleteFunction(payment.id)}>delete</Button>
                                    </Form.Group>
                                </Card.Body>
                            </Card>)}
                        <Button variant="success" type="submit">Αποθήκευση</Button>
                        <Button variant="secondary" tag={Link} to={"/all"}>Πίσω</Button>
                    </Form>
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

export default InvoiceEdit