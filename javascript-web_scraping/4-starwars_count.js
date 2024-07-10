#!/usr/bin/env node

const request = require('request');

const apiUrl = process.argv[2];

if (!apiUrl) {
  console.error('Usage: ./4-starwars_count.js <API URL>');
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

  let films;
  try {
    films = JSON.parse(body).results;
  } catch (parseError) {
    console.error('Failed to parse JSON:', parseError);
    return;
  }

  if (!Array.isArray(films)) {
    console.error('Unexpected API response format');
    return;
  }

  const wedgeAntillesUrls = [
    'https://swapi-api.hbtn.io/api/people/18/',
    'http://swapi-api.hbtn.io/api/people/18/',
    'http://localhost:5050/people/18/',
    'https://localhost:5050/people/18/'
  ];

  const count = films.reduce((acc, film) => {
    if (film.characters.some(url => wedgeAntillesUrls.includes(url))) {
      acc += 1;
    }
    return acc;
  }, 0);

  console.log(count);
});
