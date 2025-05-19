# MabuRahman-Habibullah-p2
 Project Description:  The To-Do List and Calendar Reminder App is a web-based productivity tool that allows users to manage daily tasks efficiently while visually organizing them using a monthly calendar. Users can add tasks with details such as title, date, time, and optional description. The calendar highlights dates with tasks, and users can click on those dates to view task details. Tasks can also be deleted directly from the task list.

Feature List:
1. Add a Task
2. View Task List
3. Delete a Task
4. View Tasks in Calendar

Technical Tasks (Software Requirements):
Add Task : - Create form fields for title, date, time, and description
           - Add event listener to "Add Task" button
           - Validate input fields
           - Create task object and push to task array
           - Save task to localStorage

Render Task List : - Create <li> elements dynamically using document.createElement
                   - Display task info
                   - Append to #task-list container
                   - Add delete button per item with onclick handler

Delete Task : - Add deleteTask(index) function
              - Use splice() to remove task from array
              - Update DOM and localStorage after deletion

Generate Calendar : - Use Date to get current month and days
                    - Create 7-column grid using CSS Grid
                    - Generate blank days and numbered days
                    - Highlight days that have matching task dates

Store/Load from localStorage : - On page load, load tasks from localStorage
                               - On any add/delete, update localStorage with JSON.stringify and JSON.parse

Use of JavaScript Basics : - Use var for all variables
                           - Use functions to organize code
                           - Use arrays, for loops, and conditionals
                           - Use getElementById, createElement, and DOM manipulation