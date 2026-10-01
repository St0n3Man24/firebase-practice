import React, { useState, useEffect } from "react";
import { auth } from "../firebase/init";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

const Nav = () => {
  // This states that there is no user signed-in
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Checking if a user is logged in or not
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      // console.log(currentUser || 'user logged out');
      setUser(currentUser);
      setInterval(() => {
        setLoading(false);
      }, 800)
    });

    return unsubscribe;
  }, []); // The empty array allows this effect to only run on mount

  // How to register a hard coded user
  function register() {
    createUserWithEmailAndPassword(auth, "email@email.com", "test123")
      .then(({ user }) => console.log(user))
      .catch((error) => console.log(error));
  }

  // How to login a registered hard coded user
  function login() {
    signInWithEmailAndPassword(auth, "email@email.com", "test123")
      .then(({ user }) => setUser(user))
      .catch((error) => console.log(error));
  }

  // How to logout a user
  function logout() {
    signOut(auth);
    setUser(null);
  }

  return (
    <div className="nav__container">
      <div className="nav__links">
        {user ? (
          <>
            {loading ? (
            <>
              <div className="btn__logout--skeleton"></div>
            </>
          ) : (
            <>
              <button className="btn btn__logout" onClick={logout}>
              {user.email?.[0]?.toUpperCase()}
              </button>
            </>
          )}
          </>
        ) : (
          <>
            {loading ? (
              <>
                <div className="btn__register--skeleton"></div>
                <div className="btn__login--skeleton"></div>
              </>
            ) : (
              <>
                <button className="btn btn__register" onClick={register}>
                  Register
                </button>
                <button className="btn btn__login" onClick={login}>
                  Login
                </button>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Nav;
