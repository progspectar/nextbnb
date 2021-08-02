const House = require('../../../models/house');
const Review = require('../../..//models/review.js');

const getAll = async () => {
  try {
    const result = await House.findAndCountAll();
    const houses = result.rows.map((house) => {
      return house.dataValues;
    });
    return await { status: 200, ref: houses };
  } catch (error) {
    return await { status: 400, ref: error };
  }
};

const getById = async (id) => {
  try {
    const house = await House.findByPk(id);

    if (house == undefined) {
      return { status: 404, ref: 'Not found' };
    }

    const reviews = await Review.findAndCountAll({
      where: {
        houseId: house.id,
      },
    });

    house.dataValues.reviews = reviews.rows.map((review) => review.dataValues);
    house.dataValues.reviewsCount = reviews.count;
    return await { status: 200, ref: house.dataValues };
  } catch (error) {
    return await { status: 400, ref: error };
  }
};

module.exports = { getAll, getById };
