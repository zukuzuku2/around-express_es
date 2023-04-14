const express = require('express');

const { PORT = 3000 } = process.env;
const app = express();
const routerCards = require('./routes/cards');
const routerUsers = require('./routes/users');

app.use(routerCards);
app.use(routerUsers);

app.listen(PORT, () => {
  console.log(`Escuchando por el puerto ${PORT}`);
});
