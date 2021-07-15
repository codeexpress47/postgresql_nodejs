const rter = require("express").Router();
const { db_pgnodejs, limit_offset } = require("../connpg.js");




module.exports = { rter, db_pgnodejs };