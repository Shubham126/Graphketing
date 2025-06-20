import React from "react";

const Department = ({ sidebar, header }) => (
  <div className="app-root">
    {sidebar}
    <main className="main-content">
      {header}
      <div className="content-area" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 300 }}>
        <h2 style={{ color: '#1746a2', fontWeight: 600 }}>Department - Will be updated soon</h2>
      </div>
    </main>
  </div>
);

export default Department; 