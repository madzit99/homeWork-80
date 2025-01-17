import express from "express";
import cors from "cors";
import mysqlDb from "./mysqldb";
import placesRouter from "./routers/places";
import categoriesRouter from "./routers/categories";
import itemsRouter from "./routers/items";

const app = express();
const port = 8000;

app.use(express.static("public"));
app.use(express.json());
app.use(cors());
app.use("/items", itemsRouter);

app.use("/places", placesRouter);
app.use("/categories", categoriesRouter);

const run = async () => {
  await mysqlDb.init();

  app.listen(port, () => {
    console.log(`Server started on ${port} port!`);
  });
};

void run();
