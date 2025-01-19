export const API_KEY = "AIzaSyAgkkiLC-UpgJPX58KNaZh-6bXk74m-RCg";

// Value Converter Function
export const value_converter = (value) => {
  if (value >= 1000000) {
    return (value / 1000000).toFixed(1) + "M"; // Convert to millions with one decimal place
  } else if (value >= 1000) {
    return (value / 1000).toFixed(1) + "K"; // Convert to thousands with one decimal place
  } else {
    return value.toString(); // Return the original number if less than 1000
  }
};

export const formatTime = (timestamp) => {
  const date = new Date(timestamp);
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
};
