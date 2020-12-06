import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { Container } from 'reactstrap'
import classNames from 'classnames';
import NavBar from './NavBar'
import { Switch } from 'react-router-dom';
import InvoiceEdit from './InvoiceEdit'
import Details from './Details'
import Rtable from './RTable'


const Content = ({isOpen, toggle}) => {

    return (
        <Container fluid className={classNames('content', { 'is-open': isOpen })}>
            <NavBar toggle={toggle}/>
            <Switch>
                <Route exact path="/all" component={Rtable} />
                <Route exact path="/new" component={InvoiceEdit} />
                <Route exact path="/edit/:id" component={InvoiceEdit} />
                <Route exact path="/details/:id" component={Details}/>
                <Redirect from="/" to="/all"/>
            </Switch>
        </Container>
    )

    }

export default Content