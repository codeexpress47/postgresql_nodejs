const rter = require("express").Router();
const { db_pgnodejs, limit_offset } = require("../connpg.js");

rter.get("/get_all", (req, res) => {
  (async () => {
    let { limit, offset } = await limit_offset(req.body);
    const conn = await db_pgnodejs.connect();
    try {
      const row = await conn.query(
        `SELECT * FROM master.user_login ORDER BY user_login_id DESC LIMIT $1 OFFSET $2;`,
        [limit, offset]
      );
      res.send({ user_login: row.rows });
    } finally {
      conn.release();
    }
  })().catch((err) => {
    res.send(err.message);
  });
});

rter.post("/add", (req, res) => {
  const { user_name, user_pass, fullname } = req.body;
  (async () => {
    const conn = await db_pgnodejs.connect();
    try {
      const row = await conn.query(
        `INSERT INTO master.user_login(user_name, user_pass, fullname) VALUES ($1,$2,$3) 
         RETURNING *;`,
        [user_name, user_pass, fullname]
      );
      res.send(row.rows);
    } finally {
      conn.release();
    }
  })().catch((err) => {
    res.send(err.message);
  });
});

module.exports = rter;
