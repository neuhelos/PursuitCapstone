const workshops = require("express").Router()
const {
  createWorkshop,
  getWorkshop,
  getPastWorkshop,
  deleteWorkshop,
  getAllWorkshops,
  editWorkshop,
} = require("../Queries/WorkshopQueries");

const { searchWorkshops } = require("../Queries/WorkshopSearchQuery")

workshops.post("/", createWorkshop);
workshops.post("/search", searchWorkshops)
workshops.get("/:id", getWorkshop);
workshops.get("/pastworkshops/:id", getPastWorkshop);
workshops.delete("/:id", deleteWorkshop);
workshops.get("/", getAllWorkshops);
workshops.put("/:id", editWorkshop);

module.exports = workshops;
