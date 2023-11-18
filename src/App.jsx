import React from "react";
import { Routes, Route } from "react-router-dom";
import CreateInvoice from "./pages/CreateInvoice";
import EditInvoice from "./pages/EditInvoice";
import Home from "./pages/Home";

function App() {
  return (
    <div className="Routes">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/edit/invoice/:id" element={<EditInvoice />} />
        <Route path="/create/invoice" element={<CreateInvoice />} />
      </Routes>
    </div>
  );
}

export default App;
