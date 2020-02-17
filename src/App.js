import React, { useState } from 'react';
import './App.css';
import { BrowserRouter} from "react-router-dom";
import SideBar from './views/Sidebar'
import Content from './views/Content';


const App = (props) => {

  const [isOpen, setOpen] = useState(true)
  const toggle = () => setOpen(!isOpen)

    return (
      <BrowserRouter>
      <div className="App wrapper">
      <SideBar toggle={toggle} isOpen={isOpen}/>
      <Content props={props} toggle={toggle} isOpen={isOpen}/>
      </div>
      </BrowserRouter>
      //<Base/>

    )
  
}

export default App;
