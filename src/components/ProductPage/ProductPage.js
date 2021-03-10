import React, { useState, useEffect } from "react";
import axios from "axios";

import AlternativeShop from "../AlternativeShop/AlternativeShop";
import mockup from "./mockup";

import "./styles.css";

const ProductPage = () => {
  const [data, setData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(
        "https://jsonplaceholder.typicode.com/users/7/posts"
      );

      setData(result.data);
    };

    fetchData();
  }, []);

  const getLowestPrice = () =>
    mockup?.alternativeShops.reduce((prev, curr) => {
      return prev.price < curr.price ? prev : curr;
    }).price;

  const getHighestPrice = () =>
    mockup?.alternativeShops.reduce((prev, curr) => {
      return prev.price > curr.price ? prev : curr;
    }).price;

  return (
    <div className="product">
      <div className="product-overview">
        <div className="product-overview__thumbnail">
          <img
            alt=""
            className="product-overview__image"
            src="http://www.rustoleum.com/~/media/DigitalEncyclopedia/Product/RustoleumUSA/CBG/simply-home-interior-wall-paint/interior-wall-paint/332142_Simply_Home_Eggshell_Dark_Taupe_480x480.ashx"
          />
        </div>
        <div className="product-overview__information">
          <h1 className="product-overview__name">Flügger Flutex 2S</h1>
          <p className="product-overview__price-range">
            From {getLowestPrice()} kr. to {getHighestPrice()} kr.
          </p>
        </div>
      </div>
      <div className="product-prices">
        {mockup.alternativeShops.map((product) => (
          <AlternativeShop
            key={product.number}
            logoSrc={product.logoSrc}
            name={product.name}
            price={product.price}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductPage;
