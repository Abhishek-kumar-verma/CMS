const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

dotenv.config();

const connectionUrl = process.env.MONGODB_URL;
const port = process.env.PORT;
const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

mongoose.connect( connectionUrl , connectionParams).then( () => { console.log("connected Database")}).catch((err) => { console.log(`Error in connection database \n${err}`)});


const postRouter = require('./routes/posts.js');
app.use('/api/v1/posts', postRouter);

const authorRouter = require('./routes/author.js');
app.use('/api/v1/author' , authorRouter);

const categoryRouter = require('./routes/category.js');
app.use("/api/v1/category" , categoryRouter);

const tagRouter = require('./routes/tags.js');
app.use("/api/v1/tag" , tagRouter);



app.listen( port , ()=> console.log(`Server running on Port ${port}`));