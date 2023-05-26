import { Router } from "express";
import { todoController } from "../controllers/todo.controller.js";

const router = Router();

router.get("/todos", todoController.getAllTodos);
router.get("/todos/:id", todoController.getTodo);
router.post("/todos", todoController.createTodo);
router.put("/todos/:id", todoController.updateTodo);
router.delete("/todos/:id", todoController.deleteTodo);

export default router;
