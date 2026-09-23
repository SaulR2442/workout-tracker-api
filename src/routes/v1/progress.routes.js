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

router.get('/', getProgressId)

router.post('/', postProgress)

router.put('/', putProgress)

router.delete('/', deleteProgress)

module.exports = router;

