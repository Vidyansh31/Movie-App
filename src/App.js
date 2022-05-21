import "./App.css";
import NavBar from "./components/Navbar";
import Banner from "./components/Banner";
import Movielist from "./components/Movielist";
import Favourites from "./components/Favourites";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <NavBar />

      <Routes>
        <Route
          
          path="/"
          element={
            <>
              <Banner />
              <Movielist />
            </>
          }
        />
        <Route exact path="/favourite" element={<Favourites />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
