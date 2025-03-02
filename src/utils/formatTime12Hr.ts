import moment from "moment";

const formatTime12HrFormat = (date: Date | string): string => {
  return moment(date).format("h:mm A");
};

export default formatTime12HrFormat;
