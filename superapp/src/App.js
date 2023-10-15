import Register from "./pages/Register";
import Home from "./pages/Home";
import Category from "./pages/Category";
import { Routes, Route } from "react-router-dom";
import Entertainment from "./pages/Entertainment";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/category" element={<Category />} />
        <Route path="/entertainment" element={<Entertainment />} />
      </Routes>
    </div>
  );
}

export default App;
