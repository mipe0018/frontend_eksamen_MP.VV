
import { Routes, Route } from "react-router-dom";

import Header from "./components/global/Header.jsx";

import Home from "./pages/Home.jsx";
import Events from "./pages/Events.jsx";
import BookTable from "./pages/BookTable.jsx";
import Contact from "./pages/Contact.jsx";
import ApiTest from "./pages/ApiTest.jsx";

export default function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<Events />} />
        <Route path="/book-table" element={<BookTable />} />
        <Route path="/contact" element={<Contact />} />

        {/* Testside til backend API */}
        <Route path="/api-test" element={<ApiTest />} />
      </Routes>
    </>
  );
}
