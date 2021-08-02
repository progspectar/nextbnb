const { request: unauthorizedRequest, routes } = require('../lib');
const debug = require('debug')('rs:test:boards');
const {
  createAuthorizedRequest,
  shouldAuthorizationBeTested,
} = require('../utils');

// const TEST_BOARD_DATA = {
//   title: 'Autotest board',
//   columns: [
//     { title: 'Backlog', order: 1 },
//     { title: 'Sprint', order: 2 },
//   ],
// };
describe('Boards suite', () => {
  let request = unauthorizedRequest;
  let testBoardId;

  // beforeAll(async () => {
  //   if (shouldAuthorizationBeTested) {
  //     request = await createAuthorizedRequest(unauthorizedRequest);
  //   }

  //   await request
  //     .post(routes.boards.create)
  //     .set('Accept', 'application/json')
  //     .send(TEST_BOARD_DATA)
  //     .then(res => (testBoardId = res.body.id));
  // });

  // afterAll(async () => {
  //   await request
  //     .delete(routes.boards.delete(testBoardId))
  //     .then(res => expect(res.status).oneOf([200, 204]));
  // });

  describe('GET', () => {
    it('should get all boards', async () => {
      await request
        .get(routes.boards.getAll)
        .set('Accept', 'application/json')
        .expect(200)
        .expect('Content-Type', /json/)
        .then((res) => {
          //debug(res.body);
          expect(res.body).to.be.an('array');
          jestExpect(res.body).not.toHaveLength(0);
        });
    });
  });

  it('should get a board by id', async () => {
    // Setup
    let expectedBoard;
    testBoardId = 1;

    await request
      .get(routes.boards.getAll)
      .expect(200)
      .then((res) => {
        jestExpect(Array.isArray(res.body)).toBe(true);
        jestExpect(res.body).not.toHaveLength(0);

        const board = res.body.find((e) => e.id === testBoardId);
        // debug(board);
        jestExpect(board).not.toBe(undefined);
        expectedBoard = res.body.find((e) => e.id === testBoardId);
      });

    // Test
    await request
      .get(routes.boards.getById(testBoardId))
      .set('Accept', 'application/json')
      .expect(200)
      .expect('Content-Type', /json/)
      .then((res) => {
        jestExpect(res.body.id).toEqual(expectedBoard.id);
      });
  });
});
