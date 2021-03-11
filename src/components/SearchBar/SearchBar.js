import axios from "axios";
import React, { useState } from "react";
import Autosuggest from "react-autosuggest";
import { Link, useHistory } from "react-router-dom";

import { ReactComponent as SearchIcon } from "../../assets/icons/search.svg";
import "./styles.css";

const SearchBar = () => {
  let history = useHistory();
  const [cache, setCache] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  const getSuggestionValue = (suggestion) => suggestion.label;

  // Use your imagination to render suggestions.
  const renderSuggestion = (suggestion) => (
    <Link to={`/products/${suggestion.label}`}>{suggestion.label}</Link>
  );

  const fetchSuggestions = (inputValue) => {
    const cacheKey = inputValue.trim().toLowerCase();

    if (cache[cacheKey]) {
      setSuggestions(cache[cacheKey]);
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
          setCache((prevCache) => ({ ...prevCache, [cacheKey]: data }));
          setIsLoading(false);
        });
    }
  };

  const onChange = (event, { newValue }) => {
    setSearchValue(newValue);
  };

  const onSuggestionSelected = (event, { suggestionValue }) => {
    history.push(`/products/${suggestionValue}`);
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
    <div className="search-bar__container">
      <div className="search-bar__icon">
        <SearchIcon />
      </div>
      <Autosuggest
        inputProps={inputProps}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionSelected={onSuggestionSelected}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        suggestions={suggestions}
      />
    </div>
  );
};

export default SearchBar;
