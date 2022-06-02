import { addDays } from "date-fns";
import { dateParser } from "./dateParser";



export const dateArrayCreator = (startDate, stopDate) => {
  var dateArray = new Array();
  var currentDate = startDate;
  while (currentDate <= stopDate) {
      dateArray.push(new Date (currentDate));
      currentDate = addDays(currentDate, 1);
  }
  return dateArray
}
