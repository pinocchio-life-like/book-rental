const Book = require("../models/book");
const { ForbiddenError } = require("@casl/ability");
const { z } = require("zod");

const bookSchema = z.object({
  title: z.string().max(255),
  author: z.string().max(255),
  categoryId: z.number(),
  ownerId: z.number(),
  rentPrice: z.number().positive(),
  isApproved: z.boolean().default(false),
  bookCount: z.number().min(1),
});

const getBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ error: "Book not found" });

    if (req.ability.can("read", book)) {
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
    const validatedData = bookSchema.parse(req.body);
    if (req.ability.can("create", "Book")) {
      const book = await Book.create(validatedData);
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
    const validatedData = bookSchema.parse(req.body);
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ error: "Book not found" });

    if (req.ability.can("update", book)) {
      const updatedBook = await Book.updateById(req.params.id, validatedData);
      res.json(updatedBook);
    } else {
      throw new ForbiddenError("Access denied");
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ error: "Book not found" });

    if (req.ability.can("delete", book)) {
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
