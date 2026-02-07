import React, { useState, useEffect, useRef } from 'react';
import html2canvas from 'html2canvas';
import './App.css';
import ScheduleGrid from './components/ScheduleGridMultiple';
import ClassForm from './components/ClassFormMultiple';
import Header from './components/Header';

function App() {
  const [classes, setClasses] = useState([]);
  const [editingClass, setEditingClass] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [saveStatus, setSaveStatus] = useState('');
  const [scheduleMode, setScheduleMode] = useState('normal'); // 'normal', 'ramadan', 'evening'
  const scheduleRef = useRef(null);

  // Load classes from localStorage on mount
  useEffect(() => {
    const savedClasses = localStorage.getItem('scheduleClasses');
    if (savedClasses) {
      setClasses(JSON.parse(savedClasses));
      setSaveStatus('Loaded from local storage ✓');
      setTimeout(() => setSaveStatus(''), 2000);
    }
  }, []);

  // Save classes to localStorage whenever they change
  useEffect(() => {
    if (classes.length > 0) {
      localStorage.setItem('scheduleClasses', JSON.stringify(classes));
      setSaveStatus('Saved to local storage ✓');
      setTimeout(() => setSaveStatus(''), 2000);
    }
  }, [classes]);

  const addClass = (newClass) => {
    setClasses([...classes, { ...newClass, id: Date.now() }]);
    setShowForm(false);
  };

  const updateClass = (updatedClass) => {
    setClasses(classes.map(cls => 
      cls.id === updatedClass.id ? updatedClass : cls
    ));
    setEditingClass(null);
    setShowForm(false);
  };

  const deleteClass = (classId) => {
    if (window.confirm('Are you sure you want to delete this class?')) {
      setClasses(classes.filter(cls => cls.id !== classId));
    }
  };

  const handleEdit = (classItem) => {
    setEditingClass(classItem);
    setShowForm(true);
  };

  const handleDownload = () => {
    const dataStr = JSON.stringify(classes, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
    const exportFileDefaultName = `schedule_${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const handleDownloadPNG = async () => {
    if (!scheduleRef.current) return;
    
    try {
      const canvas = await html2canvas(scheduleRef.current, {
        backgroundColor: '#ffffff',
        scale: 2,
        logging: false,
        useCORS: true,
      });
      
      const image = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = `class-schedule_${new Date().toISOString().split('T')[0]}.png`;
      link.href = image;
      link.click();
    } catch (error) {
      console.error('Error generating PNG:', error);
      alert('Error generating PNG. Please try again.');
    }
  };

  const handleImport = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const importedClasses = JSON.parse(e.target.result);
          setClasses(importedClasses);
          alert('Schedule imported successfully!');
        } catch (error) {
          alert('Error importing file. Please make sure it\'s a valid JSON file.');
        }
      };
      reader.readAsText(file);
    }
  };

  const clearSchedule = () => {
    if (window.confirm('Are you sure you want to clear all classes? This cannot be undone.')) {
      setClasses([]);
      localStorage.removeItem('scheduleClasses');
    }
  };

  const toggleScheduleMode = () => {
    const modes = ['normal', 'ramadan'];
    const currentIndex = modes.indexOf(scheduleMode);
    const nextIndex = (currentIndex + 1) % modes.length;
    setScheduleMode(modes[nextIndex]);
  };

  const getModeName = () => {
    switch (scheduleMode) {
      case 'ramadan': return '🌙 Ramadan Schedule';
      default: return '☀️ Normal Schedule';
    }
  };

  return (
    <div className="App">
      <Header 
        onAddClass={() => {
          setEditingClass(null);
          setShowForm(true);
        }}
        onDownload={handleDownload}
        onDownloadPNG={handleDownloadPNG}
        onImport={handleImport}
        onClear={clearSchedule}
        onToggleSchedule={toggleScheduleMode}
        scheduleMode={getModeName()}
      />
      
      {saveStatus && (
        <div className="save-status">
          {saveStatus}
        </div>
      )}
      
      {showForm && (
        <ClassForm
          classData={editingClass}
          onSubmit={editingClass ? updateClass : addClass}
          onDelete={deleteClass}
          onCancel={() => {
            setShowForm(false);
            setEditingClass(null);
          }}
        />
      )}
      
      <div ref={scheduleRef}>
        <ScheduleGrid 
          classes={classes}
          onEdit={handleEdit}
          onDelete={deleteClass}
          scheduleMode={scheduleMode}
        />
      </div>
      
      {classes.length === 0 && (
        <div className="empty-state">
          <h3>📚 No classes yet!</h3>
          <p>Click "Add Class" to start building your schedule.</p>
          <p className="features-note">
            ✨ <strong>Auto-saves to local storage</strong> • Download as PNG • Export/Import JSON
          </p>
        </div>
      )}
    </div>
  );
}

export default App;
