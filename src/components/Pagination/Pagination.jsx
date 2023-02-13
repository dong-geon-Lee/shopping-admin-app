import React from "react";
import "./Pagination.scss";
import skipRightArrow from "../../assets/skipRightArrow.svg";
import rightArrow from "../../assets/rightArrow.svg";
import skipLeftArrow from "../../assets/skipLeftArrow.svg";
import leftArrow from "../../assets/leftArrow.svg";

const Pagination = ({ data }) => {
  const { products, total, skip, limit } = data || [];
  console.log(products, total, skip, limit);

  const pages = total / limit;
  console.log(pages);
  console.log(products);

  // pages 1 ~ 4이하 - 1 5 ... 10
  // pages 5이상 - 1... 4 5 6 ...10

  return (
    <div className="pagination__container">
      <div className="pagination__select-box">
        <label>페이지당 행:</label>
        <select className="pagination__select">
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
        </select>
      </div>

      <div className="pagination__box">
        <img src={skipLeftArrow} alt="skipLeftArrow" className="arrow__img" />
        <img src={leftArrow} alt="leftArrow" className="arrow__img" />
        {products.map((product) => (
          <div key={product.id}>
            <h2 className="pagination__index-number">{product.id}</h2>
          </div>
        ))}
        <img src={rightArrow} alt="rightArrow" className="arrow__img" />
        <img src={skipRightArrow} alt="skipRightArrow" className="arrow__img" />
      </div>
    </div>
  );
};

export default Pagination;
