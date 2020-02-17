import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAlignLeft } from '@fortawesome/free-solid-svg-icons';
import { Navbar, Button, NavbarText} from 'reactstrap';

const NavBar =  (props) => {

 // const [isOpen, setOpen] = useState(true)
 // const toggle = () => setOpen(!isOpen)
  
  return (
  <div>
    <Navbar color="light" light expand="md">
      <Button color="info" onClick={props.toggle}>
        <FontAwesomeIcon icon={faAlignLeft}/>
      </Button>
      <NavbarText>Simple Text</NavbarText>

    </Navbar>
  </div>
  );
}

export default NavBar