//This formatter is utilized within the search screens (ex: DetailPlacesScreen)
export const formatDateToYYYYMMDD = (date) => {
  const d = new Date(date);
  const month = "" + (d.getMonth() + 1);
  const day = "" + d.getDate();
  const year = d.getFullYear();
  return [
    year,
    month.length < 2 ? "0" + month : month,
    day.length < 2 ? "0" + day : day,
  ].join("-");
};

export const getFormattedDate = (date) => {
  let year = date.getFullYear();
  let month = (1 + date.getMonth()).toString().padStart(2, "0");
  let day = date.getDate().toString().padStart(2, "0");

  return month + "/" + day + "/" + year;
};
