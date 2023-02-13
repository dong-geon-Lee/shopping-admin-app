import React, { useState } from "react";
import "./Search.scss";

import arrowUp from "../../assets/arrow-open-up.svg";
import arrowDown from "../../assets/arrow-open-down.svg";

const Search = () => {
  const [categoryActive, setCategoryActive] = useState(false);

  const handleCategory = () => {
    setCategoryActive((prevState) => !prevState);
  };

  console.log(categoryActive);

  return (
    <>
      <div className="container">
        <div className="wrapper">
          <h1 className="title">상품검색</h1>
          <div className="search__box">
            <h1 className="search__text">검색</h1>
            <div className="category__box">
              <div className="search__menu">
                <h2>전체</h2>

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
                  <li>전체</li>
                  <li>상품명</li>
                  <li>브랜드</li>
                  <li>상품내용</li>
                </ul>
              )}
            </div>
            <input type="text" className="search__input" />
            <button className="search__btn">조회</button>
          </div>
        </div>
      </div>
      <p className="search__results">검색된 데이터: 100건</p>
    </>
  );
};

export default Search;
