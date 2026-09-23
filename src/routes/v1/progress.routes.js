const express = require('express');
const router = express.Router();

const {
  getProgress,
  getProgressId,
  postProgress,
  putProgress,
  deleteProgress
} = require ('../../controllers/progress.controller')

router.get('/', getProgress)

router.get('/id', getProgressId)

router.post('/', postProgress)

router.put('/id', putProgress)

router.delete('/id', deleteProgress)

module.exports = router;

