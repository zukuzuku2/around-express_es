const User = require('../models/user');

const getUserController = (req, res) => {
  User.find({})
    .orFail()
    .then((users) => res.send({ data: users }))
    .catch((err) => res.status(500).send({ message: err }));
};

const getUserByIdController = (req, res) => {
  User.findById(req.params.id)
    .orFail()
    .then((user) => {
      if (!user) {
        res.status(404).send({ message: 'ID de usuario no encontrado' });
        return;
      }
      res.send({ user: user });
    })
    .catch(() => res.status(500).send({ message: 'Ocurrión un error' }));
};

const postUserController = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(500).send({ message: err }));
};

const updateMeController = (req, res) => {
  const { name, about, avatar } = req.body;
  const { _id } = req.user;
  User.findByIdAndUpdate(_id, { name, about, avatar }).then((user) => {
    if (!user) {
      res.status(404).send({ message: 'ID de usuario no encontrado' });
      return;
    }
    res.send({ user: user });
  });
};

const updateAvatarController = (req, res) => {
  const { avatar } = req.body;
  const { _id } = req.user;
  User.findByIdAndUpdate(_id, { avatar }).then((user) => {
    if (!user) {
      res.status(404).send({ message: 'ID de usuario no encontrado' });
      return;
    }
    res.send({ user: user });
  });
};

module.exports = {
  getUserController,
  getUserByIdController,
  postUserController,
  updateMeController,
  updateAvatarController,
};
