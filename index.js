import express from 'express';


const app = express();
const PORT = 3001;


app.use(express.json());


let books = [
  { id: 1, title: 'You Don\'t Know JS', author: 'Kyle Simpson', status: true },
  { id: 2, title: 'Ninja', author: 'John Resig', status: false },
  { id: 3, title: 'Code', author: 'Charles Petzold', status: true }
];


app.post('/books', (req, res) => {
  const { title, author, status } = req.body;
  const id = books.length + 1;
  const newBook = { id, title, author, status };
  books.push(newBook);
  res.status(201).json(newBook);
});


app.get('/books', (req, res) => {
  res.status(200).json(books);
});


app.get('/books/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const book = books.find(book => book.id === id);
  if (!book) {
    res.status(404).send('Book not found');
  } else {
    res.status(200).json(book);
  }
});


app.put('/books/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { title, author, status } = req.body;
  const index = books.findIndex(book => book.id === id);
  if (index === -1) {
    res.status(404).send('Book not found');
  } else {
    books[index] = { id, title, author, status };
    res.status(200).json(books[index]);
  }
});


app.delete('/books/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = books.findIndex(book => book.id === id);
  if (index === -1) {
    res.status(404).send('Book not found');
  } else {
    books.splice(index, 1);
    res.status(204).send();
  }
});


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


