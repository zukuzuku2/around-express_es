const router = require('express').Router();
const fsPromises = require('fs').promises;
const path = require('path');

const USERS_PATH = path.join(__dirname, '../data/users.json');

router.get('/users', (req, res) => {
  fsPromises
    .readFile(USERS_PATH, { encoding: 'utf-8' })
    .then((users) => {
      res.send({ data: JSON.parse(users) });
    })
    .catch(() => res.status(500).send({ message: 'Ocurrió un error' }));
});
router.get('/users/:id', (req, res) => {
  fsPromises
    .readFile(USERS_PATH, { encoding: 'utf-8' })
    .then((users) => {
      const parsedUsers = JSON.parse(users);
      const user = parsedUsers.find((userAlone) => userAlone._id === req.params.id);
      if (!user) {
        res.status(404).send({ message: 'ID de usuario no encontrado' });
        return;
      }
      res.send({ user: user });
    })
    .catch(() => res.status(500).send({ message: 'Ocurrió un error' }));
});

module.exports = router;
