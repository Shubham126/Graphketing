import React, { useState } from "react";
import "../Style/FilterPanel.css";

const departments = ["All", "Finance", "Engineer", "Art"];
const statuses = ["All", "Active", "Inactive", "Blocked", "Suspended"];

const statusColors = {
  Active: "green",
  Inactive: "orange",
  Blocked: "red",
  Suspended: "orange",
};

const FilterPanel = ({ filters, setFilters }) => {
  const [expanded, setExpanded] = useState({ department: false, status: false });

  const toggleExpand = (section) => {
    setExpanded((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const handleSelect = (type, value) => {
    setFilters((prev) => ({ ...prev, [type]: value }));
    setExpanded((prev) => ({ ...prev, [type]: false }));
  };

  const clearFilter = (type) => {
    setFilters((prev) => ({ ...prev, [type]: "All" }));
  };

  return (
    <div className="filter-dropdown active">
      <div className="filter-title">Data Filters</div>

      {/* Department Section */}
      <div className="filter-section">
        <div className="filter-label" onClick={() => toggleExpand("department")}>
          <span style={{ color: filters.department !== "All" ? "#1746a2" : "" }}>
            Department
          </span>
          {filters.department !== "All" && (
            <span className="filter-clear-small" onClick={() => clearFilter("department")}>
              ✕
            </span>
          )}
        </div>
        {expanded.department && (
          <div className="filter-options">
            {departments.map((dep) => (
              <label key={dep} className="filter-checkbox">
                <input
                  type="checkbox"
                  checked={filters.department === dep}
                  onChange={() => handleSelect("department", dep)}
                />
                <span>{dep}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Status Section */}
      <div className="filter-section">
        <div className="filter-label" onClick={() => toggleExpand("status")}>
          <span style={{ color: filters.status !== "All" ? "#1746a2" : "" }}>
            Status
          </span>
          {filters.status !== "All" && (
            <span className="filter-clear-small" onClick={() => clearFilter("status")}>
              ✕
            </span>
          )}
        </div>
        {expanded.status && (
          <div className="filter-options">
            {statuses.map((stat) => (
              <label key={stat} className="filter-checkbox">
                <input
                  type="checkbox"
                  checked={filters.status === stat}
                  onChange={() => handleSelect("status", stat)}
                />
                <span>{stat}</span>
                {stat !== "All" && (
                  <span
                    className="status-dot"
                    style={{ backgroundColor: statusColors[stat] }}
                  />
                )}
              </label>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterPanel;
