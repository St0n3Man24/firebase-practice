import { useState, useEffect } from "react";
import "./App.css";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth, db } from "./firebase/init";
import { collection, addDoc, getDocs, getDoc, doc, query, where } from "firebase/firestore";

function App() {
  // This states that there is no user signed-in
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  function createPost() {
    const post = {
      title: "Finish Firebase Section",
      description: "Do Frontend Simplified",
      uid: user.uid,
    };
    addDoc(collection(db, "posts"), post);
  }

  // How to get all the posts in the database - to show all posts of a user
  async function getAllPosts() {
    const { docs } = await getDocs(collection(db, "posts"));
    const posts = docs.map(elem => ({...elem.data(), id: elem.id})); // The spread operator (...elem) returns a copy of the object
    console.log(posts);
  }

  // How to get a specific post in the database by its ID - read all comments for a specific post
  async function getPostById() {
    const hardcodedId = "mnIDmSOlJpLCizug90zb";
    const postRef = doc(db, "posts", hardcodedId);
    const postSnap = await getDoc(postRef);
    const post = postSnap.data();
    console.log(post);
  }

  // How to get posts by a specific user - show the posts of a specific user while on their profile page


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

  // The buttons shown on the webpage to register, login, & logout
  return (
    <div className="App">
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
      <div>
        <button onClick={createPost}>Create Post</button>
        <button onClick={getAllPosts}>Get All Posts</button>
        <button onClick={getPostById}>Get Post By ID</button>
      </div>
    </div>  
  );
}

export default App;

// What are we doing in the createPost function:
// We are adding a document with (addDoc)
// the document is being imported from firebase/firestore (import { collection, addDoc } from "firebase/firestore";)
// The document has two arguments:
// // 1. the reference where we want to add the document which is the "posts" collection (collection(db, "posts"))
// // 2. the data that we want to add into the document which is the (post) variable which contains the title and description

// What are we doing in the getAllPosts function:
// 
