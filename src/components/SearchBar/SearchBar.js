import React, { useState } from "react";
import { Link } from "react-router-dom";
import Autosuggest from "react-autosuggest";
import axios from "axios";

import data from "./mockup";

import "./styles.css";

const SearchBar = () => {
  const [cache, setCache] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  const getSuggestionValue = (suggestion) => suggestion.label;

  // Use your imagination to render suggestions.
  const renderSuggestion = (suggestion) => (
    <Link to={`/products/${suggestion.value}`}>{suggestion.label}</Link>
  );

  const fetchSuggestions = (inputValue) => {
    const cacheKey = inputValue.trim().toLowerCase();

    if (cache[cacheKey]) {
      setSuggestions(cacheKey[cacheKey]);
    } else {
      setIsLoading(true);

      axios
        .get(
          `https://localhost:5001/api/suggestions/${inputValue
            .trim()
            .toLowerCase()}`
        )
        .then(({ data }) => {
          setSuggestions(data);
          setCache((prevCache) => ({ ...prevCache, cacheKey: data }));
          setIsLoading(false);
        });
    }
  };

  const onChange = (event, { newValue }) => {
    setSearchValue(newValue);
  };

  const onSuggestionsFetchRequested = ({ value }) => {
    fetchSuggestions(value);
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const inputProps = {
    placeholder: "Type product name",
    value: searchValue,
    onChange,
  };

  return (
    <Autosuggest
      suggestions={suggestions}
      onSuggestionsFetchRequested={onSuggestionsFetchRequested}
      onSuggestionsClearRequested={onSuggestionsClearRequested}
      getSuggestionValue={getSuggestionValue}
      renderSuggestion={renderSuggestion}
      inputProps={inputProps}
    />
  );
};

export default SearchBar;
