import moment from "moment";

const formatDate = (inputDate: string | Date): string => {
  const today = moment().startOf("day");
  const yesterday = moment().subtract(1, "days").startOf("day");
  const inputMoment = moment(inputDate).startOf("day");

  if (inputMoment.isSame(today, "day")) {
    return "today";
  } else if (inputMoment.isSame(yesterday, "day")) {
    return "yesterday";
  } else {
    return inputMoment.format("YYYY-MM-DD");
  }
};

export default formatDate;
