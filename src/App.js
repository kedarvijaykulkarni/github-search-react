import React from "react";
import { Search, Profile, Error } from "./pages";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Search></Search>}></Route>
        <Route path="*" element={<Error></Error>}></Route>
        <Route path="/Profile/:username" element={<Profile></Profile>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
