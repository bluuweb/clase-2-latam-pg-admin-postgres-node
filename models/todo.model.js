import { pool } from "../database/connection.js";

const findAll = async (limit) => {
  if (limit) {
    const text = "SELECT * FROM todos LIMIT $1";
    const { rows } = await pool.query(text, [limit]);
    return rows;
  }

  const { rows } = await pool.query("SELECT * FROM todos");
  return rows;
};

const findById = async (id) => {
  const text = "SELECT * FROM todos WHERE id = $1";
  const { rows } = await pool.query(text, [id]);
  if (rows.length === 0) {
    throw { code: "404" };
  }
  return rows[0];
};

const create = async ({ title, description }) => {
  if (!title || !description) {
    throw { code: "400" };
  }

  const text =
    "INSERT INTO todos (title, description) values ($1, $2) RETURNING *";
  const { rows } = await pool.query(text, [title, description]);
  return rows[0];
};

const update = async (id, { title, description }) => {
  if (!title || !description) {
    throw { code: "400" };
  }
  const text =
    "UPDATE todos SET title = $1, description = $2 WHERE id = $3 RETURNING *";
  const { rows } = await pool.query(text, [title, description, id]);
  return rows[0];
};

const remove = async (id) => {
  const text = "DELETE FROM todos WHERE id = $1 RETURNING *";
  const { rows } = await pool.query(text, [id]);
  return rows[0];
};

export const todoModel = {
  findById,
  findAll,
  create,
  update,
  remove,
};
