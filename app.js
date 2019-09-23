/* eslint-disable strict */
const express = require('express');
const morgan = require('morgan');

const app = express();
app.use(morgan('dev'));


app.get('/', (req, res) => {
  res.send('Home Page');
});

app.listen(8000, () => {
  console.log('express is listening on port 8000!');
});

app.get('/burgers', (req, res) => {
  res.send('We have juicy cheese burgers!');
});

app.get('/pizza/pepperoni', (req, res) => {
  res.send('Your pizza is on the way!');
});

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

app.get('/sum', (req, res) => {
  const a = req.query.a;
  const b = req.query.b;
  
  const numA = parseFloat(a);
  const numB = parseFloat(b);
  const numC = numA + numB;

  res.send(`The sum of ${numA} and ${numB} is ${numC}`);

});


app.get('/cipher', (req, res) => {

  const text = req.query.text;
  const shift = req.query.shift;
  
  const cipher = text.split('').map(char => {
    

  });


});