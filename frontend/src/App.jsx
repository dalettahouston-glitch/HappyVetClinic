import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import PetsPage from "./pages/PetsPage";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/pets" element={<PetsPage />} />
    </Routes>
  );
}

export default App;