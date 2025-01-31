import express from 'express';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

app.get('/api/notes', async (req, res) => {
  res.json({ message: 'Message successful!' });
});

app.listen(5000, () => {
  console.log('server running on localhost:5000');
});
