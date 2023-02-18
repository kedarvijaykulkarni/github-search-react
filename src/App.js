import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Error, Profile, Search } from "./pages";

import React from "react";

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
