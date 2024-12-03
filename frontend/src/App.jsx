import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Main from "./components/main";
import { Home } from "lucide-react";
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/" element={<Home />} />
        <Route path="/main" element={<Main />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
