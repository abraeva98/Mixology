import React from 'react';
import CameraInput from './components/CameraInput'
// import {Route} from 'react-router-dom'
// import Login from './Login'
// import Signup from './Signup'
import Routes from "./components/routes";
import  NewDrawer from './components/NewDrawer'
import  AppBar from './components/AppBar'
import Request from './request-test'
import RequestFilter from './request-filter'

function App() {
  return (
    <div className="App">
      {/* <NewDrawer /> */}
      {/* <Request /> */}
      <Routes />
      
    </div>
  );
}

export default App;
