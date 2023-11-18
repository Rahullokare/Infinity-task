export const generateEmailLink = (invoice) => {
  const { invoiceNumber, client, dueDate, total } = invoice;

  const subject = `Payment Reminder - Invoice #${invoiceNumber}`;
  const body = `
Dear ${client.name},

This is a friendly reminder regarding invoice #${invoiceNumber} that is due on ${dueDate}.

Total Amount: $${total}

Please ensure the payment is made by the due date.

Thank you,
Your Company Name
`;

  // Encode the subject and body to ensure special characters are properly handled
  const encodedSubject = encodeURIComponent(subject);
  const encodedBody = encodeURIComponent(body);

  // Create the mailto link
  const mailtoLink = `mailto:${client.email}?subject=${encodedSubject}&body=${encodedBody}`;

  return mailtoLink;
};
