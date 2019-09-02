export const parseCategories = (categories = "", allCategories) => {
  const cats = Array.isArray(categories) ? categories : categories.split(",");
  let catsToReturn = [];

  cats.forEach(cat =>
    catsToReturn.push(...allCategories.filter(_cat => _cat.id === cat))
  );

  return catsToReturn;
};
