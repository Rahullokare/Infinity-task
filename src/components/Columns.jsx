export const INVOICES_COLUMN = [
	{
		Header: 'invoiceNumber',
		accessor: 'invoiceNumber',
	},
	{
		Header: 'client',
		accessor: (row) => row.client.name,
	},
	{
		Header: 'status',
		accessor: 'status',
	},

	{
		Header: 'createdDate',
		accessor: 'createdDate',
	},

	{
		Header: 'dueDate',
		accessor: 'dueDate',
	},
];
