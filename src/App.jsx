import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "../src/css/main.css";
import Home from "./pages/Home";
import Movie from "./pages/Movie";
import Tv from "./pages/Tv";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/movie/">
          <Route index element={<Movie />} />
          <Route path=":id" element={<Movie />} />
        </Route>
        <Route path="/tv/">
          <Route index element={<Tv />} />
          <Route path=":id" element={<Tv />} />
        </Route>
        <Route path="*" element={<h1>404</h1>} />
      </Routes>
    </Router>
  );
};

export default App;
