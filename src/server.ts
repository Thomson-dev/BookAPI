import express from 'express';
import authRoutes from './routes/user.routes';
import dotenv from 'dotenv';
dotenv.config();


const app = express();
const port = 5000;


app.use(express.json());


app.get('/', (req, res) => {
  res.send('Hello, world!');
});
app.use('/api/auth', authRoutes);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});


export default app;