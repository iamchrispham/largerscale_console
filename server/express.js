const express = require('express');
const app = express();
const parser = require('body-parser');
const morgan = require('morgan');
const port = process.env.PORT || 8000;
const cors = require('cors');

app.use(parser.urlencoded({ extended: true }))
app.use(parser.json());
app.use(morgan('dev'));
app.use(cors());

app.get('/api', (req, res) => {
  res.status(200).send('Hi!');
})

app.get('/api/auth', (req, res) => {
  console.log(`Test: ${req.body}`)
  res.status(200).send(``);
})

app.post('/api/auth', (req, res) => {
  var user = {
    data:
    {
      email: req.body.email,
      password: req.body.password
    }
  };
  console.log('User: ', user);
  res.status(201).send(user);
})

app.listen(port, () => console.log('Listening to port 8000'));
