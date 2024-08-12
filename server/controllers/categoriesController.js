const db = require("../config/db");

const getCategories = async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM categories");
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getCategoryByName = async (categoryName) => {
  const result = await db.query("SELECT id FROM categories WHERE name = $1", [
    categoryName,
  ]);
  return result.rows[0]?.id || null; // Return the id if found, otherwise null
};

module.exports = { getCategories, getCategoryByName };
