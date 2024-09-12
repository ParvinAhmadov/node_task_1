const express = require("express");
const {
  getTodos,
  createTodo,
  deleteTodo,
  getTodoById,
  updateTodo,
} = require("../controllers/controllers");
const router = express.Router();

router.get("/", getTodos).post("/", createTodo);
router
  .delete("/:id", deleteTodo)
  .get("/:id", getTodoById)
  .put("/:id", updateTodo);

module.exports = router;