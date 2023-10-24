import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import AddApp from './components/addApp';
import HomePage from './components/Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import UserHome from './components/UserHome';
import ViewTask from './components/ViewTask';
import TaskDetail from './components/TaskDetail';
import Verify from './components/Verify';
import ViewPoints from './components/ViewPoints';

function App() {
  return (
    
    <Router>
    <div>
      <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/add_app" element={<AddApp/>} />
          <Route path="/home" element={<UserHome/>} />
          <Route path="/tasks" element={<ViewTask/>} />
          <Route path="/verify" element={<Verify/>} />
          <Route path="/task/:taskId" element={<TaskDetail/>} />
          <Route path="/points" element={<ViewPoints/>} />

      </Routes>


      
      
      
    </div>
    </Router>
  )


 
}

export default App;
