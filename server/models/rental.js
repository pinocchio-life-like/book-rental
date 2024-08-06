const db = require("../config/db");

class Rental {
  static async findActiveByBookId(bookId) {
    const result = await db.query(
      "SELECT * FROM rentals WHERE bookId = $1 AND isActive = TRUE",
      [bookId]
    );
    return result.rows[0];
  }

  static async create(rentalData) {
    const { bookId, userId } = rentalData;
    const result = await db.query(
      "INSERT INTO rentals (bookId, userId) VALUES ($1, $2) RETURNING *",
      [bookId, userId]
    );
    return result.rows[0];
  }

  static async returnBook(rentalId) {
    const result = await db.query(
      "UPDATE rentals SET isActive = FALSE, returnDate = CURRENT_TIMESTAMP WHERE id = $1 RETURNING *",
      [rentalId]
    );
    return result.rows[0];
  }
}

module.exports = Rental;
