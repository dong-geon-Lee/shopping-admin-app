import React, { useState } from "react";
import { useQuery } from "react-query";
import { useDispatch } from "react-redux";
import { fetchProducts } from "../../api/api";
import { updateProducts } from "../../redux-toolkit/productSlice";
import { sortedItems } from "../../constants/constants";
import {
  calcBrandCount,
  calcProductDesCount,
  calcProductTitleCount,
} from "../../helpers/helpers";
import arrowUp from "../../assets/arrow-open-up.svg";
import arrowDown from "../../assets/arrow-open-down.svg";
import "./Search.scss";

const Search = () => {
  const categoryStorage = sessionStorage.getItem("category");
  const searchStorage = sessionStorage.getItem("search");
  const resultStorage = JSON.parse(sessionStorage.getItem("items"));

  const [categoryActive, setCategoryActive] = useState(false);
  const [category, setCategory] = useState(categoryStorage || "전체");
  const [searchValue, setSearchValue] = useState(searchStorage || "");

  const { data } = useQuery("products", fetchProducts);
  const { products } = data || [];
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
    const brandItems = calcBrandCount(products, searchValue);
    dispatch(updateProducts(brandItems));
    sessionStorage.setItem("items", JSON.stringify(brandItems));
  };

  const findProductTitle = () => {
    const productTitleList = calcProductTitleCount(products, searchValue);
    dispatch(updateProducts(productTitleList));
    sessionStorage.setItem("items", JSON.stringify(productTitleList));
  };

  const findProductDescription = () => {
    const productDesList = calcProductDesCount(products, searchValue);
    dispatch(updateProducts(productDesList));
    sessionStorage.setItem("items", JSON.stringify(productDesList));
  };

  const findProductAll = () => {
    dispatch(updateProducts(products));
    sessionStorage.setItem("items", JSON.stringify(products));
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    sessionStorage.setItem("category", category);
    sessionStorage.setItem("search", searchValue);

    if (category === "전체") findProductAll();
    if (category === "브랜드") findProductBrand();
    if (category === "상품명") findProductTitle();
    if (category === "상품내용") findProductDescription();

    window.location.reload();
  };

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
                  <>
                    <img
                      src={arrowUp}
                      alt="arrow-up"
                      className="arrow__up"
                      onClick={() => handleCategory()}
                    />
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
                  </>
                )}
              </div>
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
        검색된 데이터: {resultStorage?.length}건
      </p>
    </>
  );
};

export default Search;
