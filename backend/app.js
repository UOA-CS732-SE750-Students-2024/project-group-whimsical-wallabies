import dotenv from 'dotenv';
import express from 'express';

const app = express();
dotenv.config();

const PORT = process.env.PORT;

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
