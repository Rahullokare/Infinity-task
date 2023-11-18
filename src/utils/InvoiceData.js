export const invoiceData = [
	{
		invoiceId: 1,
		invoiceNumber: 'INV-2023-001',
		createdDate: '2023-11-07',
		dueDate: '2023-12-07',
		status: 'Outstanding',
		client: {
			name: 'Client A',
			address: '123 Main St, City, Country',
			email: 'clientA@email.com',
		},
		lineItems: [
			{
				lineItemId: 1,
				description: 'Service 1',
				quantity: 10,
				rate: 50,
				subtotal: 500,
			},
			{
				lineItemId: 2,
				description: 'Materials',
				quantity: 2,
				rate: 30,
				subtotal: 60,
			},
		],
		notes: 'Please make the payment to the following account...',
	},
	{
		invoiceId: 2,
		invoiceNumber: 'INV-2023-002',
		createdDate: '2023-11-08',
		dueDate: '2023-12-08',
		status: 'Outstanding',
		client: {
			name: 'Client B',
			address: '456 Elm St, City, Country',
			email: 'clientB@email.com',
		},
		lineItems: [
			{
				lineItemId: 3,
				description: 'Service 2',
				quantity: 15,
				rate: 60,
				subtotal: 900,
			},
			{
				lineItemId: 4,
				description: 'Materials',
				quantity: 5,
				rate: 40,
				subtotal: 200,
			},
		],
		notes: 'Payment instructions: ...',
	},
	{
		invoiceId: 3,
		invoiceNumber: 'INV-2023-003',
		createdDate: '2023-11-09',
		dueDate: '2023-12-09',
		status: 'Paid',
		client: {
			name: 'Client C',
			address: '789 Oak St, City, Country',
			email: 'clientC@email.com',
		},
		lineItems: [
			{
				lineItemId: 5,
				description: 'Service 3',
				quantity: 8,
				rate: 70,
				subtotal: 560,
			},
			{
				lineItemId: 6,
				description: 'Materials',
				quantity: 3,
				rate: 35,
				subtotal: 105,
			},
		],
		notes: 'Thank you for your prompt payment.',
	},
	{
		invoiceId: 4,
		invoiceNumber: 'INV-2023-004',
		createdDate: '2023-11-10',
		dueDate: '2023-12-10',
		status: 'Outstanding',
		client: {
			name: 'Client D',
			address: '101 Pine St, City, Country',
			email: 'clientD@email.com',
		},
		lineItems: [
			{
				lineItemId: 7,
				description: 'Service 4',
				quantity: 12,
				rate: 45,
				subtotal: 540,
			},
		],
		notes: 'Please make the payment to the following account...',
	},
	{
		invoiceId: 5,
		invoiceNumber: 'INV-2023-005',
		createdDate: '2023-11-11',
		dueDate: '2023-12-11',
		status: 'Late',
		client: {
			name: 'Client E',
			address: '222 Cedar St, City, Country',
			email: 'clientE@email.com',
		},
		lineItems: [
			{
				lineItemId: 8,
				description: 'Service 5',
				quantity: 20,
				rate: 55,
				subtotal: 1100,
			},
		],
		notes:
			'This invoice is past due. Please make the payment as soon as possible.',
	},
];
