import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faPlusSquare, faList } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames';
import {NavLink as DOMLINK } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav'

const Sidebar = ({isOpen, toggle}) => {

    return (
            <div className={classNames('sidebar', { 'is-open': isOpen })}>
                <div className="sidebar-header">
                    <span color="info" onClick={toggle} style={{ color: '#fff' }}>&times;</span>
                    <h3>Μενού</h3>
                </div>
                <div className='side-menu'>
                    <Nav className="list-unstyled pb-3">
                        <Nav.Item>
                            <Nav.Link as={DOMLINK} to={'/all'}>
                                <FontAwesomeIcon icon={faList} className="mr-2" />Τιμολόγια
                        </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link as={DOMLINK} to={'/new'}>
                                <FontAwesomeIcon icon={faPlusSquare} className="mr-2" />Προσθήκη
                         </Nav.Link>
                        </Nav.Item>
                    </Nav>
                </div>
            </div>

        )
    }

export default Sidebar