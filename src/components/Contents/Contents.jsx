import React, { useState } from "react";
import { useSelector } from "react-redux";
import { fetchProducts } from "../../api/api";
import { useQuery } from "react-query";
import {
  calcCurrentProduct,
  formattedDescription,
  formattedPrice,
} from "../../helpers/helpers";
import dollar from "../../assets/dollar.svg";
import Pagination from "../Pagination/Pagination";
import "./Contents.scss";

const Contents = () => {
  const pageStorage = parseInt(sessionStorage.getItem("page"));
  const selectStorage = parseInt(sessionStorage.getItem("selectedQty"));

  const [page, setPage] = useState(pageStorage || 1);
  const [seletedQty, setSeletedQty] = useState(selectStorage || 10);
  const { isLoading, error } = useQuery("products", fetchProducts);

  const product = useSelector((state) => state.product.products);
  const pages = Math.floor(product.length / seletedQty) + 1;

  if (isLoading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error</div>;

  return (
    <div className="contents__container">
      <div className="contents__classification">
        <h1>상품번호</h1>
        <h1>상품명</h1>
        <h1>브랜드</h1>
        <h1>상품내용</h1>
        <h1>가격</h1>
        <h1>평점</h1>
        <h1>재고</h1>
      </div>

      {calcCurrentProduct(page, seletedQty).map((product) => (
        <div className="contents__classification" key={product?.id}>
          <p className="contents__product-number">{product?.id}</p>
          <p className="contents__product-title">{product?.title}</p>
          <p className="contents__product-brand">{product?.brand}</p>
          <h2 className="description">{formattedDescription(product)}</h2>
          <div className="contents__price-box">
            <img src={dollar} alt="dollar" className="dollar__img" />
            <p className="price__text">{formattedPrice(product)}</p>
          </div>
          <p className="contents__product-rating">{product.rating}</p>
          <p className="contents__product-stock">{product.stock}</p>
        </div>
      ))}

      <Pagination
        page={page}
        pages={pages}
        setPage={setPage}
        seletedQty={parseInt(seletedQty)}
        setSeletedQty={setSeletedQty}
      />
    </div>
  );
};

export default Contents;
