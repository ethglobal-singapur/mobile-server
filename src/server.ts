import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mockData from "./utils/mockData";
import createMockData from "./utils/mockData";
import { auth } from "./routes";
import dotenv from "dotenv";
import getContract from "./utils/getContract";

dotenv.config({ path: __dirname + "/.env" });

const app = express();

app.use(cors());
app.use(bodyParser.json());

const contact = getContract();

app.get("/get-all-users", async (req, res) => {
  const people = await contact.getAllPeople();
  console.log(people);
  res.send(people);
});

app.post("/add-user", async (req, res) => {
  const {
    name,
    surname,
    country,
    birth_date,
    document_number,
    visited_countries = [],
  } = req.body;

  console.log("x");
  console.log(req.body);

  const result = await contact.addPerson(
    document_number,
    name,
    surname,
    country,
    birth_date,
    new Date().toISOString(),
    visited_countries
  );

  res.send("pop");
});

app.get("/get-user", async (req, res) => {
  const document_number = req.body.document_number;
  const tx = await contact.getPerson(document_number);

  console.log(tx);
  res.send(tx);
});

app.delete("/delete-all-user", async (req, res) => {
  const result = await contact.removeAllPeople();
  res.send(result);
});

app.put("/add-country-to-user", async (req, res) => {
  console.log(req.body);
  const {
    document_number,
    name,
    surname,
    country,
    birth_date,
    visitedCountry,
  } = req.body;
  const result = await contact.addCountryToPerson(
    visitedCountry,
    document_number,
    name,
    surname,
    country,
    birth_date,
    Date.now().toString()
  );
  res.send(result);
});

// Auth routes

app.post("auth/login", auth.login);

app.listen(4000, () => {
  console.log("Server is running on port 4000");
});
