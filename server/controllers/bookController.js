const Book = require("../models/book");
const { ForbiddenError } = require("@casl/ability");
const { z } = require("zod");
const { getCategoryByName } = require("./categoriesController");

const bookSchema = z.object({
  title: z.string().max(255),
  author: z.string().max(255),
  categoryId: z.number(),
  ownerId: z.number(),
  rentPrice: z.number().positive(),
  isApproved: z.boolean().default(false),
  bookCount: z.number().min(1),
});

const getBooks = async (req, res) => {
  try {
    const books = await Book.findAll();
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getBookById = async (req, res) => {
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
    const { category, rentPrice, bookQuantity, ...otherData } = req.body;

    const categoryId = await getCategoryByName(category);
    if (!categoryId) {
      return res.status(400).json({ error: "Invalid category" });
    }

    const bookData = {
      ...otherData,
      categoryId,
      ownerId: req.user.id,
      rentPrice: Number(rentPrice),
      bookCount: Number(bookQuantity),
    };

    const validatedData = bookSchema.parse(bookData);

    if (req.ability.can("create", "Book")) {
      const book = await Book.create(validatedData);
      res.json(book);
    } else {
      throw new ForbiddenError("Access denied");
    }
  } catch (error) {
    console.error("Error creating book:", error);
    res.status(500).json({ error: error.message });
  }
};

const updateBook = async (req, res) => {
  try {
    const { category, rentprice, bookcount, ...otherData } = req.body;

    const categoryId = await getCategoryByName(category);
    if (!categoryId) {
      return res.status(400).json({ error: "Invalid category" });
    }

    const bookData = {
      ...otherData,
      categoryId,
      ownerId: req.user.id,
      rentPrice: Number(rentprice),
      bookCount: Number(bookcount),
    };

    const validatedData = bookSchema.parse(bookData);
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ error: "Book not found" });

    if (req.ability.can("update", "Book")) {
      const updatedBook = await Book.updateById(req.params.id, validatedData);
      res.json(updatedBook);
    } else {
      throw new ForbiddenError("Access denied");
    }
  } catch (error) {
    console.error("Error updating book:", error);
    res.status(500).json({ error: error.message });
  }
};

const deleteBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ error: "Book not found" });

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

const updateBookApproval = async (req, res) => {
  try {
    const { isapproved } = req.body;
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ error: "Book not found" });

    if (req.ability.can("update", book)) {
      const updatedBook = await Book.updateApproval(req.params.id, isapproved);
      res.json(updatedBook);
    } else {
      throw new ForbiddenError("Access denied");
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
  updateBookApproval,
};
