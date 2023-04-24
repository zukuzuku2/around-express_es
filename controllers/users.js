const user = require('../models/user');
const User = require('../models/user');

const getUserController = (req, res) => {
  User.find({})
    .orFail()
    .then((users) => res.send({ data: users }))
    .catch(
      (err) => {
      if (err.statusCode === 404) {
        res.status(404).send({ message: err.message });
      } else{
        res.status(500).send({ message: err.message || 'error interno del servidor'});
      }
    }
);
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
    .catch(() => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'ID de usuario no valido' });
        return;
      }else if (err.statusCode === 404) {
        res.status(404).send({ message: err.message });
      } else {
        res.status(500).send({ message: err.message || 'error interno del servidor' });
      }
});
};

const postUserController = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(VALIDATION_ERROR_CODE).send({ message: err.message });
      } else {
        res.status(500).send({ message: err.message || 'error interno del servidor' });
      }
    });
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
  }).catch((err)=>{
    if (err.name === 'ValidationError') {
      res.status(VALIDATION_ERROR_CODE).send({ message: err.message });
    } else {
      res.status(500).send({ message: err.message || 'error interno del servidor' });
    }
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
  }).catch((err)=>{
    if (err.name === 'ValidationError') {
      res.status(VALIDATION_ERROR_CODE).send({ message: err.message });
    } else {
      res.status(500).send({ message: err.message || 'error interno del servidor' });
    }
  });
};

module.exports = {
  getUserController,
  getUserByIdController,
  postUserController,
  updateMeController,
  updateAvatarController,
};
