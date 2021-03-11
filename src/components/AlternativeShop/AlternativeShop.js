import React, { useState } from "react";
import { Collapse } from "react-collapse";

import "./styles.css";

const AlternativeShop = ({
  availableVolumes,
  logoSrc,
  name,
  price,
  url = "#",
}) => {
  const [isOpened, setIsOpened] = useState(false);

  return (
    <div className="alternative-shop">
      <div className="alternative-shop__header">
        <div className="alternative-shop__logo">
          <img src={logoSrc} alt="" className="alternative-shop__logo-image" />
        </div>
        <h2 className="alternative-shop__product-name">{name}</h2>
        <div className="alternative-shop__available-volumes">
          {availableVolumes.map(({ volume }) => (
            <p className="alternative-shop__volume">{volume}</p>
          ))}
        </div>
        <button
          className="alternative-shop__toggle"
          onClick={() => setIsOpened(!isOpened)}
        >
          Toggle
        </button>
      </div>
      <Collapse isOpened={isOpened}>
        <div className="alternative-shop__body">
          {availableVolumes.map(({ price, volume }) => (
            <div className="alternative-shop__volume-details">
              <h3 className="alternative-shop__product-name">{name}</h3>
              <p className="alternative-shop__volume">{volume}</p>
              <p className="alternative-shop__product-price">{price} kr.</p>
            </div>
          ))}
        </div>
      </Collapse>
    </div>
  );
};

export default AlternativeShop;
