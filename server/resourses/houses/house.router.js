const router = require('express').Router();
const houseService = require('./house.service');

router.route('/').get(async (req, res) => {
  const result = await houseService.getAll();
  res.status(200).json(result.ref);
});

router.route('/:id').get(async (req, res) => {
  const { id } = req.params;
  const result = await houseService.getById(id);
  res.status(result.status).json(result.ref);
});

module.exports = router;
