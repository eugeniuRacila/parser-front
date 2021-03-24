import React, { useState } from "react";
import { Collapse } from "react-collapse";

import "./styles.css";

const AlternativeShop = ({
  availableVolumes,
  logoSrc,
  name,
  price,
  products,
  url = "#",
}) => {
  const [isOpened, setIsOpened] = useState(false);

  return (
    <div className="alternative-shop">
      <div className="alternative-shop__header">
        <div className="alternative-shop__logo">
          <img
            src={`/parser-front/images/logos/${logoSrc}`}
            alt=""
            className="alternative-shop__logo-image"
          />
        </div>
        <h2 className="alternative-shop__product-name">{products[0]?.name}</h2>
        <div className="alternative-shop__available-volumes">
          {products?.map(({ size }) => (
            <p className="alternative-shop__volume">{size}</p>
          ))}
        </div>
        {products.length > 0 && (
          <button
            className="alternative-shop__toggle"
            onClick={() => setIsOpened(!isOpened)}
          >
            Toggle
          </button>
        )}
      </div>
      {products.length > 0 && (
        <Collapse isOpened={isOpened}>
          <div className="alternative-shop__body">
            {products?.map(({ name, price, size }) => (
              <div className="alternative-shop__volume-details">
                <h3 className="alternative-shop__product-name">{name}</h3>
                <p className="alternative-shop__volume">{size}</p>
                <p className="alternative-shop__product-price">{price} kr.</p>
              </div>
            ))}
          </div>
        </Collapse>
      )}
    </div>
  );
};

export default AlternativeShop;
