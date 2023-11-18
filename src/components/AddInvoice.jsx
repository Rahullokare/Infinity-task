import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addInvoice } from '../features/invoice/invoiceSlice';
const AddInvoice = () => {
	const dispatch = useDispatch();
	const [input, setInput] = useState('');
	const addInvoiceHandler = (e) => {
		e.preventDefault();
		dispatch(addInvoice({ input }));
		setInput('');
	};
	return (
		<form onSubmit={addInvoiceHandler} className="flex items-center space-x-2">
			<input
				type="text"
				onChange={(e) => setInput(e.target.value)}
				className="w-40 p-2 border border-gray-300 focus:outline-none focus:ring focus:border-blue-300 rounded-lg"
				placeholder="Enter Invoice"
			/>
			<button
				type="submit"
				className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
			>
				Add
			</button>
		</form>
	);
};

export default AddInvoice;
