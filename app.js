const express = require('express');
const path = require('path');
const app = express();

const CONTACTS = [
  {id: 1, name: 'Max', value: '+7-999-888-67-76', marked: false}
];

// GET
app.get('/api/contacts', (req, res) => {
  setTimeout(() => {
    res.status(200).json(CONTACTS);
  }, 2000);
});


app.use(express.static(path.resolve(__dirname, 'client'))); // делаем папку client статической, чтобы html нашел файл frontend.js, подключенный в <script>

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'index.html'));
});

app.listen(3000, () => {
  console.log('Server has been started...');
});
