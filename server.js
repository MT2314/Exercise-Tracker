// Dependencies
const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");

// Port number
const PORT = process.env.PORT || 8080;

// Express
const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));




mongoose.connect(
   process.env.MONGODB_URI || 'mongodb://localhost/workout',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  }
)

// Routes
app.use(require("./routes/api-routes.js"))
app.use(require("./routes/html-routes.js"))

// Start app
app.listen(PORT, () => {
  console.log(`App running on port http://localhost:${PORT}/`);
});