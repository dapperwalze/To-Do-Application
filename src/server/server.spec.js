import { addNewTask, updateTask } from "./server";


(async function myFunc() {
    await addNewTask({
        name: "My task",
        id: "12346"
    });

    await updateTask({
        id:"123456",
        name: "My task-NEWLY UPDATED"
    })
})();
