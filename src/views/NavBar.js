import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAlignLeft } from '@fortawesome/free-solid-svg-icons';
import { Navbar, Button, NavbarText } from 'reactstrap';


const NavBar = ({toggle}) =>  {

    return (
      <div>
        <Navbar color="light" light expand="md">
          <Button color="info" onClick={toggle}>
            <FontAwesomeIcon icon={faAlignLeft} />
          </Button>
          <NavbarText>Εφαρμογή τιμολογίων</NavbarText>

        </Navbar>
      </div>
    )
}


export default NavBar