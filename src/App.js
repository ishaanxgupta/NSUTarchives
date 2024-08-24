import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Intern_home from "./components/Intern_home";
import Fte_home from "./components/Fte_home";
import Company_details from "./components/Company_details";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/intern" element={<Intern_home />} />
        <Route path="/details/:id" element={<Company_details />} />
        <Route path="/fte" element = {<fte_home/>}/>
      </Routes>
    </Router>
  );
}

export default App;
