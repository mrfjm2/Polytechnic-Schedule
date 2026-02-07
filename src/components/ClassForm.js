import React, { useState, useEffect } from 'react';
import './ClassForm.css';

const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const COLORS = [
  '#c084fc', // light purple (like EL6007)
  '#93c5fd', // light blue (like BU6009)
  '#86efac', // light green (like IT6001)
  '#fbbf24', // amber/yellow
  '#fb923c', // orange
  '#f87171', // light red/coral (like BU6009 Sunday)
  '#38bdf8', // sky blue (like BU6009 Thursday)
  '#a78bfa', // violet
];

function ClassForm({ classData, onSubmit, onCancel, onDelete }) {
  const [formData, setFormData] = useState({
    courseName: '',
    courseCode: '',
    day: 'Sunday',
    startTime: '08:00',
    endTime: '09:00',
    location: '',
    instructor: '',
    color: COLORS[0],
  });

  useEffect(() => {
    if (classData) {
      setFormData(classData);
    }
  }, [classData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate times
    if (formData.startTime >= formData.endTime) {
      alert('End time must be after start time!');
      return;
    }
    
    onSubmit(formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>{classData ? 'Edit Class' : 'Add New Class'}</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label>Course Name *</label>
              <input
                type="text"
                name="courseName"
                value={formData.courseName}
                onChange={handleChange}
                placeholder="e.g., Introduction to Programming"
                required
              />
            </div>
            
            <div className="form-group">
              <label>Course Code</label>
              <input
                type="text"
                name="courseCode"
                value={formData.courseCode}
                onChange={handleChange}
                placeholder="e.g., CS101"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Day *</label>
              <select name="day" value={formData.day} onChange={handleChange} required>
                {DAYS.map(day => (
                  <option key={day} value={day}>{day}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Start Time *</label>
              <input
                type="time"
                name="startTime"
                value={formData.startTime}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>End Time *</label>
              <input
                type="time"
                name="endTime"
                value={formData.endTime}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="e.g., Room 203"
              />
            </div>

            <div className="form-group">
              <label>Instructor</label>
              <input
                type="text"
                name="instructor"
                value={formData.instructor}
                onChange={handleChange}
                placeholder="e.g., Dr. Smith"
              />
            </div>
          </div>

          <div className="form-group">
            <label>Color</label>
            <div className="color-picker">
              {COLORS.map(color => (
                <label key={color} className="color-option">
                  <input
                    type="radio"
                    name="color"
                    value={color}
                    checked={formData.color === color}
                    onChange={handleChange}
                  />
                  <span 
                    className="color-circle" 
                    style={{ backgroundColor: color }}
                  ></span>
                </label>
              ))}
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="btn btn-cancel" onClick={onCancel}>
              Cancel
            </button>
            {classData && (
              <button 
                type="button" 
                className="btn btn-delete" 
                onClick={() => {
                  if (window.confirm('Are you sure you want to delete this class?')) {
                    onDelete(classData.id);
                    onCancel();
                  }
                }}
              >
                🗑️ Delete
              </button>
            )}
            <button type="submit" className="btn btn-submit">
              {classData ? 'Update' : 'Add'} Class
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ClassForm;
