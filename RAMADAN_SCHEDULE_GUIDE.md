# Ramadan Schedule Feature Guide

## Overview
The Polytechnic Schedule app now includes a **Ramadan Schedule Mode** that automatically converts class times according to the Ramadan timetable.

## How to Use

1. **Toggle Schedule Mode**: Click the schedule mode button in the header (shows "☀️ Normal Schedule" or "🌙 Ramadan Schedule")
2. **Switch Between Modes**: Each click toggles between Normal and Ramadan schedules
3. **View Original Times**: In Ramadan mode, classes show both the adjusted time and original time in parentheses

## Conversion Rules

### Class Duration Detection
The system detects class duration in minutes:
- **50 minutes** = 1 hour class
- **110 minutes** = 2 hour class
- **170 minutes** = 3 hour class

### Ramadan Time Conversion Table

| Normal Start Time | Ramadan Start | 1 Hour Class Ends | 2 Hour Class Ends | 3 Hour Class Ends |
|------------------|---------------|-------------------|-------------------|-------------------|
| 08:00 AM         | 08:00 AM      | 08:40 AM          | 09:25 AM          | 10:10 AM          |
| 09:00 AM         | 08:45 AM      | 09:25 AM          | 10:10 AM          | 10:55 AM          |
| 10:00 AM         | 09:30 AM      | 10:10 AM          | 10:55 AM          | 11:40 AM          |
| 11:00 AM         | 10:15 AM      | 10:55 AM          | 11:40 AM          | 12:25 PM          |
| 12:00 PM         | 11:00 AM      | 11:40 AM          | 12:25 PM          | 01:10 PM          |
| 01:00 PM         | 11:45 AM      | 12:25 PM          | 01:10 PM          | 01:55 PM          |
| 02:00 PM         | 12:30 PM      | 01:10 PM          | 01:55 PM          | 02:40 PM          |
| 03:00 PM         | 01:15 PM      | 01:55 PM          | 02:40 PM          | 03:25 PM          |
| 04:00 PM         | 02:00 PM      | 02:40 PM          | 03:25 PM          | 04:10 PM          |
| 05:00 PM         | 02:45 PM      | 03:25 PM          | 04:10 PM          | 04:55 PM          |

## Example Usage

### Normal Schedule
- **CS101** - Monday 9:00 AM - 10:50 AM (110 minutes = 2 hour class)

### Ramadan Schedule
- **CS101** - Monday 8:45 AM - 10:10 AM
  - Shows: "8:45 AM - 10:10 AM (9:00 AM - 10:50 AM)"

## Features
- ✅ Automatic time conversion based on class duration
- ✅ Original times displayed in Ramadan mode
- ✅ Works with multiple time slots per class
- ✅ Auto-save preserves original times
- ✅ Export/import maintains schedule integrity
- ✅ PNG download captures current mode

## Notes
- Class times are stored in their original (normal) format
- Conversion only affects display, not storage
- You can switch modes anytime without losing data
- All features (edit, delete, export) work in both modes
