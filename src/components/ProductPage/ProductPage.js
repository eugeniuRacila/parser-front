import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import AlternativeShop from "../AlternativeShop/AlternativeShop";
import mockup from "./mockup";
import data from "./realMockup";

import "./styles.css";

const shopNames = [
  "flugger.dk",
  "flugger-helsingor.dk",
  "www.maling-halvpris.dk",
  "www.flugger-horsens.dk",
];

const ProductPage = ({ token }) => {
  let { name } = useParams();
  const [data, setData] = useState();
  const [imgUrl, setImgUrl] = useState("");
  const [productName, setProductName] = useState("");

  const findAndSetImgUrl = (data) => {
    shopNames.map((shopName) => {
      if (data[shopName].length && data[shopName][0].pathToImage !== "No data")
        setImgUrl(data[shopName][0].pathToImage);
      return;
    });
  };

  const findAndSetProductName = (data) => {
    shopNames.map((shopName) => {
      if (data[shopName].length) {
        setProductName(data[shopName][0].name);
        return;
      }
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}api/products/${name}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("fetched data", result.data);
      setData(result.data);
      findAndSetImgUrl(result.data);
      findAndSetProductName(result.data);
    };

    fetchData();
  }, [name]);

  return (
    <div className="product">
      <div className="product-overview">
        <div className="product-overview__thumbnail">
          <img alt="" className="product-overview__image" src={imgUrl} />
        </div>
        <div className="product-overview__information">
          <h1 className="product-overview__name">{productName}</h1>
        </div>
      </div>
      <div className="product-prices">
        {data && data[shopNames[0]] && (
          <AlternativeShop
            logoSrc={`${shopNames[0]}.png`}
            products={data[shopNames[0]]}
          />
        )}

        {data && data[shopNames[1]] && (
          <AlternativeShop
            logoSrc={`${shopNames[1]}.png`}
            products={data[shopNames[1]]}
          />
        )}

        {data && data[shopNames[2]] && (
          <AlternativeShop
            logoSrc={`${shopNames[2]}.png`}
            products={data[shopNames[2]]}
          />
        )}

        {data && data[shopNames[3]] && (
          <AlternativeShop
            logoSrc={`${shopNames[3]}.png`}
            products={data[shopNames[3]]}
          />
        )}
      </div>
    </div>
  );
};

export default ProductPage;
