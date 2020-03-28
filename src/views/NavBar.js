import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAlignLeft } from '@fortawesome/free-solid-svg-icons';
import { Navbar, Button, NavbarText } from 'reactstrap';
import { connect } from 'react-redux'
import * as NavActions from '../actions/NavbarActions'

class NavBar extends Component {

  // const [isOpen, setOpen] = useState(true)
  // const toggle = () => setOpen(!isOpen)

  componentDidMount() {
    this.props.onFetchState()
  }

  toggleHandler = () => {
    console.log(this.props.isOpen)
    if (this.props.isOpen) {
      this.props.onCloseSideBar()
    }
    else {
      this.props.onOpenSideBar()
    }
  }

  render() {

    return (
      <div>
        <Navbar color="light" light expand="md">
          <Button color="info" onClick={this.toggleHandler}>
            <FontAwesomeIcon icon={faAlignLeft} />
          </Button>
          <NavbarText>Εφαρμογή τιμολογίων</NavbarText>

        </Navbar>
      </div>
    );
  }

}


const mapStateToProps = (state) => {
  // console.log("logging state on navbar....")
  // console.log(state)

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

export default connect(mapStateToProps, mapDispatchToProps)(NavBar)