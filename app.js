const express = require('express');
const morgan = require('morgan');

const app = express();
app.use(morgan('dev'));


app.get('/', (req, res) => {
  res.send('Its break time');
});

app.listen(8000, () => {
  console.log('express is listeing on port 8000!');
});

app.get('/burgers', (req, res) => {
  res.send('We have juicy cheese burgers!');
})

app.get('/pizza/pepperoni', (req, res) => {
  res.send('Your pizza is on the way!');
})

app.get('/pizza/pineapple', (req, res) => {
  res.send('We dont serve that here! get lost!');
})

app.get ('/echo', (req, res) => {
  const responseText = `Here are some details of your request:
    Base URL: ${req.baseUrl}
    Host: ${req.hostname}
    Path: ${req.path}
  `;
  res.send(responseText);
})

app.get('/queryViewer', (req, res) => {
  console.log(req.query);
  res.end(); //do not send any data back to the client
});