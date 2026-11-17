
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Contact from "./pages/Contact.jsx";
import ApiTest from "./pages/ApiTest.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/contact" element={<Contact />} />
        <Route path="/api-test" element={<ApiTest />} />
      </Routes>
    </BrowserRouter>
  );
}
