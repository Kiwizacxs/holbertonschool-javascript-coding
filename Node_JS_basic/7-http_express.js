const express = require('express');
const fs = require('fs').promises;

const app = express();
const PORT = 1245;

app.get('/', (req, res) => {
  res.type('text').send('Hello Holberton School!\n');
});
app.get('/students', async (req, res) => {
  try {
    const data = await fs.readFile(process.argv[2], 'utf8');
    const lines = data.split('\n').filter(line => line.trim() !== '');
    const counters = {};

    lines.slice(1).forEach(line => {
      const [, firstName, , field] = line.split(',');
      if (field) {
        counters[field] = counters[field] || { count: 0, names: [] };
        counters[field].count++;
        counters[field].names.push(firstName.trim());
      }
    });
    let response = 'This is the list of our students\n';
    response += `Number of students: ${lines.length - 1}\n`;

    for (const field in counters) {
      response += `Number of students in ${field}: ${counters[field].count}. List: ${counters[field].names.join(', ')}\n`;
    }
    res.type('text').send(response);
  } catch (error) {
    res.status(500).send('Cannot load the database');
  }
});
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

module.exports = app;
