import React from "react";

const SearchBar = ({ onSearch }) => {
  const [value, setValue] = React.useState("");

  const handleInputChange = (e) => setValue(e.target.value);
  const handleSearch = () => onSearch(value);
  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <div className="searchbar-pill">
      <span className="searchbar-icon">
        {/* Search SVG */}
        <svg width="18" height="18" fill="none" stroke="#223" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><line x1="16.5" y1="16.5" x2="21" y2="21"/></svg>
      </span>
      <input
        type="text"
        placeholder="Search by Name, Teacher Id, Department, Record Id, Status..."
        value={value}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        className="searchbar-input"
      />
      <button className="searchbar-arrow" onClick={handleSearch}>
        {/* Arrow SVG */}
        <svg width="22" height="22" fill="none" stroke="#223" strokeWidth="2" viewBox="0 0 24 24"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
      </button>
    </div>
  );
};

export default SearchBar; 