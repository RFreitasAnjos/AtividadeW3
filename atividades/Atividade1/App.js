const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

let books = [
  { id: 1, title: "livro 1" },
  { id: 2, title: "livro 2" },
];

app.get("/books", (req, res) => {
  res.json(books);
});

app.put("/update-book/:id", (req, res) => {
  const bookId = parseInt(req.params.id);
  const newTitle = req.body.title;

  const bookToUpade = books.findIndex((book) => book.id === bookId);

  if (bookToUpade) {
    bookToUpade.title = newTitle;
    res.json(bookToUpade);
  } else {
    res.status(404).send("Livro não");
  }
});

app.delete("/delete-book/:id", (req,res) => {
  const bookId = parseInt(req.params.id);
  const indexToRemove = books.findIndex((book) => book.id === bookId);

  if (indexToRemove !== -1) {
    const removedBook = books.splice(indexToRemove, 1);
    res.json(removedBook[0]);
  } else{
    res.status(404).send('Livro não encontrado');
  }
});

app.post("/post-example", (req, res) => {
  const newBook = req.body;
  books.push(newBook);
  res.json(newBook);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, console.log(`Server stared on port ${PORT}`));
