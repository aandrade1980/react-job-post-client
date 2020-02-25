export const parseCategories = (categories = [], allCategories) => {
  const cats = Array.isArray(categories) ? categories : categories.split(",");
  return cats.map(cat => allCategories.find(_cat => _cat.id === cat));
};
