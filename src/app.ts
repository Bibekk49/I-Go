import express from 'express';

const app = express();

app.get('/', (_req, res) => {
  res.send('Yo! Server is live.');
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
