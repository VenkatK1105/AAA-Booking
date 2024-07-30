/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
/* eslint-disable no-unused-vars */
import React, { forwardRef, useState, useCallback, useEffect } from "react";
import { useJsApiLoader } from "@react-google-maps/api";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { InputText } from "primereact/inputtext";

const libraries = ["places"];

const SearchAutoComplete = forwardRef(
  ({ googleApiKey, onPlaceSelected, addressInput }, ref) => {
    const inputRef = ref;
    const [inputValue, setInputValue] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const { isLoaded, loadError } = useJsApiLoader({
      googleMapsApiKey: googleApiKey,
      libraries,
    });

    const debounce = (func, wait) => {
      let timeout;
      return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
      };
    };

    const fetchSuggestions = useCallback(
      debounce((input) => {
        if (!input) {
          setSuggestions([]);
          return;
        }

        const autocompleteService =
          new window.google.maps.places.AutocompleteService();

        autocompleteService.getPlacePredictions(
          {
            input,
            types: ["address"],
            componentRestrictions: { country: "au" },
          },
          (results, status) => {
            if (status === window.google.maps.places.PlacesServiceStatus.OK) {
              setSuggestions(results);
            }
          }
        );
      }, 500),
      []
    );

    useEffect(() => {
      if (addressInput) {
        setInputValue(addressInput);
      }
    }, []);

    const handleInputChange = (e) => {
      const value = e.target.value;
      setInputValue(value);
      if (isLoaded) {
        fetchSuggestions(value);
      }
    };

    if (loadError) {
      return <div>Error loading Google Maps</div>;
    }

    if (!isLoaded) {
      return <div>Loading...</div>;
    }

    const handleSelectSuggestion = (place) => {
      setInputValue(place.description);
      setSuggestions([]);
      onPlaceSelected(place);
    };

    return (
      <div className="custom-autocomplete relative">
        <IconField iconPosition="left" className="w-full md:w-14rem">
          <InputIcon className="leading-10 ml-2 mt-[-14px]">
            <svg
              width="30"
              height="30"
              viewBox="0 0 45 45"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="leading-9"
            >
              <path
                d="M39.375 39.375L31.2187 31.2187M20.625 15V26.25M15 20.625H26.25M35.625 20.625C35.625 28.9093 28.9093 35.625 20.625 35.625C12.3407 35.625 5.625 28.9093 5.625 20.625C5.625 12.3407 12.3407 5.625 20.625 5.625C28.9093 5.625 35.625 12.3407 35.625 20.625Z"
                stroke="#A2B9CF"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </InputIcon>
          <InputText
            ref={inputRef}
            placeholder="Search"
            value={inputValue}
            onChange={handleInputChange}
            className="w-full flex gap-4 text-[16px] font-['Open_Sans'] leading-6 text-[#000] placeholder:text-[#000] py-4 px-14 rounded-lg bg-white border-[1px] border-[#A2B9CF]"
          />
        </IconField>
        {suggestions.length > 0 && (
          <ul className="suggestions-list absolute w-full flex-col gap-1 sm:gap-2 mt-1 sm:mt-3 bg-white z-40 shadow-lg p-3 overflow-hidden flex">
            {suggestions.map((suggestion) => (
              <li
                key={suggestion.place_id}
                onClick={() => handleSelectSuggestion(suggestion)}
                className="w-full bg-white p-3 sm:px-4 hover:font-bold hover:text-[#FFF] hover:bg-[#73bad6] hover:cursor-pointer truncate text-[15px]"
              >
                {suggestion.description}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
);

SearchAutoComplete.displayName = "SearchAutoComplete";

export default SearchAutoComplete;
