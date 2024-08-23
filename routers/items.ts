import { Router } from "express";
import mysqlDb from "../mysqldb";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { imagesUpload } from "../multer";
import { itemWithoutId } from "../type";
const itemsRouter = Router();

itemsRouter.get("/", async (req, res) => {
  const [results] = await mysqlDb
    .getConnection()
    .query(
      "SELECT i.id, c.name categoryId, p.name placeId, i.name, i.description, i.image FROM items i " +
        "LEFT JOIN cofee.categories c on i.categoryId = c.id " +
        "LEFT JOIN cofee.places p on i.placeId = p.id"
    );
  res.send(results);
});

itemsRouter.get("/:id", async (req, res) => {
  const [results] = (await mysqlDb
    .getConnection()
    .query("SELECT * FROM items " + "WHERE id = ?", [
      req.params.id,
    ])) as RowDataPacket[];

  const item = results[0];

  if (!item) {
    return res.status(404).send({ error: "Not found!" });
  }

  res.send(item);
});

itemsRouter.post("/", imagesUpload.single("image"), async (req, res) => {
  const item: itemWithoutId = {
    categoryId: req.body.categoryId,
    placeId: req.body.placeId,
    name: req.body.name,
    description: req.body.description,
    image: req.file ? req.file.filename : null,
  };

  const [result] = (await mysqlDb
    .getConnection()
    .query(
      "INSERT INTO items (categoryId, placeId, name, description, image)" +
        "VALUES (?, ?, ?, ?, ?)",
      [item.categoryId, item.placeId, item.name, item.description, item.image]
    )) as ResultSetHeader[];

  res.send({
    id: result.insertId,
    ...item,
  });
});

itemsRouter.delete("/:id", async (req, res) => {
  const [results] = await mysqlDb
    .getConnection()
    .query("DELETE FROM items WHERE id = ?", [req.params.id]);

  res.send("Item deleted.");
});

export default itemsRouter;
