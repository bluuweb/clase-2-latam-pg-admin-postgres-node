import { handleErrors } from "../database/errors.js";
import { todoModel } from "../models/todo.model.js";

const getAllTodos = async (req, res) => {
  const { limit } = req.query;
  try {
    const result = await todoModel.findAll(limit);
    return res.json({ ok: true, result });
  } catch (error) {
    console.log(error);
    const { status, message } = handleErrors(error.code);
    return res.status(status).json({ ok: false, result: message });
  }
};

const getTodo = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await todoModel.findById(id);
    return res.json({ ok: true, result });
  } catch (error) {
    console.log(error);
    const { status, message } = handleErrors(error.code);
    return res.status(status).json({ ok: false, result: message });
  }
};

const createTodo = async (req, res) => {
  const { title, description } = req.body;
  try {
    const result = await todoModel.create({ title, description });
    return res.status(201).json({ ok: true, result });
  } catch (error) {
    const { status, message } = handleErrors(error.code);
    return res.status(status).json({ ok: false, result: message });
  }
};

const updateTodo = async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;

  try {
    const result = await todoModel.update(id, { title, description });
    return res.status(200).json({ ok: true, result });
  } catch (error) {
    console.log(error);
    const { status, message } = handleErrors(error.code);
    return res.status(status).json({ ok: false, result: message });
  }
};

const deleteTodo = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await todoModel.remove(id);
    return res.status(200).json({ ok: true, result });
  } catch (error) {
    console.log(error);
    const { status, message } = handleErrors(error.code);
    return res.status(status).json({ ok: false, result: message });
  }
};

export const todoController = {
  getAllTodos,
  getTodo,
  createTodo,
  updateTodo,
  deleteTodo,
};
