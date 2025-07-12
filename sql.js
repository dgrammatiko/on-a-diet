import { readFileSync, writeFileSync } from "node:fs";
import pkg from "node-sql-parser";

const { Parser } = pkg;
const parser = new Parser();
const rawSql = readFileSync("./base.sql", "utf8");

// const sql = "UPDATE a SET id = 1 WHERE name IN (SELECT name FROM b)";
const whiteTableList = ["insert::null::#__extensions"];
const opt = {
  database: "MySQL",
};

const { tableList, columnList, ast } = parser.parse(rawSql, opt);

// opt is optional
// parser.whiteListCheck(rawSql, whiteTableList, opt);

ast.filter((el) => {
  if (el.type === "insert" && el.table.name === "#__extensions") {
    return true;
  }
  return false;
});

const finalAst = [];
for (const el of ast) {
  if (el.type === "insert") {
    if (typeof el.table === "string" && el.table === "#__extensions") {
      finalAst.push(el);
    }
    if (el.table.length) {
      for  (const table of el.table) {
        if (table.table === "#__extensions") {
          finalAst.push(el);
        }
      }
    }
  }
}

const ffff = [];
for (const el of finalAst) {
  ffff.push(el.values.columns);
}

const sql = parser.sqlify(finalAst, opt);

console.log(finalAst);
console.log(ffff);
