const Book = require("../models/book");
const { ForbiddenError } = require("@casl/ability");

const getBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (req.ability.can("read", "Book")) {
      res.json(book);
    } else {
      throw new ForbiddenError("Access denied");
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createBook = async (req, res) => {
  try {
    if (req.ability.can("create", "Book")) {
      const book = await Book.create(req.body);
      res.json(book);
    } else {
      throw new ForbiddenError("Access denied");
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateBook = async (req, res) => {
  try {
    if (req.ability.can("update", "Book")) {
      const book = await Book.updateById(req.params.id, req.body);
      res.json(book);
    } else {
      throw new ForbiddenError("Access denied");
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteBook = async (req, res) => {
  try {
    if (req.ability.can("delete", "Book")) {
      await Book.deleteById(req.params.id);
      res.status(204).send();
    } else {
      throw new ForbiddenError("Access denied");
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getBook,
  createBook,
  updateBook,
  deleteBook,
};
