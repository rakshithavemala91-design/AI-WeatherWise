const express = require("express");

const {
  addLocation,
  getLocations,
  deleteLocation,
} = require("../controllers/locationController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, addLocation);

router.get("/", authMiddleware, getLocations);

router.delete("/:id", authMiddleware, deleteLocation);

module.exports = router;