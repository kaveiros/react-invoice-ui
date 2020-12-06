import React, {useState} from 'react';
import './App.css';
import SideBar from './views/Sidebar'
import Content from './views/Content';


const App = () => {

  const[isOpen, setOpen] = useState(true)
  const toggle = () => setOpen(!isOpen)

    return (
      
      <div className="App wrapper">
        <SideBar toggle={toggle} isOpen={isOpen}/>
        <Content toggle={toggle} isOpen={isOpen} />
      </div>

    )

  }



export default App;
