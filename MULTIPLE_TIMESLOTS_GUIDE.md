# 🎓 Multiple Time Slots Feature - User Guide

## ✨ **NEW FEATURE: Add Multiple Meeting Times for One Course!**

You can now add **multiple time slots** for a single course. Perfect for classes that meet on different days!

---

## 📚 **How to Use Multiple Time Slots**

### **Example: Course that meets Monday & Wednesday**

Let's say you have **"Database Systems (CS201)"** that meets:
- **Monday** 10:00 AM - 11:50 AM
- **Wednesday** 10:00 AM - 11:50 AM

#### **Steps:**

1. Click **"➕ Add Class"**
2. Enter course details:
   - **Course Name**: Database Systems
   - **Course Code**: CS201
   - **Location**: Room 305
   - **Instructor**: Dr. Johnson
   - **Color**: Choose a color

3. In the **"Class Schedule"** section:
   - **First Time Slot** is already there
     - Day: Monday
     - Start: 10:00 AM
     - End: 11:50 AM
   
4. Click **"➕ Add Another Time"** button

5. **Second Time Slot** appears:
   - Day: Wednesday
   - Start: 10:00 AM
   - End: 11:50 AM

6. Click **"Add Class"**

7. ✨ **Result**: The same course appears on both Monday AND Wednesday with the same color, name, and details!

---

## 🎯 **Visual Indicators**

When a course has multiple time slots, you'll see a **badge** on each class block:

```
Database Systems (CS201)  [1/2]
10:00 AM - 11:50 AM
```

The badge **[1/2]** means:
- This is slot **1** of **2** total slots
- The same course appears elsewhere in your schedule

---

## ✏️ **Editing Multiple Time Slots**

### **To Edit:**
1. Click on **any instance** of the course
2. The form opens showing **all time slots**
3. Edit any details:
   - Add more time slots with **"➕ Add Another Time"**
   - Remove a time slot with the **✕** button
   - Modify days/times for any slot
4. Click **"Update Class"**

### **All instances update together!**
- Course name, code, location, instructor, and color are **shared** across all time slots
- Only day/time can be different per slot

---

## 🗑️ **Deleting**

When you delete a course with multiple time slots:
- **All instances** are removed at once
- Click the **🗑️ Delete** button in the edit form
- Confirm the deletion

---

## 💡 **Common Use Cases**

### **1. Classes Meeting Multiple Days**
```
Course: Programming Fundamentals
- Monday 9:00 AM - 10:50 AM
- Wednesday 9:00 AM - 10:50 AM
- Friday 9:00 AM - 10:50 AM
```

### **2. Lab & Lecture**
```
Course: Chemistry 101
- Tuesday 10:00 AM - 11:50 AM (Lecture)
- Thursday 2:00 PM - 5:00 PM (Lab)
```

### **3. Discussion Sections**
```
Course: Mathematics
- Monday 8:00 AM - 9:00 AM (Lecture)
- Wednesday 3:00 PM - 4:00 PM (Discussion)
```

---

## 🎨 **Features**

✅ **Unlimited time slots** per course  
✅ **Same color** for all slots of a course  
✅ **Visual badges** showing slot numbers  
✅ **Easy to add/remove** time slots  
✅ **Edit once, updates everywhere**  
✅ **Auto-save** to local storage  

---

## 📝 **Tips**

1. **Add all time slots at once** when creating a new class
2. **Use the same course code** to easily identify related slots
3. **Different days/times** but same course info (name, instructor, location)
4. **Click any instance** to edit all time slots together
5. **Badge shows [1/2], [2/2]** to help you track multiple meetings

---

## 🔄 **Data Structure**

Each class now has a `timeSlots` array:

```json
{
  "id": 1707334800000,
  "courseName": "Database Systems",
  "courseCode": "CS201",
  "timeSlots": [
    {
      "day": "Monday",
      "startTime": "10:00",
      "endTime": "11:50"
    },
    {
      "day": "Wednesday",
      "startTime": "10:00",
      "endTime": "11:50"
    }
  ],
  "location": "Room 305",
  "instructor": "Dr. Johnson",
  "color": "#93c5fd"
}
```

---

## 🚀 **Backward Compatibility**

Old schedules (single time slot) are automatically converted:
- Old format: `day`, `startTime`, `endTime` properties
- Converted to: `timeSlots` array with one item
- No data loss!

---

## 🎉 **Start Using It!**

1. Open: **http://localhost:5173**
2. Click **"➕ Add Class"**
3. Look for the **"Class Schedule"** section
4. Click **"➕ Add Another Time"** to add multiple slots
5. Fill in your course details
6. Save and see it appear on all selected days!

---

**Perfect for:**
- 📚 University/College schedules with MWF or TR patterns
- 🏫 High school classes with rotating schedules
- 📖 Courses with separate lecture and lab times
- 🎓 Classes with multiple weekly meetings

Enjoy your enhanced schedule planner! 🎊
