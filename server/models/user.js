const db = require("../config/db");
const bcrypt = require("bcryptjs");

class User {
  static async create(userData) {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const result = await db.query(
      "INSERT INTO users (name, email, password, location, phone, role) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [
        userData.name,
        userData.email,
        hashedPassword,
        userData.location,
        userData.phone,
        userData.type,
      ]
    );
    return result.rows[0];
  }

  static async findByEmail(email) {
    const result = await db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    return result.rows[0];
  }

  static async findById(id) {
    const result = await db.query("SELECT * FROM users WHERE id = $1", [id]);
    return result.rows[0];
  }

  static async findAll() {
    const result = await db.query(`
    SELECT users.*, COUNT(books.id) AS uploads
    FROM users
    LEFT JOIN books ON users.id = books.ownerId
    GROUP BY users.id
  `);
    return result.rows;
  }

  static async updateApprovalStatus(id, isapproved) {
    const result = await db.query(
      "UPDATE users SET isapproved = $1 WHERE id = $2 RETURNING *",
      [isapproved, id]
    );
    return result.rows[0];
  }

  static async findByIdAndDelete(id) {
    const result = await db.query(
      "DELETE FROM users WHERE id = $1 RETURNING *",
      [id]
    );
    return result.rows[0];
  }
}

module.exports = User;
