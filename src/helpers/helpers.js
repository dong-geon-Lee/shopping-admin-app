export const calcBrandCount = (products, searchValue) => {
  return [
    ...new Set(
      products.filter((product) => {
        return product.brand.toLowerCase().match(searchValue);
      })
    ),
  ];
};

export const calcProductTitleCount = (products, searchValue) => {
  return [
    ...new Set(
      products.filter((product) => {
        return product.title.toLowerCase().match(searchValue);
      })
    ),
  ];
};

export const calcProductDesCount = (products, searchValue) => {
  const descriptionItems = [
    ...new Set(products.map((product) => product.description.toLowerCase())),
  ];

  const findDesStr = descriptionItems.filter((item) => {
    return item.match(searchValue);
  });

  const productDesList = products.filter((product) => {
    return findDesStr.includes(product.description.toLowerCase());
  });

  return productDesList;
};
