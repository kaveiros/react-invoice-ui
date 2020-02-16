import React, { Component } from 'react'
import { Form, Button, Label, FormGroup, Input } from 'reactstrap'
import DatePicker from 'reactstrap-date-picker'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';


class InvoiceForm extends Component {

    constructor(props) {
        super(props)
        this.state = {
            inputs: ['input-0'],
            initial:0,
            currentDate : new Date().toISOString()
        }

        this.handleSubmit = this.handleSubmit.bind(this)
        //this.delete = this.delete.bind(this)
    }


    handleSubmit(event) {
        event.preventDefault();
        console.log("Clicked");
        this.setState(prevState => ({initial:prevState.initial +1})) 
        var newInput = `input-${this.state.initial}`;
        this.setState(prevState => ({ inputs: prevState.inputs.concat([newInput]) }));


    }

    delete = (e) => {
        console.log(e.target.value)
    }



    render() {
        const disableSubmit = false;
        const style = { background: "#FAFAFA", padding: 10, borderRadius: 5 };
        const { value } = this.props;
        //const emails = value.get("emails");

        return (
            <Form>
                <FormGroup>
                    <Label for="exampleEmail">AFM</Label>
                    <Input type="email" name="email" id="exampleEmail" placeholder="with a placeholder" />
                </FormGroup>
                <div id="add">{
                    this.state.inputs.map(item => (
                        <div >
                    <FormGroup>
                        <Label for="payment">Payment amount</Label>
                        <Input type="input" name="amount" id="payment" placeholder="amount" />
                        <Label for="paymentDate">Payment amount</Label>
                        <DatePicker id      = "paymentDate" value   = {this.state.currentDate} />
                        <Button id={item.initial} onClick={this.delete}><FontAwesomeIcon icon={faMinus}/></Button>
                    </FormGroup>
                    </div>

                    ))}
                </div>
                <Button onClick={this.handleSubmit}><FontAwesomeIcon icon={faPlus}/></Button>
            </Form>
        )




    }


}

export default InvoiceForm