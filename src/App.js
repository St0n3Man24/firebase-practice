import "./App.css";
import Nav from "./components/Nav";

function App() {

  // The buttons shown on the webpage to register, login, & logout
  return (
    <div className="App">
      <Nav />
    </div>
  );
}

export default App;

// Create a nav bar:
// Create a Login button that logs the user in
// Create a Register button
// Create a skeleton loading state while onAuthStateChange is calling
// Once logged in, create a user initial letter button that on click logs the user out
