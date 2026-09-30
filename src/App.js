import React, { useState, useEffect } from "react";
import "./App.css";
import { auth } from "./firebase/init";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

function App() {
  const [user, setUser] = useState(null); // This states that there is no user signed-in
  const [loading, setLoading] = useState(true);

  // Checking if a user is logged in or not
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      // console.log(currentUser || 'user logged out');
      setUser(currentUser);
      setLoading(false);
    });

    return unsubscribe;
  }, []); // The empty array allows this effect to only run on mount

  // How to register a hard coded user
  function register() {
    createUserWithEmailAndPassword(auth, "email@email.com", "test123")
      .then((user) => {
        console.log(user);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // How to login a registered hard coded user
  function login() {
    signInWithEmailAndPassword(auth, "email@email.com", "test123")
      .then(({ user }) => {
        console.log(user);
        setUser(user);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // How to logout a user
  function logout() {
    signOut(auth);
    setUser({});
  }

  // The buttons shown on the webpage to register, login, & logout
  return (
    <div className="App">
      <button onClick={register}>Register</button>
      <button onClick={login}>Login</button>
      <button onClick={logout}>Logout</button>
      {loading ? (
        "loading..."
      ) : user ? (
        <p>{user.email}</p>
      ) : (
        <p>No user is signed in.</p>
      )}
    </div>
  );
}

export default App;

// Create a nav bar:
// Create a Login button that logs the user in
// Create a Register button
// Create a skeleton loading state while onAuthStateChange is calling
// Once logged in, create a user initial letter button that on click logs the user out
