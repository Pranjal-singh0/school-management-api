const db = require('../config/db');

async function createSchool(data) {
  const { name, address, latitude, longitude } = data;

  const query = `
    INSERT INTO schools (name, address, latitude, longitude)
    VALUES (?, ?, ?, ?)
  `;

  const [result] = await db.execute(query, [
    name,
    address,
    latitude,
    longitude
  ]);

  return result.insertId;
}

async function getAllSchools() {
  const [rows] = await db.execute('SELECT * FROM schools');
  return rows;
}

module.exports = {
  createSchool,
  getAllSchools
};