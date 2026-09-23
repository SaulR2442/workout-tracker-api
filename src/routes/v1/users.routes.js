const express = require('express');
const router = express.Router();

// Importamos todas las variables
const {
  getUsers,
  getUsersId,
  postUsers,
  putUsers,
  deleteUsers
} = require('../../controllers/users.controller');

router.get('/', getUsers);

router.get('/:id', getUsersId);

router.post('/', postUsers);

router.put('/:id', putUsers);

router.delete('/:id', deleteUsers);

module.exports = router;

