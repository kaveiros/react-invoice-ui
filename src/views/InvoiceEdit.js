import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import { v4 as uuidv4 } from "uuid"
import { Link, useParams } from 'react-router-dom'
import InvoiceService from '../services/InvoiceService'
import Datetime from 'react-datetime'
import "react-datetime/css/react-datetime.css"
import Alert from 'react-bootstrap/Alert'



const InvoiceEdit = () => {
    const params = useParams()
    let _id = params.id
    const [invoiceId, setInvoiceId] = useState('')
    const blankPayment = { id: uuidv4(), amount: 0, date: new Date() }
    const [payments, setPayments] = useState([])
    const [startDate, setStartDate] = useState(new Date())
    const [name, setName] = useState('')
    const [afm, setAfm] = useState('')
    const [mainAmount, setMainAmount] = useState('')
    const [billNumber, setBillNumber] = useState('')
    const [submitted, setSubmitted] = useState(false)
    const [isNew, setIsNew] = useState(false)
    const [hasError, setHasError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    const getPaymentIfexists = async () => {
        if (_id) {
            setIsNew(false)
            InvoiceService.getInvoice(_id)
            .then(response => {
                setInvoiceId(_id)
                setAfm(response.data.afm)
                setName(response.data.name)
                setMainAmount(response.data.mainAmount)
                var dateTi = new Date(response.data.billDate)
                setStartDate(dateTi)
                var additionalPayments = response.data.additionalPayments
                setPayments(payments => ([...payments, ...additionalPayments]))
                setBillNumber(response.data.billNumber)
            }).catch(error => {
                setHasError(true)
                setErrorMessage(error.message)

            })

        }else{
            setIsNew(true)
        }


    }

    useEffect(() => {
        getPaymentIfexists();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    /**
     * Main form events
     */
    const handleAfm = (event) => {
        setAfm(event.target.value)
    }

    const handleBillNumber = (event) => {
        setBillNumber(event.target.value)
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
        let newPayments = payments.map((payment, index) => payment.id === dateId ? { id: payment.id, amount: payment.amount, date: new Date(date) } : payment)
        console.log(newPayments)
        setPayments(newPayments)
    }

    const handleAmount = (e) => {

        let paymentId = e.target.id
        let amount = e.target.value
        let newPayments = payments.map((payment, index) => payment.id === paymentId ? { id: payment.id, amount: amount, date: new Date(payment.date) } : payment)
        setPayments(newPayments)
        console.log(newPayments)

    }

    const deleteFunction = (id) => {
        setPayments(payments.filter(item => item.id !== id))
        console.log(id)

    }

    const handleNewInvoice = () => {
        setAfm('')
        setName('')
        setMainAmount('')
        var dateTi = new Date()
        setStartDate(dateTi)
        setPayments([])
        setBillNumber('')
        setSubmitted(false)
        setIsNew(false)
    }

    const submitForm = (e) => {
        e.preventDefault()
        console.log("Form has been sunbmitted")
        let payment = {
            _id: invoiceId,
            afm: afm,
            billDate: startDate,
            billNumber: billNumber,
            name: name,
            mainAmount: mainAmount,
            startDate: startDate,
            additionalPayments: payments
        }
        if(isNew) {
            InvoiceService.saveInvoice(payment)
                .then(response => {
                    console.log("Response")
                    console.log(response.data)
                    setSubmitted(true)
                }).catch(error => {
                    setHasError(true)
                    setSubmitted(false)
                    setErrorMessage(error.message)
                    console.log(error.message)
    
                })
            console.log(JSON.stringify(payment))
        }
        else {
            InvoiceService.updateInvoice(invoiceId, payment)
            .then(response => {
                if(response.status === 204){
                    setSubmitted(true)
                }
            }).catch(error => {
                setHasError(true)
                setSubmitted(false)
                setErrorMessage(error.message)
                console.log(error.message)

            })
                }
    }





    return (
        <Container>
            {hasError && <Alert variant="danger"  onClose={() => setHasError(false)} dismissible>
                <p>{errorMessage}</p>
            </Alert>}
            {submitted && <Alert variant="success"  onClose={() => setSubmitted(false)} dismissible>
                <p>Το τιμολογίο αποθηκεύτηκε/ενημερώθηκε με επιτυχία.</p>
                <Button variant="success"  onClick={handleNewInvoice}>Νέο τιμολόγιο</Button>
            </Alert>}

            <Card>
                <Card.Header>{_id ? "Τροποποίηση" : "Νέο τιμολογίο"}</Card.Header>
                <Card.Body>
                    <Form onSubmit={submitForm} >
                        <Form.Group>
                            <Form.Label>Αριθμός τιμολογίου</Form.Label>
                            <Form.Control type="input" name="invoiceNumber" id="invoiceNumber" placeholder="Αριθμός τιμολογίου" value={billNumber} onChange={handleBillNumber} />
                            <Form.Label>ΑΦΜ</Form.Label>
                            <Form.Control type="input" name="email" id="afm" placeholder="ΑΦΜ" value={afm} onChange={handleAfm} />
                            <Form.Label>Όνομα</Form.Label>
                            <Form.Control type="input" name="name" id='name' placeholder="Όνομα εταιρίας" value={name} onChange={handleName} />
                            <Form.Label>Ποσό Πληρωμής</Form.Label>
                            <Form.Control type="input" name="amount" id='payment' value={mainAmount} placeholder="ποσό" onChange={handleMainAmount} />
                            <Form.Label>Ημερομηνία πληρωμής</Form.Label>
                            <Form.Row>
                                <Datetime value={startDate} initialValue={startDate} onChange={handleMainDate} closeOnSelect={true} />
                            </Form.Row>
                            <Form.Row>
                                <Button variant="info" onClick={addPayment}>Προσθήκη Πληρωμής</Button>
                            </Form.Row>
                        </Form.Group>

                        {payments.map((payment, idx) =>
                            <Card key={idx}>
                                <Card.Title>Πληρωμή {idx + 1}</Card.Title>
                                <Card.Body>
                                    <Form.Group>
                                        <Form.Label>Ποσό Πληρωμής</Form.Label>
                                        <Form.Control type="input" name="amount" id={payment.id} value={payment.amount} placeholder="ποσό" onChange={handleAmount} />
                                        <Form.Label>Ημερομηνία πληρωμής</Form.Label>
                                        <Form.Label>{payment.id}</Form.Label>
                                        <Form.Row>
                                            <Datetime id={payment.id} value={new Date(payment.date)} initialValue={new Date(payment.date)} onChange={(date) => handleDate(date, payment.id)} closeOnSelect={true} />
                                        </Form.Row>
                                        <Form.Row>
                                            <Button variant="danger" id={"delete-" + idx} onClick={() => deleteFunction(payment.id)}>Διαγραφή</Button>
                                        </Form.Row>
                                    </Form.Group>
                                </Card.Body>
                            </Card>)}
                        <Button variant="success" type="submit">Αποθήκευση</Button>
                        <Button variant="secondary" as={Link} to={"/all"}>Πίσω</Button>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    )


}

export default InvoiceEdit