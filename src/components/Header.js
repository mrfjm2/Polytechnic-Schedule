import React, { useRef } from 'react';
import './Header.css';

function Header({ onAddClass, onDownload, onDownloadPNG, onImport, onClear, onToggleSchedule, scheduleMode }) {
  const fileInputRef = useRef(null);

  const handleImportClick = () => {
    fileInputRef.current.click();
  };

  return (
    <header className="header">
      <div className="header-content">
        <h1>📅 Polytechnic Schedule</h1>
        <p className="subtitle">Manage your weekly class schedule</p>
      </div>
      
      <div className="header-actions">
        <button className="btn btn-schedule-mode" onClick={onToggleSchedule}>
          {scheduleMode}
        </button>
        <button className="btn btn-primary" onClick={onAddClass}>
          ➕ Add Class
        </button>
        <button className="btn btn-success" onClick={onDownloadPNG}>
          📸 Download PNG
        </button>
        <button className="btn btn-secondary" onClick={onDownload}>
          💾 Save JSON
        </button>
        <button className="btn btn-secondary" onClick={handleImportClick}>
          📥 Import
        </button>
        <button className="btn btn-danger" onClick={onClear}>
          🗑️ Clear All
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept=".json"
          onChange={onImport}
          style={{ display: 'none' }}
        />
      </div>
    </header>
  );
}

export default Header;
