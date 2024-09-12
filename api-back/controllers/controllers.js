const todo = require("../models/model");

const getTodos = async (req, res) => {
  try {
    const todos = await todo.find();
    if (todos.length === 0) {
      return res.status(404).json({
        message: "No todos found",
      });
    }
    res.status(200).json({
      message: "Retrieved all todos",
      data: todos,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error retrieving todos",
      error: err.message,
    });
  }
};

const getTodoById = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({
      message: "ID is required",
    });
  }
  try {
    const todoById = await todo.findById(id);
    if (!todoById) {
      return res.status(404).json({
        message: "Todo not found",
      });
    }
    res.status(200).json({
      message: "Retrieved todo by ID",
      data: todoById,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error retrieving todo",
      error: err.message,
    });
  }
};

const createTodo = async (req, res) => {
  const { title, description, status, issues, resolved, comment, progress } = req.body;
  if (!title || !description) {
    return res.status(400).json({
      message: "Title and description are required",
    });
  }
  try {
    const newTodo = await todo.create({
      title,
      description,
      status,
      issues,
      resolved,
      comment,
      progress,
    });
    res.status(201).json({
      message: "Create todo successfully added",
      data: newTodo,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error creating todo",
      error: err.message,
    });
  }
};
const deleteTodo = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({
      message: "ID is required",
    });
  }
  try {
    const deletedTodo = await todo.findByIdAndDelete(id);
    if (!deletedTodo) {
      return res.status(404).json({
        message: "Todo not found",
      });
    }
    res.status(200).json({
      message: "Todo deleted successfully",
      data: deletedTodo,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error deleting todo",
      error: err.message,
    });
  }
};

const updateTodo = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({
      message: "ID is required",
    });
  }
  try {
    const updatedTodo = await todo.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedTodo) {
      return res.status(404).json({
        message: "Todo not found",
      });
    }
    res.status(200).json({
      message: "Todo updated successfully",
      data: updatedTodo,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error updating todo",
      error: err.message,
    });
  }
};

module.exports = {
  getTodos,
  createTodo,
  deleteTodo,
  getTodoById,
  updateTodo,
};