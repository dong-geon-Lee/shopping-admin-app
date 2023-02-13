import React, { useState } from "react";
import "./Contents.scss";
import axios from "axios";
import { useQuery } from "react-query";
import dollar from "../../assets/dollar.svg";
import Pagination from "../Pagination/Pagination";

const Contents = () => {
  const [dataInfo, setDataInfo] = useState(null);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        "https://dummyjson.com/products?limit=10"
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const { isLoading, error, data } = useQuery("products", fetchProducts);
  const { products, total, skip, limit } = data || [];
  // console.log(products, total, skip, limit);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;

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

      {data.products.map((product) => (
        <div className="contents__classification" key={product.id}>
          <p className="contents__product-number">{product.id}</p>
          <p className="contents__product-title">{product.title}</p>
          <p className="contents__product-brand">{product.brand}</p>
          <h2 className="description">
            {product.description.length > 40
              ? product.description.slice(0, 40).trim() + "..."
              : product.description.trim()}
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

      <Pagination data={data} />
    </div>
  );
};

export default Contents;
