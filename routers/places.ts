import { Router } from "express";
import mysqlDb from "../mysqldb";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { placeWithoutId } from "../type";
const placesRouter = Router();

placesRouter.get("/", async (req, res) => {
  const [results] = await mysqlDb
    .getConnection()
    .query("SELECT id, name from places");
  res.send(results);
});

placesRouter.get("/:id", async (req, res) => {
  const [results] = (await mysqlDb
    .getConnection()
    .query("SELECT * FROM places " + "WHERE id = ?", [
      req.params.id,
    ])) as RowDataPacket[];

  const place = results[0];

  if (!place) {
    return res.status(404).send({ error: "Not found!" });
  }

  res.send(place);
});

placesRouter.post("/", async (req, res) => {
  const place: placeWithoutId = {
    name: req.body.name,
    description: req.body.description,
  };

  const [result] = (await mysqlDb
    .getConnection()
    .query("INSERT INTO places (name, description)" + "VALUES (?, ?)", [
      place.name,
      place.description,
    ])) as ResultSetHeader[];

  res.send({
    id: result.insertId,
    ...place,
  });
});

placesRouter.delete("/:id", async (req, res) => {
  const [results] = await mysqlDb
    .getConnection()
    .query("DELETE FROM places WHERE id = ?", [req.params.id]);

  res.send("Place deleted.");
});

export default placesRouter;
