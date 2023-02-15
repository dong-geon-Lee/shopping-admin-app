import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changePage, changeQty } from "../../redux-toolkit/productSlice";
import skipRightArrow from "../../assets/skipRightArrow.svg";
import rightArrow from "../../assets/rightArrow.svg";
import skipLeftArrow from "../../assets/skipLeftArrow.svg";
import leftArrow from "../../assets/leftArrow.svg";
import "./Pagination.scss";

const Pagination = ({ page, setPage, seletedQty, setSeletedQty }) => {
  const state = useSelector((state) => state.product);
  const product = useSelector((state) => state.product.products);
  const dispatch = useDispatch();

  const onChange = (e) => {
    setSeletedQty(e.target.value);
    dispatch(changeQty(parseInt(e.target.value)));
    sessionStorage.setItem("selectedQty", seletedQty);
    sessionStorage.setItem("page", 1);
  };

  const handlePages = (page) => {
    dispatch(changePage(parseInt(page)));
    sessionStorage.setItem("page", page);
  };

  const handleSeletedQty = (seletedQty) => {
    sessionStorage.setItem("selectedQty", seletedQty);
  };

  let pages = Math.ceil(state.products.length / state.selectedQty);
  console.log(pages);

  useEffect(() => {
    handlePages(page);
    handleSeletedQty(seletedQty);
  }, [page, pages, seletedQty]);

  return (
    <div className="pagination__container">
      <div className="pagination__select-box">
        <label>페이지당 행:</label>
        <select
          className="pagination__select"
          value={seletedQty}
          onChange={onChange}
        >
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
        </select>
      </div>

      <div className="pagination__box">
        <button
          onClick={() => {
            setPage(1);
            handlePages(1);
          }}
          disabled={page === 1}
          className={page === 1 ? "pagination__btn disabled" : ""}
        >
          <img src={skipLeftArrow} alt="skipLeftArrow" className="arrow__img" />
        </button>
        <button
          onClick={() => {
            setPage((prevState) => prevState - 1);
            handlePages(page);
          }}
          disabled={page === 1}
          className={page === 1 ? "pagination__btn disabled" : ""}
        >
          <img src={leftArrow} alt="leftArrow" className="arrow__img" />
        </button>
        {product &&
          product?.slice(0, pages)?.map((product, index) => (
            <div key={product.id}>
              <h2
                className={`pagination__index-number ${
                  index + 1 === page
                    ? // index + 1 === parseInt(sessionStorage.getItem("page"))
                      "active"
                    : ""
                }`}
                onClick={() => {
                  setPage(index + 1);
                  handlePages(index + 1);
                }}
              >
                {index + 1}
              </h2>
            </div>
          ))}
        <button
          onClick={() => {
            setPage((prevState) => prevState + 1);
            handlePages(page);
          }}
          disabled={page === pages}
          className={page === pages ? "pagination__btn disabled" : ""}
        >
          <img src={rightArrow} alt="rightArrow" className="arrow__img" />
        </button>
        <button
          onClick={() => {
            setPage(10);
            handlePages(10);
          }}
          disabled={page === pages}
          className={page === pages ? "pagination__btn disabled" : ""}
        >
          <img
            src={skipRightArrow}
            alt="skipRightArrow"
            className="arrow__img"
          />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
