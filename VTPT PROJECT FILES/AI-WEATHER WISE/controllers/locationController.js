const Location = require("../models/Location");

const addLocation = async (req, res) => {
  try {
    const { city, country } = req.body;

    if (!city || !country) {
      return res.status(400).json({
        message: "City and country are required",
      });
    }

    const existingLocation = await Location.findOne({
      user: req.user.userId,
      city,
      country,
    });

    if (existingLocation) {
      return res.status(400).json({
        message: "Location already exists in favorites",
      });
    }

    const location = new Location({
      user: req.user.userId,
      city,
      country,
    });

    await location.save();

    res.status(201).json({
      message: "Location added successfully",
      location,
    });
  } catch (error) {
    console.error("Add location error:", error.message);

    res.status(500).json({
      message: error.message,
      error: error.message,
    });
  }
};

const getLocations = async (req, res) => {
  try {
    const locations = await Location.find({
      user: req.user.userId,
    });

    res.json(locations);
  } catch (error) {
    console.error("Get locations error:", error.message);

    res.status(500).json({
      message: error.message,
      error: error.message,
    });
  }
};
const deleteLocation = async (req, res) => {
  try {
    const location = await Location.findOneAndDelete({
      _id: req.params.id,
      user: req.user.userId,
    });

    if (!location) {
      return res.status(404).json({
        message: "Favorite location not found",
      });
    }

    res.json({
      message: "Location removed from favorites",
    });
  } catch (error) {
    console.error("Delete location error:", error.message);

    res.status(500).json({
      message: error.message,
      error: error.message,
    });
  }
};
module.exports = {
  addLocation,
  getLocations,
  deleteLocation,
};