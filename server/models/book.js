const db = require("../config/db");

class Book {
  static async findById(id) {
    const result = await db.query("SELECT * FROM books WHERE id = $1", [id]);
    return result.rows[0];
  }

  static async create(bookData) {
    const result = await db.query(
      "INSERT INTO books (title, author, ownerId) VALUES ($1, $2, $3) RETURNING *",
      [bookData.title, bookData.author, bookData.ownerId]
    );
    return result.rows[0];
  }

  static async updateById(id, bookData) {
    const result = await db.query(
      "UPDATE books SET title = $1, author = $2 WHERE id = $3 RETURNING *",
      [bookData.title, bookData.author, id]
    );
    return result.rows[0];
  }

  static async deleteById(id) {
    await db.query("DELETE FROM books WHERE id = $1", [id]);
    return;
  }
}

module.exports = Book;
