import React, { useState, useEffect } from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { IplacesAutoCompleteOwnProps } from './IPlacesAutoCompleteOwnProps';

export const PlacesSearchInput: React.FC<IplacesAutoCompleteOwnProps> = ({
  updatePlaceSelection,
  isDisabled
}) => {
  const [place, setPlace] = useState(null);
  const API_KEY = 'AIzaSyCUXECOILSMtKBAezt2pmQJ_DiTEZB96dE';

  useEffect(() => {
    updatePlaceSelection(place);
  }, [place]);

  return (
    <GooglePlacesAutocomplete
      apiKey={API_KEY}
      autocompletionRequest={{
        componentRestrictions: {
          country: ['in']
        },
        types: ['geocode']
      }}
      minLengthAutocomplete={3}
      selectProps={{
        place,
        onChange: setPlace,
        placeholder: 'City or Town',
        isDisabled: isDisabled
      }}
    />
  );
};
