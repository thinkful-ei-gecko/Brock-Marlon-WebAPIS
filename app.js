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

function shiftCipher(text, shift) {
  let cipherArr;
  text.forEach(char => {
    cipherArr.push(char.charCodeAt(0)+shift);
  });
}

app.get('/cipher', (req, res) => {

  const {text, shift} = req.query;
  let intShift = parseInt(shift);

  if(!text) {
    res
      .status(400)
      .send('Text is a required input');
  }

  if(!shift || isNaN(intShift) || intShift > 26) {
    res
      .status(400)
      .send('Shift is required to generate the code');
  }

  const shiftCipher = (text, shift) => {
    let cipherArr = text.toUpperCase().split('');
    let charCodes = [];
    cipherArr.forEach(char => {
      if(char.charCodeAt(0) + shift > 90){
        let charOver = char.charCodeAt(0) + shift - 90 + 64;
        charCodes.push(charOver);
      }
      else{
        charCodes.push(char.charCodeAt(0)+shift);
      }
    });
  
    return charCodes.map(charCode => String.fromCharCode(charCode)).join('').toUpperCase();
  };
 
  res.json(shiftCipher(text, intShift));
  


});


app.get('/lotto', (req, res) => {
  const {numbers} = req.query;
  let winningNums = [];
  let lottoFeedback = '';

  if(!numbers || !Array.isArray(numbers)){
    res
      .status(400)
      .send('Please enter an array of numbers');
  }

  for (let i = 0; i < 6; i++){
    winningNums.push(Math.floor(Math.random() * 20 + 1));
  }

  let inputNums = numbers.map(num => parseInt(num));
  let matchingNums = winningNums.filter(num => inputNums.includes(num));

  if(matchingNums.length < 4){
    lottoFeedback = ' Sorry you lose';
  }
  else if(matchingNums.length === 4){
    lottoFeedback = 'Congratulations, you win a free ticket!';
  }
  else if(matchingNums.length === 5){
    lottoFeedback = 'Congratulations, you win a free ticket!';
  }
  else if(matchingNums.length === 6){
    lottoFeedback = 'Wow! Unbelievable! You could have won the mega millions!';
  }
  
  res.json(lottoFeedback);

});