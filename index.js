const express = require("express");
const connectDb = require('./Config/db');
const cors = require('cors');
const dotenv = require('dotenv');  

dotenv.config();
connectDb();   

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/recipes', require('./Routes/RecipeRoutes'));
app.use('/api/users', require('./Routes/userRoutes'));

// Use PORT from environment or default to 8000
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`Server started at port ${PORT}`));
