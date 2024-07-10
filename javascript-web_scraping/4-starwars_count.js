#!/usr/bin/node

const request = require('request');

const apiUrl = process.argv[2];

request.get(apiUrl, (error, response, body) => {
  if (error) {
    console.error('Error:', error);
    return;
  }

  if (response.statusCode !== 200) {
    console.error(`Failed to retrieve data. Status code: ${response.statusCode}`);
    return;
  }

  const films = JSON.parse(body).results;
  const wedgeAntillesUrl = 'https://swapi-api.hbtn.io/api/people/18/';

  const count = films.reduce((acc, film) => {
    if (film.characters.includes(wedgeAntillesUrl)) {
      acc += 1;
    }
    return acc;
  }, 0);

  console.log(count);
});
