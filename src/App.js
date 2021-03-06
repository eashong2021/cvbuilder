import './App.css';
import React from 'react';
import {useState} from 'react';
import { FormPage } from './containers/FormPage';
import { Routes, Route, Link } from 'react-router-dom';
import {Cv} from './components/Cv/Cv';
import { Form2Page } from './containers/Form2Page';


function App() {

  const [ personDetails, setPersonDetails] = useState([]);

  const addPersonDetails = (details) => {
    setPersonDetails([...personDetails, details]);
  }

  // const newDetails = setPersonDetails(personDetails.flat())
  // console.log(newDetails)

  
  return (
    <>
      <nav className='App-header'>
        <Link className="links" to="/">Form</Link>
        <Link className="links" to="/cv">Generate CV</Link>
      </nav>
      <Routes>
        <Route 
        path='/'
        element={<FormPage  addPersonDetails={addPersonDetails}/>}
        />
        <Route 
        path='form2'
        element={<Form2Page  addPersonDetails={addPersonDetails}/>}
        />
        <Route 
        path='cv'
        element={<Cv personDetails={personDetails}/>}
        />
      </Routes>    
      </> 
      
  );
}

export default App;
