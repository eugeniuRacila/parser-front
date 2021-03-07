import React from "react";
import { Link } from "react-router-dom";

import "./styles.css";

const AlternativeShop = ({ logoSrc, name, price, url = "#" }) => {
  return (
    <Link className="alternative-shop" target="_blank" to={url}>
      <div className="alternative-shop__logo">
        <img
          alt={name}
          className="alternative-shop__logo-image"
          src={logoSrc}
        />
      </div>
      <p className="alternative-shop__product-name">{name}</p>
      <p className="alternative-shop__product-price">{price} kr.</p>
    </Link>
  );
};

export default AlternativeShop;
