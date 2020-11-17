import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBriefcase, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { Nav, NavLink, NavItem } from 'reactstrap'
import classNames from 'classnames';
import {NavLink as DOMLINK } from 'react-router-dom';
import { connect } from 'react-redux'
import * as NavActions from '../actions/NavbarActions'

class Sidebar extends Component {

    componentDidMount() {
        this.props.onFetchState()
    }

    toggleHandler = () => {
        if(this.props.isOpen) {
            this.props.onCloseSideBar()
        }
        else{
            this.props.onOpenSideBar()
        }
    }

    render() {

        return (
            <div className={classNames('sidebar', { 'is-open': this.props.isOpen })}>
                <div className="sidebar-header">
                    <span color="info" onClick={this.toggleHandler} style={{ color: '#fff' }}>&times;</span>
                    <h3>Μενού</h3>
                </div>
                <div className='side-menu'>
                    <Nav vertical className="list-unstyled pb-3">
                        <NavItem>
                            <NavLink tag={DOMLINK} to={'/all'}>
                                <FontAwesomeIcon icon={faBriefcase} className="mr-2" />Τιμολόγια
                        </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink tag={DOMLINK} to={'/new'}>
                                <FontAwesomeIcon icon={faPaperPlane} className="mr-2" />Προσθήκη
                         </NavLink>
                        </NavItem>
                    </Nav>
                </div>
            </div>

        )
    }

}

const mapStateToProps = (state) => {

    return {
        isOpen: state.NavBarReducer.isOpen
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onOpenSideBar: () => dispatch(NavActions.setIsOpen()),
        onCloseSideBar: () => dispatch(NavActions.setIsClosed()),
        onFetchState: () => dispatch(NavActions.fetchState())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar)