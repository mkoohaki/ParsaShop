const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();
app.use(cors());
// Init middleware
app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.send('API running'));

const userRouter = require('./routes/users');
const itemRouter = require('./routes/items');

app.use('/users', userRouter);
app.use('/items', itemRouter);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
