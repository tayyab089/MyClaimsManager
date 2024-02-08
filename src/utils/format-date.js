import format from "date-fns/format";

export const formatDate = (date, month) => {
  if (month) {
    return date ? format(new Date(date), "MMM do yyyy") : "";
  } else {
    return date ? format(new Date(date), "MMMM do yyyy") : "";
  }
};
