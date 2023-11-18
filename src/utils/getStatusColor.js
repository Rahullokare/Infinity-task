export const getStatusColor = (status) => {
  switch (status) {
    case "outstanding":
      return "text-red-500";
    case "paid":
      return "text-green-500";
    case "late":
      return "text-red-500"; // Adjust as needed
    default:
      return "";
  }
};

export const getStatusStyle = (status) => {
  switch (status) {
    case "paid":
      return "bg-green-100"; // Green for paid
    case "late":
      return "bg-yellow-100"; // Yellow for late
    case "outstanding":
      return "bg-red-100"; // Red for outstanding
    default:
      return "";
  }
};
