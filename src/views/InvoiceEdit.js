import React, { Component } from 'react'
import { Form, Button, Label, FormGroup, Input, Card, CardBody, CardHeader, Container } from 'reactstrap'
import DatePicker from 'reactstrap-date-picker'
import * as formActions from '../actions/FormActions'
import { connect } from 'react-redux';
import { v4 as uuidv4 } from "uuid";
import { Modal, ModalHeader, ModalBody, ModalFooter, Row, Col } from 'reactstrap';


class InvoiceEdit extends Component {

    constructor(props) {
        super(props)
        this.state = {
            afm: 0,
            mainAmount: 0,
            mainDate: new Date().toISOString(),
            modalOpen: false,
            modalAmount: 0,
            modalDate: new Date().toISOString(),
            name:""
        }
    }

    /**
     * Toggle modal
     */
    toggleModal = () => {
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
    addAfm = (event) => {
        this.setState({ afm: event.target.value })
    }

    addPayment = (event) => {
        const id = uuidv4()
        this.props.onAddPayment(id)
    }

    nameChanged = (e) => {
        console.log("amount changed to " + e.target.value)

        this.setState({ name: e.target.value })
        
    }

    mainAmountChanged = (e) => {
        console.log("amount changed to " + e.target.value)

        this.setState({ mainAmount: e.target.value })
       
    }


    mainDateChanged = (e, f) => {
       
        this.setState({ mainDate: e })
        
    }


    modalAmountChanged = (e) => {
        
        this.setState({ modalAmount: e.target.value })
    }
        


    modalDateChanged = (e, f) => {
        console.log("date is " + e + " => " + f)
        this.setState({ modalDate: e })
       
    }

    addModalPayment = (e) => {
        e.preventDefault()
        let id = uuidv4()
        this.setState({ additionalPayments: [...this.state.additionalPayments, {
            additionalId: id,
            additionalAmount: this.state.modalAmount,
            additionalDate: this.state.modalDate
        }]})
        this.setState({ modalOpen: false })
        console.log(this.state.additionalPayments)
    }

    delete = (event) => {

        this.props.onRemovePayment(event)
    }

    submitForm = (e) => {
        e.preventDefault()
        console.log("Form has been sunbmitted")
        console.log(this.state)
        this.props.onSavePayment(this.state)
    }



    render() {

        return (
            <div>
                <Container>
            <Card>
                <CardHeader>Νέο τιμολογίο</CardHeader>
                <CardBody>
                    <Form onSubmit={(e) => { this.submitForm(e) }}>
                        <FormGroup>
                            <Label for="exampleEmail">ΑΦΜ</Label>
                            <Input type="input" name="email" id="afm" placeholder="ΑΦΜ" onChange={(e) => { this.addAfm(e) }} />
                            <Label for="payment">Όνομα</Label>
                            <Input type="input" name="name" id='name' placeholder="Όνομα εταιρίας" onChange={(e) => { this.nameChanged(e) }} />
                            <Label for="payment">Ποσό Πληρωμής</Label>
                            <Input type="input" name="amount" id='payment' placeholder="amount" onChange={(e) => { this.mainAmountChanged(e) }} />
                            <Label for="paymentDate">Ημερομηνία πληρωμής</Label>
                            <DatePicker dateFormat="DD MM YYYY" value={this.state.mainDate} onChange={(e, f) => { this.mainDateChanged(e, f) }} />
                        </FormGroup>
                        <Button color="success" type="submit">Αποθήκευση</Button>
                    </Form>
                </CardBody>
            </Card>
            </Container>  
            </div>
        )
    }


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


export default connect(mapStateToProps, mapDispatchToProps)(InvoiceEdit)