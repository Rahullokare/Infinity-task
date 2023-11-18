import React from "react";
import { Page, Text, Document, StyleSheet, View } from "@react-pdf/renderer";

export const InvoicePDF = ({ data }) => {
  return (
    <Document>
      <Page style={styles.page}>
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Invoice</Text>
            <Text style={styles.invoiceNumber}>
              Invoice Number: {data.invoiceNumber}
            </Text>
            <Text style={styles.date}>Invoice Date: {data.createdDate}</Text>
            <Text style={styles.date}>Due Date: {data.dueDate}</Text>
            <Text style={styles.status}>Status: {data.status}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Client Information:</Text>
            <Text style={styles.clientInfo}>Name: {data.client.name}</Text>
            <Text style={styles.clientInfo}>
              Address: {data.client.address}
            </Text>
            <Text style={styles.clientInfo}>Email: {data.client.email}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Line Items:</Text>
          <View style={styles.itemsTable}>
            {data.lineItems.map((item) => (
              <View key={item.lineItemId} style={styles.item}>
                <Text>{item.description}</Text>
                <Text>Quantity: {item.quantity}</Text>
                <Text>Rate: ${item.rate}</Text>
                <Text>Subtotal: ${item.subtotal}</Text>
              </View>
            ))}
          </View>
        </View>
      </Page>
    </Document>
  );
};

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    margin: 10,
  },
  header: {
    marginBottom: 20,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textTransform: "uppercase",
  },
  invoiceNumber: {
    fontSize: 16,
    marginBottom: 10,
  },
  date: {
    fontSize: 12,
    marginBottom: 5,
  },
  status: {
    fontSize: 12,
    marginBottom: 5,
    color: "red", // Use a color that represents the status
  },
  section: {
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  clientInfo: {
    fontSize: 12,
    marginBottom: 5,
  },
  item: {
    marginBottom: 10,
    display: "flex",
    flexDirection: "row",
    gap: "9px",
  },
  itemsTable: {
    display: "flex",
    flexDirection: "column",
  },
  lineItemId: {
    display: "flex",
    flexDirection: "row",
    gap: "9px",
  },
});
