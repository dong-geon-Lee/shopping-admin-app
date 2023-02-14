import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProducts,
  updateProducts,
} from "../../redux-toolkit/productSlice";
import arrowUp from "../../assets/arrow-open-up.svg";
import arrowDown from "../../assets/arrow-open-down.svg";
import "./Search.scss";

const Search = () => {
  const { data } = useQuery("products", fetchProducts);
  const { products } = data || [];

  const [categoryActive, setCategoryActive] = useState(false);
  const [category, setCategory] = useState(
    sessionStorage.getItem("category") || "전체"
  );
  const [searchValue, setSearchValue] = useState(
    sessionStorage.getItem("search") || ""
  );

  const product = useSelector((state) => state.product.products);
  console.log(product);

  const dispatch = useDispatch();

  const handleCategory = () => {
    setCategoryActive((prevState) => !prevState);
  };

  const handleFilterCategory = (category) => {
    setCategoryActive(false);
    setCategory(category);
  };

  const onChange = (e) => {
    setSearchValue(e.target.value);
  };

  const findProductBrand = () => {
    const brandItems = [
      ...new Set(products.map((product) => product.brand.toLowerCase())),
    ];

    const equalBrandItems = products.filter(
      (product) =>
        product.brand.toLowerCase().startsWith(searchValue) ||
        product.brand.toLowerCase().endsWith(searchValue) ||
        searchValue.toLowerCase() === brandItems.includes(searchValue)
    );

    dispatch(updateProducts(equalBrandItems));
    sessionStorage.setItem("items", JSON.stringify(equalBrandItems));
  };

  const findProductTitle = () => {
    const titleItems = [
      ...new Set(products.map((product) => product.title.toLowerCase())),
    ];

    const productTitleList = products.filter(
      (product) =>
        product.title.toLowerCase().startsWith(searchValue) ||
        product.title.toLowerCase().endsWith(searchValue) ||
        titleItems.includes(product || searchValue)
    );

    dispatch(updateProducts(productTitleList));
    sessionStorage.setItem("items", JSON.stringify(productTitleList));
  };

  const findProductDescription = () => {
    const descriptionItems = [
      ...new Set(products.map((product) => product.description.toLowerCase())),
    ];

    const findDesStr = descriptionItems.filter((item) =>
      item.split(" ").includes(searchValue)
    );

    const findDesWords = descriptionItems.filter(
      (item) => item.startsWith(searchValue) || item.endsWith(searchValue)
    );

    const productDesList = products.filter(
      (product) =>
        findDesStr.includes(product.description.toLowerCase()) ||
        findDesWords.includes(product.description.toLowerCase())
    );

    dispatch(updateProducts(productDesList));
    sessionStorage.setItem("items", JSON.stringify(productDesList));
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    sessionStorage.setItem("category", category);
    sessionStorage.setItem("search", searchValue);

    if (category === "브랜드") findProductBrand();
    if (category === "상품명") findProductTitle();
    if (category === "상품내용") findProductDescription();
  };

  let sortedItems = [
    { id: 1, title: "전체" },
    { id: 2, title: "상품명" },
    { id: 3, title: "브랜드" },
    { id: 4, title: "상품내용" },
  ];

  useEffect(() => {
    setCategory(category);
  }, [category]);

  return (
    <>
      <div className="container">
        <div className="wrapper">
          <h1 className="title">상품검색</h1>
          <form onSubmit={handleSearchSubmit} className="search__box">
            <h1 className="search__text">검색</h1>
            <div className="category__box">
              <div className="search__menu">
                <h2>{category}</h2>

                {!categoryActive ? (
                  <img
                    src={arrowDown}
                    alt="arrow-up"
                    className="arrow__down"
                    onClick={() => handleCategory()}
                  />
                ) : (
                  <img
                    src={arrowUp}
                    alt="arrow-up"
                    className="arrow__up"
                    onClick={() => handleCategory()}
                  />
                )}
              </div>
              {categoryActive && (
                <ul className="category__list">
                  {sortedItems.map((item) => (
                    <li
                      key={item.id}
                      onClick={() => handleFilterCategory(item.title)}
                    >
                      {item.title}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <input
              type="text"
              className="search__input"
              value={searchValue}
              onChange={onChange}
            />
            <button type="submit" className="search__btn">
              조회
            </button>
          </form>
        </div>
      </div>
      <p className="search__results">
        검색된 데이터: {JSON.parse(sessionStorage.getItem("items")).length}건
      </p>
    </>
  );
};

export default Search;
