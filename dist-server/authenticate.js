"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.authenticationRoute = void 0;

var _uuid = require("uuid");

var _md = _interopRequireDefault(require("md5"));

var _connectDb = require("./connect-db");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const authenticationTokens = [];

async function assembleUserState(user) {
  let db = await (0, _connectDb.connectDB)();
  let tasks = await db.collection(`tasks`).find({
    owner: user.id
  }).toArray();
  let groups = await db.collection(`groups`).find({
    owner: user.id
  }).toArray();
  return {
    tasks,
    groups,
    session: {
      authenticated: `AUTHENTICATED`,
      id: user.id
    }
  };
}

const authenticationRoute = app => {
  app.post('/authenticate', async (req, res) => {
    let {
      username,
      password
    } = req.body;
    let db = await (0, _connectDb.connectDB)();
    let collection = db.collection(`users`);
    let user = await collection.findOne({
      name: username
    });

    if (!user) {
      return res.status(500).send("User not found");
    }

    ;
    let hash = (0, _md.default)(password);
    let passwordCorrect = hash === user.passwordHash;

    if (!passwordCorrect) {
      return res.status(500).send("Password Incorrect");
    }

    let token = (0, _uuid.v4)();
    authenticationTokens.push({
      token,
      userID: user.id
    });
    let state = await assembleUserState(user);
    res.send({
      token,
      state
    });
  });
};

exports.authenticationRoute = authenticationRoute;