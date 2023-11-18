import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { updateInvoice } from "../features/invoice/invoiceSlice";
import { generateEmailLink } from "../utils/generateMailLink";
import { IoIosSend } from "react-icons/io";
import { FaDownload } from "react-icons/fa";
import { getStatusColor } from "../utils/getStatusColor";
import { InvoicePDF } from "./InvoicePDF";
import { PDFDownloadLink } from "@react-pdf/renderer";
const EditInvoice = () => {
  const invoices = useSelector((state) => state.invoices);
  const dispatch = useDispatch();
  const { id } = useParams();
  const [editMode, setEditMode] = useState(false);
  const [editedData, setEditedData] = useState({
    ...invoices.find((e) => e.invoiceNumber === id),
  });
  const [formValid, setFormValid] = useState(true);

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleCancelClick = () => {
    setEditMode(false);
    setEditedData({ ...invoices.find((e) => e.invoiceNumber === id) });
    setFormValid(true);
  };

  const handleSaveClick = () => {
    // Check form validity before saving
    if (!isFormValid()) {
      setFormValid(false);
      alert("Please fill all the fields");
      return;
    }

    // Dispatch the updateInvoice action with the updated data
    dispatch(updateInvoice(editedData));

    setEditMode(false);
    setFormValid(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "name" || name === "email" || name === "address") {
      setEditedData((prevData) => ({
        ...prevData,
        client: {
          ...prevData.client,
          [name]: value,
        },
      }));
    } else {
      setEditedData((prevData) => ({ ...prevData, [name]: value }));
    }
  };
  const handleInputChangeLineItem = (e, index) => {
    const { name, value } = e.target;

    setEditedData((prevData) => {
      const updatedLineItems = prevData.lineItems.map((item, i) => {
        if (i === index) {
          return { ...item, [name]: value };
        } else {
          return item;
        }
      });

      return { ...prevData, lineItems: updatedLineItems };
    });
    console.log(editedData);

    setFormValid(true);
  };

  const isFormValid = () => {
    // Implement your form validation logic here
    // For example, check if required fields are not empty
    return (
      editedData.client.name.trim() !== "" &&
      editedData.client.address.trim() !== "" &&
      editedData.client.email.trim() !== "" &&
      editedData.dueDate.trim() !== "" &&
      editedData.status.trim() !== ""
    );
  };

  return (
    <div>
      {invoices
        .filter((e) => e.invoiceNumber === id)
        .map((invoice) => {
          return (
            <div key={invoice.invoiceNumber}>
              <div className="max-w-screen-lg mx-auto h-screen flex-col items-center justify-center  bg-white shadow-lg p-8 mt-8 rounded-md">
                {/* Invoice Header */}
                <div className="mb-8">
                  <h2 className="text-3xl font-semibold">
                    Invoice #
                    {editMode
                      ? editedData.invoiceNumber
                      : invoice.invoiceNumber}
                  </h2>
                  <p className="text-gray-500">
                    Created on{" "}
                    {editMode ? editedData.createdDate : invoice.createdDate}
                  </p>
                </div>
                <PDFDownloadLink
                  document={<InvoicePDF data={invoice} />}
                  fileName="invoice.pdf"
                >
                  {({ blob, url, loading, error }) => (
                    <button className="bg-red-500 mb-5 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                      {loading ? (
                        "Loading document..."
                      ) : (
                        <>
                          Download PDF
                          <span className="ml-2 ">
                            <FaDownload className="inline-block" />
                          </span>
                        </>
                      )}
                    </button>
                  )}
                </PDFDownloadLink>
                {/* Invoice Details */}
                <div className="flex  justify-between items-center mb-8">
                  <div>
                    <p className="font-semibold text-lg">
                      {editMode ? (
                        <input
                          className={`${
                            !formValid && editedData.client.name.trim() === ""
                              ? "border-red-500"
                              : ""
                          } border p-2 rounded-md w-full`}
                          type="text"
                          name="name"
                          defaultValue={editedData.client.name}
                          onChange={handleInputChange}
                        />
                      ) : (
                        invoice.client.name
                      )}
                    </p>
                    <p className="text-gray-500">
                      {editMode ? (
                        <input
                          className={`${
                            !formValid && editedData.client.name.trim() === ""
                              ? "border-red-500"
                              : ""
                          } border p-2 rounded-md w-full`}
                          type="text"
                          name="address"
                          defaultValue={editedData.client.address}
                          onChange={handleInputChange}
                        />
                      ) : (
                        invoice.client.address
                      )}
                    </p>
                    <p className="text-gray-500">
                      {editMode ? (
                        <input
                          className={`${
                            !formValid && editedData.client.name.trim() === ""
                              ? "border-red-500"
                              : ""
                          } border p-2 rounded-md w-full`}
                          type="email"
                          name="email"
                          defaultValue={editedData.client.email}
                          onChange={handleInputChange}
                        />
                      ) : (
                        invoice.client.email
                      )}
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold">
                      Due Date:{" "}
                      {editMode ? (
                        <input
                          className={`${
                            !formValid && editedData.client.name.trim() === ""
                              ? "border-red-500"
                              : ""
                          } border p-2 rounded-md w-full`}
                          type="date"
                          name="dueDate"
                          defaultValue={editedData.dueDate}
                          onChange={handleInputChange}
                        />
                      ) : (
                        invoice.dueDate
                      )}
                    </p>
                    <p
                      className={`font-semibold ${
                        editMode
                          ? getStatusColor(editedData.status)
                          : getStatusColor(invoice.status)
                      }`}
                    >
                      {editMode ? (
                        <select
                          className={`${
                            !formValid && editedData.client.name.trim() === ""
                              ? "border-red-500"
                              : "border"
                          } p-2 rounded-md w-full`}
                          name="status"
                          defaultValue={editedData.status}
                          onChange={handleInputChange}
                        >
                          <option value="">Select Status</option>
                          <option value="outstanding">Outstanding</option>
                          <option value="paid">Paid</option>
                          <option value="late">Late</option>
                          {/* Add more options as needed */}
                        </select>
                      ) : (
                        invoice.status
                      )}
                    </p>
                  </div>

                  {invoice.status.toLowerCase() === "outstanding" ||
                  invoice.status.toLowerCase() === "late" ? (
                    <a
                      href={generateEmailLink(invoice)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition duration-300"
                    >
                      Send Payment Reminder{" "}
                      <IoIosSend className="inline-block" size={22} />
                    </a>
                  ) : null}
                </div>

                {/* Invoice Line Items */}
                <div className="mb-8 ">
                  <table className="w-full border-collapse border border-gray-300">
                    <thead>
                      <tr>
                        <th className="border border-gray-300  py-2 px-4">
                          Description
                        </th>
                        <th className="border border-gray-300 py-2 px-4">
                          Quantity
                        </th>
                        <th className="border border-gray-300 py-2 px-4">
                          Rate
                        </th>
                        <th className="border border-gray-300 py-2 px-4">
                          Subtotal
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {editedData.lineItems.map((item, index) => (
                        <tr key={index}>
                          <td className="border border-gray-300 py-2 px-4">
                            {editMode ? (
                              <input
                                className={`${
                                  !formValid &&
                                  editedData.client.name.trim() === ""
                                    ? "border-red-500"
                                    : ""
                                } border p-2 rounded-md w-full`}
                                type="text"
                                name={`description`}
                                defaultValue={item.description}
                                onChange={(e) =>
                                  handleInputChangeLineItem(e, index)
                                }
                              />
                            ) : (
                              item.description
                            )}
                          </td>
                          <td className="border border-gray-300 py-2 px-4">
                            {editMode ? (
                              <input
                                className={`${
                                  !formValid &&
                                  editedData.client.name.trim() === ""
                                    ? "border-red-500"
                                    : ""
                                } border p-2 rounded-md w-full`}
                                type="number"
                                name={`quantity`}
                                defaultValue={item.quantity}
                                onChange={(e) =>
                                  handleInputChangeLineItem(e, index)
                                }
                              />
                            ) : (
                              item.quantity
                            )}
                          </td>
                          <td className="border border-gray-300 py-2 px-4">
                            {editMode ? (
                              <input
                                className={`${
                                  !formValid &&
                                  editedData.client.name.trim() === ""
                                    ? "border-red-500"
                                    : ""
                                } border p-2 rounded-md w-full`}
                                type="number"
                                name={`rate`}
                                defaultValue={item.rate}
                                onChange={(e) =>
                                  handleInputChangeLineItem(e, index)
                                }
                              />
                            ) : (
                              `$${item.rate}`
                            )}
                          </td>
                          <td className="border border-gray-300 py-2 px-4">
                            {editMode ? (
                              <input
                                className={`${
                                  !formValid &&
                                  editedData.client.name.trim() === ""
                                    ? "border-red-500"
                                    : ""
                                } border p-2 rounded-md w-full`}
                                type="number"
                                name={`subtotal`}
                                defaultValue={item.subtotal}
                                onChange={(e) =>
                                  handleInputChangeLineItem(e, index)
                                }
                              />
                            ) : (
                              `$${item.subtotal}`
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Invoice Notes */}
                <div>
                  <h3 className="text-xl font-semibold mb-4">Notes</h3>
                  <p className="text-gray-500">
                    {editMode ? (
                      <textarea
                        name="notes"
                        className="border p-2 rounded-md w-full mb-3 "
                        defaultValue={editedData.notes}
                        onChange={handleInputChange}
                      />
                    ) : (
                      invoice.notes
                    )}
                  </p>
                </div>

                {/* Edit Button */}
                <div className="flex justify-end">
                  {editMode ? (
                    <>
                      <button
                        className="bg-gray-500 text-white px-4 py-2 mr-2 rounded-md"
                        onClick={handleSaveClick}
                      >
                        Save
                      </button>
                      <button
                        className="bg-red-500 text-white px-4 py-2 rounded-md"
                        onClick={handleCancelClick}
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <button
                      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition duration-300"
                      onClick={handleEditClick}
                    >
                      Edit
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default EditInvoice;
