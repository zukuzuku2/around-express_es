const express = require('express');
const mongoose = require('mongoose');

const { PORT = 3000 } = process.env;
const app = express();
const routerCards = require('./routes/cards');
const routerUsers = require('./routes/users');


app.use(express.json());

mongoose.connect('mongodb://localhost:27017/aroundb');
app.use((req, res, next) => {
  req.user = { _id: '6445fd3da94cf177f57a7da7' };
  next();
});


app.use(routerCards);
app.use(routerUsers);

app.listen(PORT, () => {
  console.log(`Escuchando por el puerto ${PORT}`);
});