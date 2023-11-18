import { Router } from "express";
import { addTodo, deleteTodo, getAllTodos, getTodosByUser, updateTodo } from "../controllers/todos.controller.js";

const router = Router();


router.route("/").get(getAllTodos);

router.route("/todosByUser/:id").get(getTodosByUser);

router.route("/addToDo").post(addTodo);

router.route("/updateTodo/:id").put(updateTodo);

router.route("/deleteTodo/:id").delete(deleteTodo);



export default router;