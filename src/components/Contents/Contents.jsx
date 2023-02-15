import React, { useState } from "react";
import { useSelector } from "react-redux";
import { fetchProducts } from "../../api/api";
import { useQuery } from "react-query";
import dollar from "../../assets/dollar.svg";
import Pagination from "../Pagination/Pagination";
import "./Contents.scss";

const Contents = () => {
  const [page, setPage] = useState(
    parseInt(sessionStorage.getItem("page")) || 1
  );
  const [seletedQty, setSeletedQty] = useState(
    parseInt(sessionStorage.getItem("selectedQty")) || 10
  );

  const product = useSelector((state) => state.product.products);
  const { isLoading, error } = useQuery("products", fetchProducts);
  const pages = Math.floor(product.length / seletedQty) + 1;

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;

  let items = JSON.parse(sessionStorage.getItem("items")) || [];
  let perPage = items.length / parseInt(seletedQty);
  let totalPage = items.length / perPage;
  let resultItems = items.slice(totalPage * (page - 1), totalPage * page);

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

      {resultItems.map((product) => (
        <div className="contents__classification" key={product?.id}>
          <p className="contents__product-number">{product?.id}</p>
          <p className="contents__product-title">{product?.title}</p>
          <p className="contents__product-brand">{product?.brand}</p>
          <h2 className="description">
            {product?.description.length > 40
              ? product?.description.slice(0, 40).trim() + "..."
              : product?.description.trim()}
          </h2>
          <div className="contents__price-box">
            <img src={dollar} alt="dollar" className="dollar__img" />
            <p className="price__text">
              {new Intl.NumberFormat("en-IN", {
                maximumSignificantDigits: 3,
              }).format(product.price)}
            </p>
          </div>
          <p className="contents__product-rating">{product.rating}</p>
          <p className="contents__product-stock">{product.stock}</p>
        </div>
      ))}

      <Pagination
        page={page}
        pages={pages}
        // products={products}
        setPage={setPage}
        seletedQty={parseInt(seletedQty)}
        setSeletedQty={setSeletedQty}
        resultItems={resultItems}
      />
    </div>
  );
};

export default Contents;
