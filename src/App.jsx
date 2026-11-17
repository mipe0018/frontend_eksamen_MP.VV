
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Contact from "./pages/Contact.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  );
}
