// ---------- Task 2: Basic CRUD ----------

// Find all books in a specific genre
db.books.find({ genre: "Classic" });

// Find books published after a certain year
db.books.find({ published_year: { $gt: 2015 } });

// Find books by a specific author
db.books.find({ author: "George Orwell" });

// Update the price of a specific book
db.books.updateOne(
  { title: "The Great Gatsby" },
  { $set: { price: 15.99 } }
);

// Delete a book by its title
db.books.deleteOne({ title: "The Hobbit" });

// ---------- Task 3: Advanced Queries ----------

// Find books that are both in stock and published after 2010
db.books.find({
  in_stock: true,
  published_year: { $gt: 2010 }
});

// Projection: return only title, author, and price
db.books.find({}, { _id: 0, title: 1, author: 1, price: 1 });

// Sort by price (ascending)
db.books.find().sort({ price: 1 });

// Sort by price (descending)
db.books.find().sort({ price: -1 });

// Pagination: first 5 books (page 1)
db.books.find().skip(0).limit(5);

// Pagination: second 5 books (page 2)
db.books.find().skip(5).limit(5);

// ---------- Task 4: Aggregation Pipelines ----------

// Average price of books by genre
db.books.aggregate([
  { $group: { _id: "$genre", avgPrice: { $avg: "$price" } } }
]);

// Author with the most books
db.books.aggregate([
  { $group: { _id: "$author", totalBooks: { $sum: 1 } } },
  { $sort: { totalBooks: -1 } },
  { $limit: 1 }
]);

// Group books by publication decade
db.books.aggregate([
  {
    $group: {
      _id: { $floor: { $divide: ["$published_year", 10] } },
      count: { $sum: 1 }
    }
  },
  {
    $project: {
      decade: { $multiply: ["$_id", 10] },
      count: 1,
      _id: 0
    }
  }
]);

// ---------- Task 5: Indexing ----------

// Create index on title
db.books.createIndex({ title: 1 });

// Create compound index on author and published_year
db.books.createIndex({ author: 1, published_year: 1 });

// Use explain to show query performance
db.books.find({ title: "Dune" }).explain("executionStats");
