export const formatDate = (isoDate: string) => {
  const date = new Date(isoDate);
  const fullDate =
    date.getDate() +
    "/" +
    (date.getMonth() + 1) +
    "/" +
    date.getFullYear() +
    " - ";

  return fullDate
    .toString()
    .replace("NaN", "---")
    .replace("NaN/", "--")
    .replace("-NaN", "-/--")
    .replace(" ", "")
    .replace("-", "");
};
