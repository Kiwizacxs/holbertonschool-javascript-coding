const express = require('express');
const app = express();
const fs = require('fs');

app.use(express.text());

app.get('/', (req, res) => {
  res.send('Hello Holberton School!');
});

app.get('/students', (req, res) => {
  fs.readFile(process.argv[2], 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error reading file');
    } else {
      const students = data.split('\n').map((line) => line.split(',')).filter((student) => student[0]!== '');
      const csStudents = students.filter((student) => student[1] === 'CS').map((student) => student[0]);
      const sweStudents = students.filter((student) => student[1] === 'SWE').map((student) => student[0]);
      res.send(`This is the list of our students\nNumber of students: ${students.length}\nNumber of students in CS: ${csStudents.length}. List: ${csStudents.join(', ')}\nNumber of students in SWE: ${sweStudents.length}. List: ${sweStudents.join(', ')}`);
    }
  });
});

app.listen(1245, () => {
  console.log('Server listening on port 1245');
});

module.exports = app;