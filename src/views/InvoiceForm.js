import React, { Component } from 'react'
import { Form, Button, Label, FormGroup, Input } from 'reactstrap'
import DatePicker from 'reactstrap-date-picker'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';


class InvoiceForm extends Component {

    constructor(props) {
        super(props)
        this.state = {
            inputs: [],
            initial: 0,
            currentDate: new Date().toISOString(),
            payments: []
        }

        //this.handleSubmit = this.handleSubmit.bind(this)
        // this.delete = this.delete.bind(this)
    }


    addPayment =(event) => {
        event.preventDefault();
        console.log("Clicked");
        this.setState(prevState => ({ initial: prevState.initial + 1 }))
        var newInput = `input-${this.state.initial}`;
        this.setState(prevState => ({ inputs: prevState.inputs.concat([newInput]) }));
        console.log(this.state)


    }

    delete = (event) => {

        //console.log(event.target.value)
        
        var inputToDelete = 'input-' + event
        if (event > 0){
            this.setState(prevState => ({ inputs: prevState.inputs.splice(prevState.inputs.indexOf(inputToDelete)) }))
        }
        else {
            this.setState(prevState => ({ inputs: prevState.inputs = []}))
        }
        //event.preventDefault();
        //console.log(e)
        console.log(event)
        console.log(inputToDelete)
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
        // const disableSubmit = false;
        // const style = { background: "#FAFAFA", padding: 10, borderRadius: 5 };
        //const { value } = this.props;
        //const emails = value.get("emails");

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
                <div id="add">{
                    this.state.inputs.length >0 ? 
                    this.state.inputs.map((item, index) => (
                        <div key={index}>
                            <FormGroup>
                                {console.log(index)}
                                <Label for="payment">Ποσό Πληρωμής</Label>
                                <Input type="input" name="amount" id={index} placeholder="amount" onChange={(e) => { this.amountChanged(e) }} />
                                <Label for="paymentDate">Ημερομηνία πληρωμής</Label>
                                <DatePicker id={"date-"+index} dateFormat="DD MM YYYY" value={this.state.currentDate} onChange={(e, f) => { this.dateChanged(e, f) }} />
                                <Button id={"delete-"+index} onClick={() => { this.delete(index) }}><FontAwesomeIcon icon={faMinus} /></Button>
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

export default InvoiceForm