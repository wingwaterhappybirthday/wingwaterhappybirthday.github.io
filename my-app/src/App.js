import React, { useState } from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Route, Routes, Navigate } from "react-router-dom";
import ReactDOM from 'react-dom';
import Login from './Login';
import BirthdayCard2023 from './BirthdayCard2023';
import animatedCursor from './cursor.gif';
import './App.css';
import Protected from './Protected';

export function App() {
  // useEffect(() => {
  //   const cursor = document.createElement('div');
  //   cursor.classList.add('custom-cursor');
  //   document.body.appendChild(cursor);

  //   return () => {
  //     document.body.removeChild(cursor);
  //   };
  // }, []);
  
  // const [isLoggedIn] = useState(null);

  

  return (
    <>
        <Routes>
          <Route>
            <Route index element={<Login />}/>
            <Route path="/birthday-card" element={<BirthdayCard2023 />}
              // element={
              //   <Protected isLoggedIn={false}>
              //     <BirthdayCard2023 />
              //   </Protected>
              // } 
              // loggedIn ? (
              //   <BirthdayCard2023 />
              // ) : (
              //   <Navigate replace to={"/"} />
              // ) }
            />
            
          </Route>
        </Routes>
    </>
  );
}

export default App;