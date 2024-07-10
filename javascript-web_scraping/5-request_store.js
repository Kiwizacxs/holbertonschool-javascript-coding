#!/usr/bin/node

const request = require('request');
const apiUrl = process.argv[2];

request(apiUrl, function (error, response, body) {
  if (error) {
    console.error(error);
  }
  const all = JSON.parse(body);
  const result = {};
  all.forEach(function (todo) {
    if (todo.completed) {
      if (result[todo.userId]) {
        result[todo.userId] += 1;
      } else {
        result[todo.userId] = 1;
      }
    }
  });
  console.log(result);
});