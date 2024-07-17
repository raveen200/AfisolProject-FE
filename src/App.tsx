import FormPage from "./pages/FormPage.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FormPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
