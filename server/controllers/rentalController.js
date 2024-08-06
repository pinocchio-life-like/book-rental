const Rental = require("../models/rental");

const rentBook = async (req, res) => {
  const { bookId, userId } = req.body;
  try {
    const activeRental = await Rental.findActiveByBookId(bookId);
    if (activeRental) {
      return res.status(400).json({ message: "Book is currently rented" });
    }

    const rental = await Rental.create({ bookId, userId });
    res.status(201).json(rental);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const returnBook = async (req, res) => {
  const { rentalId } = req.params;
  try {
    const rental = await Rental.returnBook(rentalId);
    if (!rental) {
      return res.status(404).json({ message: "Rental not found" });
    }
    res.json({ message: "Book returned successfully", rental });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { rentBook, returnBook };
