const express = require('express');
const app = express();
const fs = require('fs');
const csv = require('csv-parser');
const results = [];

app.use(express.text());

app.get('/', (req, res) => {
  res.send('Hello Holberton School!');
});

app.get('/students', (req, res) => {
  fs.createReadStream(process.argv[2])
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', () => {
      const students = results.filter((student) => student.Field !== '');
      const csStudents = students.filter((student) => student.Field === 'CS').map((student) => student.First);
      const sweStudents = students.filter((student) => student.Field === 'SWE').map((student) => student.First);
      res.send(`This is the list of our students\nNumber of students: ${students.length}\nNumber of students in CS: ${csStudents.length}. List: ${csStudents.join(', ')}\nNumber of students in SWE: ${sweStudents.length}. List: ${sweStudents.join(', ')}`);
    });
});

app.listen(1245, () => {
  console.log('Server listening on port 1245');
});

module.exports = app;