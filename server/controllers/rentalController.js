const Rental = require("../models/rental");
const Book = require("../models/book");
const { ForbiddenError } = require("@casl/ability");

const createRental = async (req, res) => {
  try {
    const book = await Book.findById(req.body.bookId);
    if (!book || !book.isApproved || book.rentedCount >= book.bookCount) {
      return res
        .status(400)
        .json({ message: "Book is not available for rent" });
    }

    if (req.ability.can("create", "Rental")) {
      const rental = await Rental.create({
        bookId: req.body.bookId,
        userId: req.user.id,
      });
      await Book.updateRentedCount(book.id, true);
      res.json(rental);
    } else {
      throw new ForbiddenError("Access denied");
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const returnRental = async (req, res) => {
  try {
    const rental = await Rental.findById(req.params.id);
    if (!rental) return res.status(404).json({ error: "Rental not found" });

    if (req.ability.can("update", rental)) {
      const returnedRental = await Rental.returnBook(req.params.id);
      await Book.updateRentedCount(returnedRental.bookId, false);
      res.json({ message: "Rental returned successfully" });
    } else {
      throw new ForbiddenError("Access denied");
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getRentals = async (req, res) => {
  try {
    const rentals = await Rental.findByUserId(req.user.id);
    res.json(rentals);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createRental,
  returnRental,
  getRentals,
};
