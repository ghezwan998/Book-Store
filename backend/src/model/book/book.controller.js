const Book = require("./book.model");
const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

const newBook = async (req, res) => {
  try {
    const { title, description, category, author, price } = req.body;
    //const img = req.file ? req.file.path : null;

    let imgPath = null;

    if (req.file) {
      const filename = `book-${Date.now()}.jpg`;
      const outputPath = path.join("uploads", filename);

      // Resize and convert the image
      await sharp(req.file.buffer)
        .resize(400, 600) // Resize dimensions
        .toFormat("jpeg")
        .jpeg({ quality: 90 }) // Set quality
        .toFile(outputPath);

      imgPath = outputPath;
    }

    if (!title || price == null) {
      return res.status(400).json({ message: "Title and price are required." });
    }

    const newBook = new Book({
      title,
      description,
      category,
      author,
      price,
      img : imgPath,
    });
    const savedBook = await newBook.save();

    res.status(201).json(savedBook);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error creating book", error: err.message });
  }
};

const getBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id).populate(
      "reviews.user",
      "name"
    );
    if (!book) return res.status(404).json({ message: "Book not found" });
    res.status(200).json(book);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching book", error: err.message });
  }
};

const getAllBook = async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching books", error: err.message });
  }
};

const deleteBook = async (req, res) => {
  try {
    const deletedBook = await Book.findByIdAndDelete(req.params.id);

    if (!deletedBook)
      return res.status(404).json({ message: "Book not found" });

    res.status(200).json({ message: "Book deleted successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error deleting book", error: err.message });
  }
};

const updateBook = async (req, res) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedBook)
      return res.status(404).json({ message: "Book not found" });

    res.status(200).json(updatedBook);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error updating book", error: err.message });
  }
};

const addReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    // Prevent duplicate review by same user
    const alreadyReviewed = book.reviews.find(
      (r) => r.user.toString() === req.user.id
    );
    if (alreadyReviewed) {
      return res
        .status(400)
        .json({ message: "You have already reviewed this book." });
    }

    // Add review
    const newReview = {
      user: req.user.id,
      rating: Number(rating),
      comment,
    };
    book.reviews.push(newReview);

    // Update counts and average
    book.numReviews = book.reviews.length;
    book.averageRating =
      book.reviews.reduce((acc, r) => acc + r.rating, 0) / book.numReviews;

    await book.save();

    res.status(201).json({ message: "Review added successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = {
  newBook,
  getBook,
  getAllBook,
  deleteBook,
  updateBook,
  addReview,
};
