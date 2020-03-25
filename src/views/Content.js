import React from 'react'
import { Route } from 'react-router-dom'
import { Container } from 'reactstrap'
import classNames from 'classnames';
import NavBar from './NavBar'
import { Switch } from 'react-router-dom';
import All from './All'
import InvoiceForm from './InvoiceForm'
import Details from './Details'


const Content = (props) => {

    return (
        <Container fluid className={classNames('content', { 'is-open': props.isOpen })}>
            <NavBar toggle={props.toggle}/>
            <Switch>
                <Route exact path="/all" component={All} />
                <Route exact path="/new" component={(props) => "New"} />
                <Route exact path="/form" component={InvoiceForm} />
                <Route exact path="/details/:id" component={Details}/>
            </Switch>
        </Container>
    )

    }

export default Content