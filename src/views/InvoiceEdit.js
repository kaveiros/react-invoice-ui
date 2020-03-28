import React, { Component } from 'react'
import { Form, Button, Label, FormGroup, Input } from 'reactstrap'
import DatePicker from 'reactstrap-date-picker'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import * as formActions from '../actions/FormActions' 
import { connect } from 'react-redux';
import {v4 as uuidv4 } from "uuid";


class InvoiceEdit extends Component {

    constructor(props) {
        super(props)
        this.state = {
            inputs: [],
            initial: 0,
            currentDate: new Date().toISOString(),
            payments: this.props.payments
        }
    }


    addPayment =(event) => {
        const id = uuidv4()
        this.props.onAddPayment(id)
    }

    delete = (event) => {
       
        console.log(event)
       
        this.props.onRemovePayment(event)
    }

    submitForm = (e) => {
        console.log(e.target)
    }

    amountChanged = (e) => {
        console.log("amount changed to " + e.target.value)

    }
    dateChanged = (e, f) => {
        console.log("date is " + e + " => " + f)
    }



    render() {

        return (
            <Form>
                <FormGroup>
                    <Label for="exampleEmail">ΑΦΜ</Label>
                    <Input type="input" name="email" id="afm" placeholder="ΑΦΜ" />
                    <Label for="payment">Ποσό Πληρωμής</Label>
                    <Input type="input" name="amount" id='payment' placeholder="amount" onChange={(e) => { this.amountChanged(e) }} />
                    <Label for="paymentDate">Ημερομηνία πληρωμής</Label>
                    <DatePicker dateFormat="DD MM YYYY" value={this.state.currentDate} onChange={(e, f) => { this.dateChanged(e, f) }} />
                    <Button onClick={this.addPayment}><FontAwesomeIcon icon={faPlus} /></Button>
                </FormGroup>
                <FormGroup>
                <div id="add">
                 {
                    this.props.payments.length >0 ? 
                    this.props.payments.map((item) => (
                        <div key={item._id}>
                            <FormGroup>
                                <Label for="payment">Ποσό Πληρωμής</Label>
                                <Input type="input" name="amount" id={item._id} placeholder="amount" onChange={(e) => { this.amountChanged(e) }} />
                                <Label for="paymentDate">Ημερομηνία πληρωμής</Label>
                                <DatePicker id={"date-"+item._id} dateFormat="DD MM YYYY" value={this.state.currentDate} onChange={(e, f) => { this.dateChanged(e, f) }} />
                                <Button id={"delete-"+item._id} onClick={() => { this.delete(item._id) }}><FontAwesomeIcon icon={faMinus} /></Button>
                            </FormGroup>
                        </div>

                    )): <div></div>}
                </div>
                </FormGroup>

                <br />
                <Button onClick={(e) => { this.submitForm(e) }}>Submit</Button>
            </Form>
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
        onAddPayment: (id) => dispatch(formActions.addPayment(id)),
        onRemovePayment: (index) => dispatch(formActions.removePayment(index)),
        onFetchPayments: () => dispatch(formActions.fetchPayments())
    }
}


export default connect(mapStateToProps, mapDispatchToProps) (InvoiceEdit)