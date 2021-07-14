const e = require("express");
const { Pool } = require("pg");

const db_pgnodejs = new Pool({
  host: "localhost",
  database: "pgnodejs",
  user: "postgres",
  password: "pass123",
  port: 5432,
});

async function limit_offset(_body) {
  let { limit, offset } = _body;

  if (limit == undefined) {
    limit = 10;
  } else if (limit > 100) {
    limit = 100;
  }

  if (offset == undefined) {
    offset = 0;
  } else {
    offset -= 1;
    if (offset < 0) {
      offset = 0;
    }
  }

  console.log(limit, offset);
  return { limit, offset };
}

module.exports = { db_pgnodejs, limit_offset };
