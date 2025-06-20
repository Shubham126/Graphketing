import React, { useState, useEffect, useCallback } from "react";
import { fetchUsers } from "./api/userApi";
import SearchBar from "./components/SearchBar";
import Pagination from "./components/Pagination";
import UserTable from "./components/UserTable";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import AddTeacher from "./components/AddTeacher";
import Department from "./components/Department";
import Library from "./components/Library";
import { BrowserRouter } from "react-router-dom";

const PAGE_SIZE = 10;

function Sidebar({ isCollapsed, setIsCollapsed, active, onNav }) {
  return (
    <aside className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>
      <div className="sidebar-logo">
        <div className="logo-placeholder" />
        {!isCollapsed && <span className="sidebar-title">QMS</span>}
        <span className="sidebar-menu-icon" onClick={() => setIsCollapsed(!isCollapsed)}>&#9776;</span>
      </div>
      <nav className="sidebar-nav">
        <ul>
          <li className={active === "Teachers" ? "active" : ""} data-tooltip="Teachers" onClick={() => onNav("/")}>
            <span className="sidebar-icon teachers" />
            {!isCollapsed && "Teachers"}
          </li>
          <li className={active === "Department" ? "active" : ""} data-tooltip="Department" onClick={() => onNav("/department")}>
            <span className="sidebar-icon department" />
            {!isCollapsed && "Department"}
          </li>
          <li className={active === "Library" ? "active" : ""} data-tooltip="Library" onClick={() => onNav("/library")}>
            <span className="sidebar-icon library" />
            {!isCollapsed && "Library"}
          </li>
          <li className={active === "Add Teacher" ? "active" : ""} data-tooltip="Add Teacher" onClick={() => onNav("/add-teacher")}>
            <span className="sidebar-icon add-teacher" />
            {!isCollapsed && "Add Teacher"}
          </li>
        </ul>
      </nav>
    </aside>
  );
}

function Header({ setSearch, setShowFilters, filterButtonRef }) {
  const [showLoginDropdown, setShowLoginDropdown] = React.useState(false);
  const loginDropdownRef = React.useRef(null);
  const avatarRef = React.useRef(null);

  React.useEffect(() => {
    function handleClickOutside(event) {
      if (
        showLoginDropdown &&
        loginDropdownRef.current &&
        !loginDropdownRef.current.contains(event.target) &&
        avatarRef.current &&
        !avatarRef.current.contains(event.target)
      ) {
        setShowLoginDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showLoginDropdown]);

  const handleDropdownClick = () => setShowLoginDropdown((v) => !v);
  return (
    <header className="top-header">
      <span className="welcome">Welcome, User!</span>
      <div className="searchbar-container">
        <SearchBar onSearch={setSearch} />
        <button className="header-icon grid-icon" onClick={() => setShowFilters((v) => !v)} ref={filterButtonRef} />
        <span className="header-icon bell-icon" style={{ position: 'relative', marginLeft: 16 }}>
          <span role="img" aria-label="bell" style={{ fontSize: 24 }}>🔔</span>
          <span style={{ position: 'absolute', top: 6, right: 6, width: 12, height: 12, background: 'red', borderRadius: '50%', border: '2px solid #fff' }}></span>
        </span>
        <span className="header-avatar" style={{ position: 'relative', display: 'flex', alignItems: 'center' }} ref={avatarRef}>
          <span role="img" aria-label="avatar" style={{ fontSize: 28 }}>🧑‍🏫</span>
          <span className="header-dropdown" style={{ marginLeft: 0, cursor: 'pointer' }} onClick={handleDropdownClick}>&#9660;</span>
          {showLoginDropdown && (
            <div ref={loginDropdownRef} style={{ position: 'absolute', top: '110%', right: 0, background: '#fff', color: '#1746a2', borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.12)', padding: '10px 24px', zIndex: 100 }}>
              Login/Signup
            </div>
          )}
        </span>
      </div>
    </header>
  );
}

function MainTablePage(props) {
  const [users, setUsers] = useState([]);
  const [filters, setFilters] = useState({ department: "All", status: "All" });
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [expandedFilter, setExpandedFilter] = useState(null);
  const filterDropdownRef = React.useRef(null);
  const filterButtonRef = React.useRef(null);

  React.useEffect(() => {
    function handleClickOutside(event) {
      if (
        props.showFilters &&
        filterDropdownRef.current &&
        !filterDropdownRef.current.contains(event.target) &&
        filterButtonRef.current &&
        !filterButtonRef.current.contains(event.target)
      ) {
        props.setShowFilters(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [props.showFilters, props.setShowFilters]);

  const getUsers = useCallback(async () => {
    setLoading(true);
    const params = {
      page,
      limit: PAGE_SIZE,
      search: props.search,
      department: filters.department !== "All" ? filters.department : undefined,
      status: filters.status !== "All" ? filters.status : undefined,
    };
    const data = await fetchUsers(params);
    setUsers(data.users);
    setTotal(data.total);
    setLoading(false);
  }, [page, filters, props.search]);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  useEffect(() => {
    setPage(1);
  }, [filters, props.search]);

  const handleFilterChange = (key, value) => {
    setFilters((f) => ({ ...f, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({ department: "All", status: "All" });
  };

  return (
    <div className="app-root">
      <Sidebar isCollapsed={props.isCollapsed} setIsCollapsed={props.setIsCollapsed} active={props.active} onNav={props.onNav} />
      <main className="main-content">
        <Header setSearch={props.setSearch} setShowFilters={props.setShowFilters} filterButtonRef={filterButtonRef} />
        {props.showFilters && (
          <div className="filter-dropdown active" ref={filterDropdownRef}>
            <div className="filter-title">Data Filters</div>

            {/* Department Filter */}
            <div className="filter-section">
              <div className="filter-label clickable" onClick={() => setExpandedFilter(expandedFilter === "department" ? null : "department")}>
                <span>Department</span>
                <span className="chevron">{expandedFilter === "department" ? "▲" : "▼"}</span>
              </div>
              {expandedFilter === "department" && (
                <div className="filter-options">
                  {["All", "Finance", "Engineer", "Art"].map(dep => (
                    <label key={dep} className="filter-checkbox">
                      <input
                        type="checkbox"
                        checked={filters.department === dep}
                        onChange={() => handleFilterChange("department", dep)}
                      />
                      <span>{dep}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Status Filter */}
            <div className="filter-section">
              <div className="filter-label clickable" onClick={() => setExpandedFilter(expandedFilter === "status" ? null : "status")}>
                <span>Status</span>
                <span className="chevron">{expandedFilter === "status" ? "▲" : "▼"}</span>
              </div>
              {expandedFilter === "status" && (
                <div className="filter-options">
                  {["All", "Active", "Inactive", "Blocked", "Suspended"].map(stat => (
                    <label key={stat} className="filter-checkbox">
                      <input
                        type="checkbox"
                        checked={filters.status === stat}
                        onChange={() => handleFilterChange("status", stat)}
                      />
                      <span>{stat}</span>
                      {stat !== "All" && <span className={`status-dot ${stat.toLowerCase()}`} />}
                    </label>
                  ))}
                </div>
              )}
            </div>

            <button className="filter-clear" onClick={clearFilters}>Clear</button>
          </div>
        )}

        <div className="content-area">
          <div className="table-section">
            {loading ? <div className="loading">Loading...</div> : <UserTable users={users} />}
            <Pagination
              page={page}
              totalPages={Math.ceil(total / PAGE_SIZE)}
              setPage={setPage}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

function AppRoutes() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [search, setSearch] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const navigate = useNavigate();
  const path = window.location.pathname;
  let active = "Teachers";
  if (path.startsWith("/add-teacher")) active = "Add Teacher";
  else if (path.startsWith("/department")) active = "Department";
  else if (path.startsWith("/library")) active = "Library";

  const sidebar = <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} active={active} onNav={navigate} />;
  const header = <Header setSearch={setSearch} setShowFilters={setShowFilters} />;

  return (
    <Routes>
      <Route path="/" element={
        <MainTablePage
          sidebar={sidebar}
          header={header}
          search={search}
          setSearch={setSearch}
          showFilters={showFilters}
          setShowFilters={setShowFilters}
          onNav={navigate}
          active={active}
          isCollapsed={isCollapsed}
          setIsCollapsed={setIsCollapsed}
        />
      } />
      <Route path="/add-teacher" element={<AddTeacher sidebar={sidebar} header={header} />} />
      <Route path="/department" element={<Department sidebar={sidebar} header={header} />} />
      <Route path="/library" element={<Library sidebar={sidebar} header={header} />} />
    </Routes>
  );
}

export default App;
