const formatTime12HrFormat = (date: Date): string => {
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";

  // Convert hours to 12-hour format
  hours = hours % 12;
  hours = hours ? hours : 12; // Handle midnight (0 hours)

  // Pad minutes and seconds with leading zeros if necessary
  const paddedMinutes = minutes < 10 ? `0${minutes}` : minutes;

  return `${hours}:${paddedMinutes} ${ampm}`;
};

export default formatTime12HrFormat;
