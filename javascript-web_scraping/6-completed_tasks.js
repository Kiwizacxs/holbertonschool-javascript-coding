#!/usr/bin/env node

const request = require('request');

const apiUrl = process.argv[2];

if (!apiUrl) {
  console.error('Usage: ./6-completed_tasks.js <API URL>');
  process.exit(1);
}

request.get(apiUrl, (error, response, body) => {
  if (error) {
    console.error('Error:', error);
    return;
  }

  if (response.statusCode !== 200) {
    console.error(`Failed to retrieve data. Status code: ${response.statusCode}`);
    return;
  }

  try {
    const todos = JSON.parse(body);

    const completedTasks = {};

    for (let i = 0; i < todos.length; i++) {
      const todo = todos[i];
      if (todo.completed) {
        if (completedTasks[todo.userId]) {
          completedTasks[todo.userId]++;
        } else {
          completedTasks[todo.userId] = 1;
        }
      }
    }

    console.log(completedTasks);
  } catch (parseError) {
    console.error('Failed to parse JSON:', parseError);
  }
});
