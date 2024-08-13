const db = require("../config/db");

class Book {
  static async findById(id) {
    const result = await db.query("SELECT * FROM books WHERE id = $1", [id]);
    return result.rows[0];
  }

  static async create(bookData) {
    const result = await db.query(
      "INSERT INTO books (title, author, categoryId, ownerId, rentPrice, isApproved, bookCount) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
      [
        bookData.title,
        bookData.author,
        bookData.categoryId,
        bookData.ownerId,
        bookData.rentPrice,
        bookData.isApproved,
        bookData.bookCount,
      ]
    );
    return result.rows[0];
  }

  static async updateById(id, bookData) {
    const result = await db.query(
      "UPDATE books SET title = $1, author = $2, categoryId = $3, rentPrice = $4, isApproved = $5, bookCount = $6 WHERE id = $7 RETURNING *",
      [
        bookData.title,
        bookData.author,
        bookData.categoryId,
        bookData.rentPrice,
        bookData.isApproved,
        bookData.bookCount,
        id,
      ]
    );
    return result.rows[0];
  }

  static async deleteById(id) {
    await db.query("DELETE FROM books WHERE id = $1", [id]);
    return;
  }

  static async findAllByOwner(ownerId) {
    const result = await db.query("SELECT * FROM books WHERE ownerId = $1", [
      ownerId,
    ]);
    return result.rows;
  }

  static async findAllApproved() {
    const result = await db.query(
      "SELECT * FROM books WHERE isApproved = TRUE"
    );
    return result.rows;
  }

  static async updateRentedCount(id, increment = true) {
    const result = await db.query(
      "UPDATE books SET rentedCount = rentedCount + $1 WHERE id = $2 RETURNING *",
      [increment ? 1 : -1, id]
    );
    return result.rows[0];
  }

  static async findAll() {
    const result = await db.query(`
    SELECT books.title, books.categoryId, books.author, categories.name AS category
    FROM books
    JOIN categories ON books.categoryId = categories.id
  `);
    return result.rows;
  }
}

module.exports = Book;
