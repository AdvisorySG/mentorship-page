import React, { useState } from "react";

import { withSearch } from "@elastic/react-search-ui";

function ClearFacets({ filters, removeFilter }: any) {
  const handleClearAll = () => {
    for (const filter of filters) {
      removeFilter(filter.field, filter.value);
    }
  };

  const [isHovered, setIsHovered] = useState(false);

  const buttonStyle = {
    backgroundColor: "#fff",
    color: "#333",
    border: "1px solid #ccc",
    borderRadius: "4px",
    padding: "10px 20px",
    fontSize: "14px",
    cursor: "pointer",
    margin: "10px 0",
    transition: "all 0.3s ease",
    outline: "none",
    width: "100%",
    display: "block",
  };

  const buttonHoverStyle = {
    ...buttonStyle,
    backgroundColor: "#f8f8f8",
    borderColor: "#bbb",
  };

  return (
    <button
      style={isHovered ? buttonHoverStyle : buttonStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClearAll}
    >
      Clear All Filters
    </button>
  );
}

export default withSearch(({ filters, removeFilter }) => ({
  filters,
  removeFilter,
}))(ClearFacets);
