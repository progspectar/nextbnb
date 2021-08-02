module.exports = {
  boards: {
    getAll: '/api/houses',
    getById: (id) => `/api/houses/${id}`,
  },
  login: '/login',
};
