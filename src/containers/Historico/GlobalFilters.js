const GlobalFilters = (items, search, searchTerm) => {
  if (search === null) return items;
  return items.filter((item) => {
    return searchTerm.some((newItem) => {
      return (
        item[newItem].toString().toLowerCase().indexOf(search.toLowerCase()) >
        -1
      );
    });
  });
};

export default GlobalFilters;
