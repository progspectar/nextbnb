const router = require('express').Router();
const House = require('../../../models/house');

const getAll = async () => {
  try {
    const result = await House.findAndCountAll();
    const houses = result.rows.map((house) => {
      return house.dataValues;
    });
    return { status: 200, ref: houses };
  } catch (error) {
    return { status: 400, ref: error };
  }
};

router.route('/').get(async (req, res) => {
  const data = await getAll();
  console.log('data', data);
  res.status(200).json(data.ref);
});

module.exports = router;
