"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateTask = exports.addNewTask = void 0;

var _express = _interopRequireDefault(require("express"));

var _cors = _interopRequireDefault(require("cors"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _connectDb = require("./connect-db");

require("./initialize-db");

var _authenticate = require("./authenticate");

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let port = process.env.PORT || 7777;
let app = (0, _express.default)();
app.listen(port, console.log("Server listening on port: ", port)); //app.get('/', (req, res)=>{
//  res.send("Hello world!!!");
//})

app.use((0, _cors.default)(), _bodyParser.default.urlencoded({
  extended: true
}), _bodyParser.default.json());
(0, _authenticate.authenticationRoute)(app);

if (process.env.NODE_ENV == `production`) {
  console.log(__dirname);
  console.log(_path.default.resolve(__dirname, 'dist'));
  app.use(_express.default.static(_path.default.resolve(__dirname, '../dist')));
  app.get('/*', (req, res) => {
    res.sendFile(_path.default.resolve(__dirname, `../dist`, 'index.html'));
  });
}

const addNewTask = async task => {
  let db = await (0, _connectDb.connectDB)();
  let collection = db.collection(`tasks`);
  await collection.insertOne(task);
};

exports.addNewTask = addNewTask;

const updateTask = async task => {
  let {
    id,
    group,
    isComplete,
    name
  } = task;
  let db = await (0, _connectDb.connectDB)();
  let collection = db.collection(`tasks`);

  if (group) {
    await collection.updateOne({
      id
    }, {
      $set: {
        group
      }
    });
  }

  if (name) {
    await collection.updateOne({
      id
    }, {
      $set: {
        name
      }
    });
  }

  if (isComplete !== undefined) {
    await collection.updateOne({
      id
    }, {
      $set: {
        isComplete
      }
    });
  }
};

exports.updateTask = updateTask;
app.post('/task/new', async (req, res) => {
  let task = req.body.task;
  await addNewTask(task);
  res.status(200).send();
});
app.post('/task/update', async (req, res) => {
  let task = req.body.task;
  await updateTask(task);
  res.status(200).send();
});