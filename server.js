const express = require('express');
const hbs = require('hbs');
const fs= require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use( (req, res, next) => {
  let now = new Date().toString();
  let log = `${now}: ${req.method} ${req.url}`;
  fs.appendFile('server.log', log+'\n', (err) => {
    if (err) console.log(err);
  });
  console.log(log);
  next();
});

// app.use( (req, res, next) => {
//   res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => { return new Date().getFullYear() });

hbs.registerHelper('screamIt', (text) => {
  return text.toLowerCase();
});


app.get('/', (req, res) => {
  // res.send('<h1>Hello Express!!</h1>');
  // res.send({
  //   name: 'Tom',
  //   likes: ['biking', 'Cities'],
  // })
  res.render('home.hbs', {
    pageTitle: 'Welcome to Home Page',
    welcomeMsg: 'Welcome to this awesome website!!!',
    // currYear: new Date().getFullYear(),
  });
});

app.get('/about', (req, res) => {
  // res.send('About Page');
  res.render('about.hbs', {
    pageTitle: 'This is About Page',
    // currYear: new Date().getFullYear(),
  });
});


app.get('/bad', (req, res) => {
  res.send({
    // statusCode: 404,
    errorMessage: 'Bad Request',
  });
});

// app.listen(3000);
app.listen(3000, () => {
  console.log('Server is up on port 3000.');
});
