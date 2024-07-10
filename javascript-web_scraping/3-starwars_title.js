#!/usr/bin/node

const request = require('request');


const movieId = process.argv[2];

const url = `https://swapi-api.hbtn.io/api/films/${movieId}`;

request.get(url, (error, response, body) => {
  if (error) {
    console.error('Error:', error);
  } else if (response.statusCode !== 200) {
    console.error(`Failed to retrieve data. Status code: ${response.statusCode}`);
  } else {
    const movie = JSON.parse(body);
    console.log(movie.title);
  }
});
