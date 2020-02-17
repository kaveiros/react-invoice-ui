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
            initial:0,
            currentDate : new Date().toISOString()
        }

        this.handleSubmit = this.handleSubmit.bind(this)
        this.delete = this.delete.bind(this)
    }


    handleSubmit(event) {
        event.preventDefault();
        console.log("Clicked");
        this.setState(prevState => ({initial:prevState.initial + 1})) 
        var newInput = `input-${this.state.initial}`;
        this.setState(prevState => ({ inputs: prevState.inputs.concat([newInput]) }));
        console.log(this.state)


    }

    delete = (e, index) => {
        console.log(e)
        console.log(index)
    }



    render() {
       // const disableSubmit = false;
       // const style = { background: "#FAFAFA", padding: 10, borderRadius: 5 };
        //const { value } = this.props;
        //const emails = value.get("emails");

        return (
            <Form>
                <FormGroup>
                    <Label for="exampleEmail">AFM</Label>
                    <Input type="email" name="email" id="exampleEmail" placeholder="with a placeholder" />
                </FormGroup>
                <div id="add">{
                    this.state.inputs.map((item, index) => (
                        <div key={index}>
                    <FormGroup>
                        {console.log(index)}
                        <Label for="payment">Payment amount</Label>
                        <Input type="input" name="amount" id="payment" placeholder="amount" />
                        <Label for="paymentDate">Payment amount</Label>
                        <DatePicker value   = {this.state.currentDate} />
                        <Button id={item.initial} onClick={this.delete(index)}><FontAwesomeIcon icon={faMinus}/></Button>
                    </FormGroup>
                    </div>

                    ))}
                </div>
                <Button onClick={this.handleSubmit}><FontAwesomeIcon icon={faPlus}/></Button>
                <br/>
                <Button>Submit</Button>
            </Form>
        )




    }


}

export default InvoiceForm