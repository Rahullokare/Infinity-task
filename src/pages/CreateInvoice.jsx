import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { v4 as uuidv4 } from "uuid";
import { addInvoice } from "../features/invoice/invoiceSlice";
import swal from "sweetalert";

const initialLineItem = {
  lineItemId: uuidv4(),
  description: "",
  quantity: 0,
  rate: 0,
  subtotal: 0,
};

const CreateInvoice = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    invoiceNumber: "",
    createdDate: new Date(),
    dueDate: new Date(),
    status: "",
    client: {
      name: "",
      address: "",
      email: "",
    },
    lineItems: [initialLineItem],
    notes: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleClientInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      client: {
        ...prevData.client,
        [name]: value,
      },
    }));
  };
  const handleDateChange = (e, name) => {
    const selectedDate = new Date(e.target.value);

    setFormData((prevData) => ({
      ...prevData,
      [name]: selectedDate.toISOString().split("T")[0],
    }));
  };

  const handleLineItemChange = (e, index) => {
    const { name, value } = e.target;
    setFormData((prevData) => {
      const updatedLineItems = prevData.lineItems.map((item, i) => {
        if (i === index) {
          return { ...item, [name]: value };
        } else {
          return item;
        }
      });

      return { ...prevData, lineItems: updatedLineItems };
    });
  };

  const handleAddLineItem = () => {
    setFormData((prevData) => ({
      ...prevData,
      lineItems: [...prevData.lineItems, { ...initialLineItem }],
    }));
  };

  const handleRemoveLineItem = (index) => {
    setFormData((prevData) => {
      const updatedLineItems = prevData.lineItems.filter((_, i) => i !== index);
      return { ...prevData, lineItems: updatedLineItems };
    });
  };

  const handleSubmit = () => {
    if (
      formData.invoiceNumber.trim() === "" ||
      formData.client.name.trim() === "" ||
      formData.client.address.trim() === "" ||
      formData.client.email.trim() === "" ||
      formData.dueDate.trim() === "" ||
      formData.status.trim() === "" ||
      formData.lineItems.some(
        (item) =>
          item.description.trim() === "" ||
          item.quantity === 0 ||
          item.rate === 0 ||
          item.subtotal === 0
      )
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    // Dispatch the createInvoice action with the form data
    dispatch(addInvoice(formData));

    swal({
      icon: "success",
      text: `Request Submitted Sucessfully`,
    });
    // Reset the form after submission
    setFormData({
      invoiceNumber: "",
      createdDate: new Date(),
      dueDate: new Date(),
      status: "",
      client: {
        name: "",
        address: "",
        email: "",
      },
      lineItems: [initialLineItem],
      notes: "",
    });
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded shadow-lg mt-8">
      <h2 className="text-2xl font-semibold mb-6">Create Invoice</h2>

      <div className="grid grid-cols-2 gap-6">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">
            Invoice Number
          </label>
          <input
            className="mt-1 p-2 w-full border rounded-md"
            type="text"
            name="invoiceNumber"
            value={formData.invoiceNumber}
            onChange={handleInputChange}
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">
            Created Date
          </label>
          <input
            className="mt-1 p-2 w-full border rounded-md"
            type="date"
            onChange={(e) => handleDateChange(e, "createdDate")}
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">
            Due Date
          </label>
          <input
            className="mt-1 p-2 w-full border rounded-md"
            type="date"
            onChange={(e) => handleDateChange(e, "dueDate")}
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">
            Status
          </label>
          <select
            className={` mt-1 p-2 w-full border rounded-md`}
            name="status"
            onChange={handleInputChange}
          >
            <option value="">Select Status</option>
            <option value="outstanding">Outstanding</option>
            <option value="paid">Paid</option>
            <option value="late">Late</option>
          </select>
        </div>
      </div>

      <div className="mb-4">
        <h3 className="text-xl font-semibold mb-4">Client Information</h3>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Client Name
            </label>
            <input
              className="mt-1 p-2 w-full border rounded-md"
              type="text"
              name="name"
              value={formData.client.name}
              onChange={handleClientInputChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">
              Client Email
            </label>
            <input
              className="mt-1 p-2 w-full border rounded-md"
              type="email"
              name="email"
              value={formData.client.email}
              onChange={handleClientInputChange}
            />
          </div>
        </div>

        <div className="mb-4 mt-4">
          <label className="block text-sm font-medium text-gray-600">
            Client Address
          </label>
          <input
            className="mt-1 p-2 w-full border rounded-md"
            type="text"
            name="address"
            value={formData.client.address}
            onChange={handleClientInputChange}
          />
        </div>
      </div>

      <div className="mb-4">
        <h3 className="text-xl font-semibold mb-4">Line Items</h3>

        {formData.lineItems.map((item, index) => (
          <div className="grid grid-cols-2 gap-6 mb-4" key={item.lineItemId}>
            {/* Line Item Description */}
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Description
              </label>
              <input
                className="mt-1 p-2 w-full border rounded-md"
                type="text"
                name="description"
                value={item.description}
                onChange={(e) => handleLineItemChange(e, index)}
              />
            </div>

            {/* Line Item Quantity */}
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Quantity
              </label>
              <input
                className="mt-1 p-2 w-full border rounded-md"
                type="number"
                name="quantity"
                value={item.quantity}
                onChange={(e) => handleLineItemChange(e, index)}
              />
            </div>

            {/* Line Item Rate */}
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Rate
              </label>
              <input
                className="mt-1 p-2 w-full border rounded-md"
                type="number"
                name="rate"
                value={item.rate}
                onChange={(e) => handleLineItemChange(e, index)}
              />
            </div>

            {/* Line Item Subtotal */}
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Subtotal
              </label>
              <input
                className="mt-1 p-2 w-full border rounded-md"
                type="number"
                name="subtotal"
                value={item.subtotal}
                onChange={(e) => handleLineItemChange(e, index)}
              />
            </div>

            {/* Remove Line Item Button */}
            <div>
              <button
                className="mt-6 bg-red-500 text-white px-3 py-1 rounded"
                onClick={() => handleRemoveLineItem(index)}
              >
                Remove
              </button>
            </div>
          </div>
        ))}

        {/* Add Line Item Button */}
        <button
          className="bg-blue-500 text-white px-3 py-1 rounded"
          onClick={handleAddLineItem}
        >
          Add Line Item
        </button>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600">Notes</label>
        <textarea
          className="mt-1 p-2 w-full border rounded-md"
          name="notes"
          value={formData.notes}
          onChange={handleInputChange}
        ></textarea>
      </div>

      <button
        className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded transition duration-300"
        onClick={handleSubmit}
      >
        Create Invoice
      </button>
    </div>
  );
};

export default CreateInvoice;
