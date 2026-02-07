import React from 'react';
import './ScheduleGrid.css';

const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const HOURS = Array.from({ length: 12 }, (_, i) => i + 8); // 8 AM to 8 PM

// Ramadan schedule conversion table
const RAMADAN_SCHEDULE = {
  '08:00': { start: '08:00', oneHour: '08:40', twoHour: '09:25', threeHour: '10:10' },
  '09:00': { start: '08:45', oneHour: '09:25', twoHour: '10:10', threeHour: '10:55' },
  '10:00': { start: '09:30', oneHour: '10:10', twoHour: '10:55', threeHour: '11:40' },
  '11:00': { start: '10:15', oneHour: '10:55', twoHour: '11:40', threeHour: '12:25' },
  '12:00': { start: '11:00', oneHour: '11:40', twoHour: '12:25', threeHour: '13:10' },
  '13:00': { start: '11:45', oneHour: '12:25', twoHour: '13:10', threeHour: '13:55' },
  '14:00': { start: '12:30', oneHour: '13:10', twoHour: '13:55', threeHour: '14:40' },
  '15:00': { start: '13:15', oneHour: '13:55', twoHour: '14:40', threeHour: '15:25' },
  '16:00': { start: '14:00', oneHour: '14:40', twoHour: '15:25', threeHour: '16:10' },
  '17:00': { start: '14:45', oneHour: '15:25', twoHour: '16:10', threeHour: '16:55' },
  '18:00': { start: '15:30', oneHour: '16:10', twoHour: '16:55', threeHour: '17:40' },
  '19:00': { start: '16:15', oneHour: '16:55', twoHour: '17:40', threeHour: '18:25' },
  '20:00': { start: '17:00', oneHour: '17:40', twoHour: '18:25', threeHour: '19:10' }
};

function ScheduleGrid({ classes, onEdit, onDelete, scheduleMode = 'normal' }) {
  
  // Convert time based on schedule mode
  const convertTime = (startTime, endTime) => {
    if (scheduleMode === 'normal') {
      return { startTime, endTime };
    }

    const parseTimeDecimal = (timeStr) => {
      const [hours, minutes] = timeStr.split(':').map(Number);
      return hours + minutes / 60;
    };

    // Calculate duration in minutes
    const startDecimal = parseTimeDecimal(startTime);
    const endDecimal = parseTimeDecimal(endTime);
    const durationMinutes = Math.round((endDecimal - startDecimal) * 60);
    
    const startHour = startTime.substring(0, 5);

    if (scheduleMode === 'ramadan' && RAMADAN_SCHEDULE[startHour]) {
      const schedule = RAMADAN_SCHEDULE[startHour];
      let newEndTime = schedule.oneHour; // default 1 hour (50 minutes)
      
      // Check exact minute durations
      if (durationMinutes >= 170) {
        newEndTime = schedule.threeHour; // 3 hour class
      } else if (durationMinutes >= 110) {
        newEndTime = schedule.twoHour; // 2 hour class
      }
      
      return { 
        startTime: schedule.start, 
        endTime: newEndTime 
      };
    }

    return { startTime, endTime };
  };

  // Flatten classes to create individual blocks for each time slot
  const getAllClassBlocks = () => {
    const blocks = [];
    classes.forEach(classItem => {
      const timeSlots = classItem.timeSlots || [
        {
          day: classItem.day,
          startTime: classItem.startTime,
          endTime: classItem.endTime
        }
      ];
      
      timeSlots.forEach((slot, slotIndex) => {
        // Apply time conversion based on schedule mode
        const { startTime, endTime } = convertTime(slot.startTime, slot.endTime);
        
        blocks.push({
          ...classItem,
          day: slot.day,
          startTime: startTime,
          endTime: endTime,
          originalStartTime: slot.startTime,
          originalEndTime: slot.endTime,
          slotIndex: slotIndex,
          totalSlots: timeSlots.length
        });
      });
    });
    return blocks;
  };

  const getClassesForDayAndHour = (day, hour) => {
    const allBlocks = getAllClassBlocks();
    return allBlocks.filter(block => {
      if (block.day !== day) return false;
      
      const classStart = parseTime(block.startTime);
      const classEnd = parseTime(block.endTime);
      const hourStart = hour;
      const hourEnd = hour + 1;
      
      return classStart < hourEnd && classEnd > hourStart;
    });
  };

  const parseTime = (timeStr) => {
    const [hours, minutes] = timeStr.split(':').map(Number);
    return hours + minutes / 60;
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
              <li>Add multiple time slots for classes that meet on different days</li>
              <li>Your schedule is automatically saved to local storage</li>
              <li>Download as PNG to share or print your schedule</li>
              <li>Toggle between Normal, Ramadan, and Evening schedules</li>
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
                  {dayClasses.map((classBlock, blockIndex) => {
                    const classStart = parseTime(classBlock.startTime);
                    const classEnd = parseTime(classBlock.endTime);
                    const isFirstCell = classStart >= hour && classStart < hour + 1;
                    
                    if (!isFirstCell) return null;
                    
                    // Calculate position within the hour
                    const minutesFromHourStart = (classStart - hour) * 60;
                    const durationInMinutes = (classEnd - classStart) * 60;
                    const cellHeight = 60;
                    
                    const topPosition = (minutesFromHourStart / 60) * cellHeight;
                    const blockHeight = (durationInMinutes / 60) * cellHeight;
                    
                    // Create unique key that includes slotIndex to distinguish multiple slots
                    const blockKey = `${classBlock.id}-${classBlock.day}-${classBlock.startTime}-${blockIndex}`;
                    
                    return (
                      <div
                        key={blockKey}
                        className="class-block"
                        style={{
                          backgroundColor: classBlock.color,
                          top: `${topPosition}px`,
                          height: `${blockHeight}px`,
                        }}
                        onClick={() => onEdit(classBlock)}
                        title="Click to edit"
                      >
                        <div className="class-content">
                          <div className="class-name">
                            {classBlock.courseName}
                            {classBlock.courseCode && ` (${classBlock.courseCode})`}
                            {classBlock.totalSlots > 1 && (
                              <span className="slot-badge">
                                {classBlock.slotIndex + 1}/{classBlock.totalSlots}
                              </span>
                            )}
                          </div>
                          <div className="class-time">
                            {formatTime(classBlock.startTime)} - {formatTime(classBlock.endTime)}
                            {scheduleMode !== 'normal' && (
                              <span className="original-time" title="Original time">
                                <br />
                                <small>({formatTime(classBlock.originalStartTime)} - {formatTime(classBlock.originalEndTime)})</small>
                              </span>
                            )}
                          </div>
                          {classBlock.location && (
                            <div className="class-location">📍 {classBlock.location}</div>
                          )}
                          {classBlock.instructor && (
                            <div className="class-instructor">👤 {classBlock.instructor}</div>
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
