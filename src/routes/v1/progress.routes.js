const express = require('express');
const router = express.Router();

const {
  getProgress,
  getProgressId,
  postProgress,
  putProgress,
  patchProgress,
  deleteProgress
} = require ('../../controllers/progress.controller')

router.get('/', getProgress)

router.get('/id', getProgressId)

router.post('/', postProgress)

router.put('/id', putProgress)

router.patch('/id', patchProgress)

router.delete('/id', deleteProgress)

module.exports = router;

