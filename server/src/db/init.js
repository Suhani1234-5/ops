import fs from "fs";
import pool from "../config/db.js";

const schema = fs.readFileSync("src/db/schema.sql").toString();

await pool.query(schema);
console.log(" Database initialized");
process.exit(0);
