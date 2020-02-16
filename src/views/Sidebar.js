import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faBriefcase, faPaperPlane, faQuestion, faImage, faCopy } from '@fortawesome/free-solid-svg-icons';
import { Nav, NavLink, NavItem } from 'reactstrap'
import classNames from 'classnames';
import { Link } from 'react-router-dom';

const Sidebar = (props) => {

    return (
        <div className={classNames('sidebar', { 'is-open': props.isOpen })}>
            <div className="sidebar-header">
                <span color="info" onClick={props.toggle} style={{ color: '#fff' }}>&times;</span>
                <h3>Invoice app</h3>
            </div>
            <div className='side-menu'>
                <Nav vertical className="list-unstyled pb-3">
                    <NavItem>
                        <NavLink tag={Link} to={'/'}>
                            <FontAwesomeIcon icon={faBriefcase} className="mr-2" />All
            </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink tag={Link} to={'/new'}>
                            <FontAwesomeIcon icon={faPaperPlane} className="mr-2" />New
            </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink tag={Link} to={'/form'}>
                            <FontAwesomeIcon icon={faPaperPlane} className="mr-2" />New
            </NavLink>
                    </NavItem>
                </Nav>
            </div>
        </div>

    )

}

export default Sidebar