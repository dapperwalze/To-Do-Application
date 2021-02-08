"use strict";

var _server = require("./server");

(async function myFunc() {
  await (0, _server.addNewTask)({
    name: "My task",
    id: "12346"
  });
  await (0, _server.updateTask)({
    id: "123456",
    name: "My task-NEWLY UPDATED"
  });
})();