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

export const calcCurrentProduct = (page, seletedQty) => {
  let items = JSON.parse(sessionStorage.getItem("items")) || [];
  let perPage = items.length / parseInt(seletedQty);
  let totalPage = items.length / perPage;
  let resultItems = items.slice(totalPage * (page - 1), totalPage * page);
  return resultItems;
};

export const formattedDescription = (product) => {
  return product?.description.length > 40
    ? product?.description.slice(0, 40).trim() + "..."
    : product?.description.trim();
};

export const formattedPrice = (product) => {
  return new Intl.NumberFormat("en-IN", {
    maximumSignificantDigits: 3,
  }).format(product.price);
};
