import { Router } from "express";
import mysqlDb from "../mysqldb";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { categoryWithoutId } from "../type";

const categoriesRouter = Router();

categoriesRouter.get("/", async (req, res) => {
  const [results] = await mysqlDb
    .getConnection()
    .query("SELECT id, name from categories");
  res.send(results);
});

categoriesRouter.get("/:id", async (req, res) => {
  const [results] = (await mysqlDb
    .getConnection()
    .query("SELECT * FROM places " + "WHERE id = ?", [
    req.params.id,
    ])) as RowDataPacket[];


  const category = results[0];

  if (!category) {
    return res.status(404).send({ error: "Not found!" });
  }

  res.send(category);
});


categoriesRouter.post("/", async (req, res) => {
  const category: categoryWithoutId = {
    name: req.body.name,
    description: req.body.description,
  };

  const [result] = (await mysqlDb
    .getConnection()
    .query("INSERT INTO categories (name, description)" + "VALUES (?, ?)", [
      category.name,
      category.description,
    ])) as ResultSetHeader[];

  res.send({
    id: result.insertId,
    ...category,
  });
});

categoriesRouter.delete("/:id", async (req, res) => {
  const [results] = await mysqlDb
    .getConnection()
    .query("DELETE FROM categories WHERE id = ?", [req.params.id]);

  res.send("Category deleted.");
});

export default categoriesRouter;
