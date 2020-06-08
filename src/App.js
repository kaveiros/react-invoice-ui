import React, {Component} from 'react';
import './App.css';
import SideBar from './views/Sidebar'
import Content from './views/Content';


class App extends Component {

  render() {
    return (
      
      <div className="App wrapper">
        <SideBar/>
        <Content/>
        {/* <SideBar toggle={toggle} isOpen={isOpen} />
        <Content props={this.props} toggle={toggle} isOpen={isOpen} /> */}
      </div>

    )

  }

}

// const[isOpen, setOpen] = useState(true)
// const toggle = () => setOpen(!isOpen)

export default App;
