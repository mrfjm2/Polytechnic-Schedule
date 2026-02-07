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
    timeSlots: [{
      day: 'Sunday',
      startTime: '08:00',
      endTime: '09:00',
    }],
    location: '',
    instructor: '',
    color: COLORS[0],
  });

  useEffect(() => {
    if (classData) {
      // Ensure timeSlots is an array
      const updatedData = {
        ...classData,
        timeSlots: classData.timeSlots || [{
          day: classData.day || 'Sunday',
          startTime: classData.startTime || '08:00',
          endTime: classData.endTime || '09:00',
        }]
      };
      setFormData(updatedData);
    }
  }, [classData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate all time slots
    for (let slot of formData.timeSlots) {
      if (slot.startTime >= slot.endTime) {
        alert('End time must be after start time for all time slots!');
        return;
      }
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

  const handleTimeSlotChange = (index, field, value) => {
    const newTimeSlots = [...formData.timeSlots];
    newTimeSlots[index] = {
      ...newTimeSlots[index],
      [field]: value
    };
    setFormData(prev => ({
      ...prev,
      timeSlots: newTimeSlots
    }));
  };

  const addTimeSlot = () => {
    setFormData(prev => ({
      ...prev,
      timeSlots: [
        ...prev.timeSlots,
        {
          day: 'Sunday',
          startTime: '08:00',
          endTime: '09:00',
        }
      ]
    }));
  };

  const removeTimeSlot = (index) => {
    if (formData.timeSlots.length === 1) {
      alert('You must have at least one time slot!');
      return;
    }
    const newTimeSlots = formData.timeSlots.filter((_, i) => i !== index);
    setFormData(prev => ({
      ...prev,
      timeSlots: newTimeSlots
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

          {/* Time Slots Section */}
          <div className="time-slots-section">
            <div className="time-slots-header">
              <h3>Class Schedule</h3>
              <button 
                type="button" 
                className="btn btn-add-slot"
                onClick={addTimeSlot}
              >
                ➕ Add Another Time
              </button>
            </div>

            {formData.timeSlots.map((slot, index) => (
              <div key={index} className="time-slot-card">
                <div className="time-slot-header">
                  <span className="time-slot-number">Time Slot {index + 1}</span>
                  {formData.timeSlots.length > 1 && (
                    <button
                      type="button"
                      className="btn-remove-slot"
                      onClick={() => removeTimeSlot(index)}
                    >
                      ✕
                    </button>
                  )}
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Day *</label>
                    <select 
                      value={slot.day} 
                      onChange={(e) => handleTimeSlotChange(index, 'day', e.target.value)}
                      required
                    >
                      {DAYS.map(day => (
                        <option key={day} value={day}>{day}</option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Start Time *</label>
                    <input
                      type="time"
                      value={slot.startTime}
                      onChange={(e) => handleTimeSlotChange(index, 'startTime', e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>End Time *</label>
                    <input
                      type="time"
                      value={slot.endTime}
                      onChange={(e) => handleTimeSlotChange(index, 'endTime', e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>
            ))}
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
