const db = require("../config/db");
const bcrypt = require("bcryptjs");

class User {
  static async findByEmail(email) {
    const result = await db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    return result.rows[0];
  }

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
}

module.exports = User;
