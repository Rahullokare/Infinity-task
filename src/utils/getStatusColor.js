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
