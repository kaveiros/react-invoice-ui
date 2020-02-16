import React from 'react'
import { Route } from 'react-router-dom'
import { Container } from 'reactstrap'
import classNames from 'classnames';
import NavBar from './NavBar'
import { Switch } from 'react-router-dom';
import All from './All'
import InvoiceForm from './InvoiceForm'


const Content = (props) => {

    return (
        <Container fluid className={classNames('content', { 'is-open': props.isOpen })}>
            <NavBar toggle={props.toggle}/>            <Switch>
                <Route exact path="/" component={All} />
                <Route exact path="/new" component={(props) => "New"} />
                <Route exact path="/form" component={InvoiceForm} />
            </Switch>
        </Container>
    )

    }

export default Content