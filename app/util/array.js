export const filterDuplicateItem = (array = [], key = "id") => {
  const uniqueIds = new Set();

  const unique = array.filter((element) => {
    const isDuplicate = uniqueIds.has(element[key]);
    if (!isDuplicate) {
      uniqueIds.add(element[key]);
      return true;
    }
  });
  return unique;
};
