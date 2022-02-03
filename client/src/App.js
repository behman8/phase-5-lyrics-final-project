import './App.css';
import { Routes, Route } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import NavBar from './Containers/NavBar';
import SongsContainer from './Containers/SongsContainer';
import SongShow from './Components/SongShow';
import Login from './Components/Login';
import Home from './Components/Home';
import Signup from './Components/Signup';

function App() {

  const [user, setUser] = useState(null)

  useEffect(() => {
    fetch("/me").then((resp) => {
      if(resp.ok) {
        resp.json().then((user) => setUser(user));
      }
    });
  }, []);

  if(user) {
    return (
      <div>
        <NavBar onLogout={setUser} />
        <main>
          <h2>Welcome, {user.username}!</h2>
          <Routes>
            <Route exact path="/songs" element={<SongsContainer user={user} />}></Route>
            <Route exact path="/songs/:id" element={<SongShow />}></Route>
            <Route exact path="/login" element={<Login />}></Route>
            <Route exact path="/" element={<Home />}></Route>
          </Routes>
        </main>
      </div>
  );
  } else {
    return (
      <div>
        <NavBar/>
        <h2>Please login to view more!</h2>
        {<Signup onLogin={setUser}/>}
        <h3>Or</h3>
        {<Login onLogin={setUser} />}
        <main>
          <Routes>
            <Route exact path="/" element={<Home />}></Route>
          </Routes>
        </main>
      </div>
    )
  }
}

export default App;
