const {
  createSchool,
  getAllSchools
} = require('../services/school.service');

const { calculateDistance } = require('../utils/geo');


async function addSchool(req, res) {
  try {
    const { name, address, latitude, longitude } = req.body;

    if (!name || !address) {
      return res.status(400).json({
        message: "Name and address are required"
      });
    }

    if (
      typeof latitude !== 'number' ||
      typeof longitude !== 'number'
    ) {
      return res.status(400).json({
        message: "Latitude and longitude must be numbers"
      });
    }

    if (
      latitude < -90 || latitude > 90 ||
      longitude < -180 || longitude > 180
    ) {
      return res.status(400).json({
        message: "Invalid coordinate range"
      });
    }

    const id = await createSchool({
      name,
      address,
      latitude,
      longitude
    });

    return res.status(201).json({
      message: "School added successfully",
      id
    });

  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error: error.message
    });
  }
}


async function listSchools(req, res) {
  try {
    const { latitude, longitude } = req.query;

    if (!latitude || !longitude) {
      return res.status(400).json({
        message: "Latitude and longitude are required"
      });
    }

    const userLat = parseFloat(latitude);
    const userLon = parseFloat(longitude);

    if (isNaN(userLat) || isNaN(userLon)) {
      return res.status(400).json({
        message: "Invalid coordinates"
      });
    }

    const schools = await getAllSchools();

    const result = schools.map((school) => {
      const distance = calculateDistance(
        userLat,
        userLon,
        school.latitude,
        school.longitude
      );

      return { ...school, distance };
    });

    result.sort((a, b) => a.distance - b.distance);

    return res.json(result);

  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error: error.message
    });
  }
}

module.exports = {
  addSchool,
  listSchools
};