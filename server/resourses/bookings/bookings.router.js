server.post('/api/houses/booked', async (req, res) => {
  const houseId = req.body.houseId;

  const results = await Booking.findAll({
    where: {
      houseId: houseId,
      endDate: {
        [Op.gte]: new Date(),
      },
    },
  });

  let bookedDates = [];

  for (const result of results) {
    const dates = getDatesBetweenDates(
      new Date(result.startDate),
      new Date(result.endDate)
    );

    bookedDates = [...bookedDates, ...dates];
  }

  //remove duplicates
  bookedDates = [...new Set(bookedDates.map((date) => date))];

  res.json({
    status: 'success',
    message: 'ok',
    dates: bookedDates,
  });
});
