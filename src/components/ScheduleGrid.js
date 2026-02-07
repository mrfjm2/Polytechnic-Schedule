import React from 'react';
import './ScheduleGrid.css';

const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const HOURS = Array.from({ length: 12 }, (_, i) => i + 8); // 8 AM to 8 PM

function ScheduleGrid({ classes, onEdit, onDelete }) {
  const getClassesForDayAndHour = (day, hour) => {
    return classes.filter(cls => {
      if (cls.day !== day) return false;
      
      const classStart = parseTime(cls.startTime);
      const classEnd = parseTime(cls.endTime);
      const hourStart = hour;
      const hourEnd = hour + 1;
      
      return classStart < hourEnd && classEnd > hourStart;
    });
  };

  const parseTime = (timeStr) => {
    const [hours, minutes] = timeStr.split(':').map(Number);
    return hours + minutes / 60;
  };

  const calculatePosition = (classItem, hour) => {
    const classStart = parseTime(classItem.startTime);
    const classEnd = parseTime(classItem.endTime);
    const hourStart = hour;
    const hourEnd = hour + 1;
    
    const start = Math.max(classStart, hourStart);
    const end = Math.min(classEnd, hourEnd);
    
    const top = ((start - hourStart) * 100);
    const height = ((end - start) * 100);
    
    return { top: `${top}%`, height: `${height}%` };
  };

  const formatTime = (time) => {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  return (
    <div className="schedule-container">
      {classes.length === 0 && (
        <div className="empty-state">
          <div className="empty-icon">📅</div>
          <h3>No Classes Yet</h3>
          <p>Click the "➕ Add Class" button above to start building your schedule.</p>
          <div className="empty-tips">
            <p><strong>Tips:</strong></p>
            <ul>
              <li>Click on any class to edit it</li>
              <li>Your schedule is automatically saved to local storage</li>
              <li>Download as PNG to share or print your schedule</li>
            </ul>
          </div>
        </div>
      )}
      
      <div className="schedule-grid">
        {/* Time column header */}
        <div className="time-header cell-header">Time</div>
        
        {/* Day headers */}
        {DAYS.map(day => (
          <div key={day} className="day-header cell-header">
            {day}
          </div>
        ))}
        
        {/* Time labels and grid cells */}
        {HOURS.map(hour => (
          <React.Fragment key={hour}>
            <div className="time-label">
              {`${hour % 12 || 12}:00 ${hour >= 12 ? 'PM' : 'AM'}`}
            </div>
            
            {DAYS.map(day => {
              const dayClasses = getClassesForDayAndHour(day, hour);
              
              return (
                <div key={`${day}-${hour}`} className="grid-cell">
                  {dayClasses.map(classItem => {
                    const classStart = parseTime(classItem.startTime);
                    const classEnd = parseTime(classItem.endTime);
                    const isFirstCell = classStart >= hour && classStart < hour + 1;
                    
                    if (!isFirstCell) return null;
                    
                    // Calculate position within the hour
                    const minutesFromHourStart = (classStart - hour) * 60; // Minutes past the hour
                    const durationInMinutes = (classEnd - classStart) * 60;
                    const cellHeight = 60; // Height of one hour cell in pixels
                    
                    const topPosition = (minutesFromHourStart / 60) * cellHeight; // Position from top of cell
                    const blockHeight = (durationInMinutes / 60) * cellHeight; // Height spanning multiple cells
                    
                    return (
                      <div
                        key={classItem.id}
                        className="class-block"
                        style={{
                          backgroundColor: classItem.color,
                          top: `${topPosition}px`,
                          height: `${blockHeight}px`,
                        }}
                        onClick={() => onEdit(classItem)}
                        title="Click to edit"
                      >
                        <div className="class-content">
                          <div className="class-name">
                            {classItem.courseName}
                            {classItem.courseCode && ` (${classItem.courseCode})`}
                          </div>
                          <div className="class-time">
                            {formatTime(classItem.startTime)} - {formatTime(classItem.endTime)}
                          </div>
                          {classItem.location && (
                            <div className="class-location">📍 {classItem.location}</div>
                          )}
                          {classItem.instructor && (
                            <div className="class-instructor">👤 {classItem.instructor}</div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

export default ScheduleGrid;
