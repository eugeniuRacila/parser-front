import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import AsyncSelect from "react-select/async";

import data from "./mockup";

const SearchBar = () => {
  let history = useHistory();
  const [searchValue, setSearchValue] = useState();
  const [searchSelection, setSearchSelection] = useState();

  const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: "#F9F9F9",
      border: "none",
      fontFamily: "Poppins",
      height: 72,
      paddingLeft: 24,
      paddingRight: 24,
    }),
    input: (provided) => ({
      ...provided,
      "& input": {
        font: "inherit",
      },
    }),
  };

  const filterColors = (inputValue) => {
    return data.filter((i) =>
      i.label.toLowerCase().includes(inputValue.toLowerCase())
    );
  };

  const promiseOptions = (inputValue) => {
    console.log("fetching options");
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(filterColors(inputValue));
      }, 1000);
    });
  };

  const handleSearchInput = (inputValue, { action }) => {
    if (
      action === "menu-close" ||
      action === "input-blur" ||
      action === "set-value"
    )
      return;

    console.log("inputValue", inputValue);

    setSearchValue(inputValue);
  };

  const handleSearchSelection = (selectedOption) => {
    setSearchValue(selectedOption.label);
    setSearchSelection(selectedOption.label);
    history.push(`/products/${selectedOption.value}`);
    console.log("an item was selected");
  };

  return (
    <AsyncSelect
      cacheOptions
      components={{
        DropdownIndicator: () => null,
        IndicatorSeparator: () => null,
      }}
      defaultOptions
      inputValue={searchValue}
      loadingMessage={() => null}
      loadOptions={promiseOptions}
      noOptionsMessage={(e) => (e.inputValue ? "No products found" : null)}
      onChange={handleSearchSelection}
      onInputChange={handleSearchInput}
      placeholder={<div>Search for a product</div>}
      styles={customStyles}
      value={searchSelection}
    />
  );
};

export default SearchBar;
