import React, { useState, useEffect } from "react";
import { auth } from "../firebase/init";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { users } from "../data.js";

const Nav = () => {
  // This states that there is no user signed-in
  const [user, setUser] = useState(null);
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

  return (
    <div>
      <div className="nav__container">
        <ul className="nav__links">
          <button className="btn btn__register" onClick={register}>
            Register
          </button>
          <button className="btn btn__login" onClick={login}>
            Login
          </button>
          <button className="btn btn__logout" onClick={logout}>
            S
          </button>
        </ul>
        <ul className="nav__logout">
          <div className="nav__statement">
            {loading ? (
              "loading..."
            ) : user ? (
              <p>{user.email}</p>
            ) : (
              <p>No user is signed in.</p>
            )}
          </div>
        </ul>
      </div>
    </div>
  );
};

export default Nav;
