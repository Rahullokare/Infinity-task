// invoiceSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { invoiceData } from "../../utils/InvoiceData";

const initialState = {
  invoices: invoiceData,
};

const invoiceSlice = createSlice({
  name: "invoices",
  initialState,
  reducers: {
    addInvoice: (state, action) => {
      state.invoices = [...state.invoices, action.payload];
    },
    updateInvoice: (state, action) => {
      const { invoiceId } = action.payload;
      state.invoices = state.invoices.map((invoice) =>
        invoice.invoiceId === invoiceId ? action.payload : invoice
      );
    },
    deleteInvoice: (state, action) => {
      const { invoiceId } = action.payload;
      console.log("Deleting invoice with ID:", invoiceId);
      state.invoices = state.invoices.filter(
        (invoice) => invoice.invoiceNumber !== invoiceId
      );
    },
  },
});

export const { addInvoice, updateInvoice, deleteInvoice } =
  invoiceSlice.actions;

export default invoiceSlice.reducer;
