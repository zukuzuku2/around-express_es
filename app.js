const express = require("express");
const { PORT = 3000 } = process.env;
const app = express();

app.get("/", (req, res) => {
  res.status(404).send({
    message: "Recurso solicitado no encontrado",
  });
});
app.get("/users", (req, res) => {
  res.status(200).send(users);
});
app.get("/cards", (req, res) => {
  res.status(200).send(cards);
});
app.get("/users/:id", (req, res) => {
  if (!users[req.params.id]) {
    res.status(404).send({ message: "ID de usuario no encontrado" });
    return;
  }
  res.status(200).send({ userID: users[req.params.id]._id });
});

app.listen(PORT, () => {
  console.log(`Escuchando por el puerto ${PORT}`);
});
