import Autosuggest from "react-autosuggest";
import Fuse from "fuse.js";
import React, { useState } from "react";

import { mentors } from "../mentors.json";

import "./search-bar.css";

const fields = [
  { name: "Name", key: "name" },
  { name: "Role", key: "role" },
  { name: "Organization", key: "organization" },
  { name: "School", key: "school" },
  { name: "Course of Study", key: "courseOfStudy" },
];

const fuseOptions = {
  threshold: 0.2,
  keys: ["name"],
};
const createFuse = (key) =>
  new Fuse(
    [...new Set(mentors.map((mentor) => mentor[key]))]
      .filter((value) => value.length > 0)
      .map((value) => ({
        name: value,
        query: { field: key, term: value },
      })),
    fuseOptions
  );
const fuses = {
  name: createFuse("name"),
  role: createFuse("role"),
  organization: createFuse("organization"),
  school: createFuse("school"),
  courseOfStudy: createFuse("courseOfStudy"),
};

const getSuggestions = (value) => {
  const processedInput = value.trim();
  const sections = fields
    .map(({ name, key }) => {
      const searchResults = fuses[key].search(processedInput);
      return {
        title: name,
        fields: searchResults.map(({ item }) => item),
      };
    })
    .filter((section) => section.fields.length > 0);
  const maxResults = 10;
  return sections.map(({ title, fields }) => ({
    title,
    fields: fields.slice(0, Math.floor(maxResults / sections.length)),
  }));
};
const getSectionSuggestions = (section) => section.fields;
const getSuggestionValue = (suggestion) => suggestion.name;
const renderSectionTitle = (section) => <strong>{section.title}</strong>;
const renderSuggestion = (suggestion) => <span>{suggestion.name}</span>;

function SearchBar({ onSearchChange, onSearchSelect }) {
  const [value, setValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const onChange = (event, { newValue }) => {
    setValue(newValue);
    onSearchChange(newValue);
  };
  const onSuggestionSelected = (event, { suggestion }) =>
    onSearchSelect(suggestion.query);
  const onSuggestionsClearRequested = () => setSuggestions([]);
  const onSuggestionsFetchRequested = ({ value }) =>
    setSuggestions(getSuggestions(value));

  return (
    <Autosuggest
      multiSection={true}
      getSectionSuggestions={getSectionSuggestions}
      getSuggestionValue={getSuggestionValue}
      onSuggestionSelected={onSuggestionSelected}
      onSuggestionsClearRequest={onSuggestionsClearRequested}
      onSuggestionsFetchRequested={onSuggestionsFetchRequested}
      renderSuggestion={renderSuggestion}
      renderSectionTitle={renderSectionTitle}
      suggestions={suggestions}
      inputProps={{
        onChange,
        placeholder: "Please type here for suggestions...",
        value,
      }}
    />
  );
}

export default SearchBar;
