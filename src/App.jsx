import React from "react";
import { Routes, Route } from "react-router-dom";
import CreateInvoice from "./pages/createInvoice";
import EditInvoice from "./pages/EditInvoice";
import Home from "./pages/home";
import ViewInvoice from "./pages/ViewInvoice";

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
