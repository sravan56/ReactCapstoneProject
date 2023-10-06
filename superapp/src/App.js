import "./App.css";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Category from "./pages/Category";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/category" element={<Category />} />
      </Routes>
    </div>
  );
}

export default App;
