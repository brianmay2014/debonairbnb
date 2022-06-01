export const dateParser = (dateobj) => {
  let year = dateobj.getFullYear();
  let month = dateobj.getMonth() + 1;
  let day = dateobj.getDate();

  if (month < 10) {
    month = `0${month.toString()}`;
  }
  if (day < 10) {
    day = `0${day.toString()}`;
  }
  return `${year}-${month.toString()}-${day.toString()}`;
}
