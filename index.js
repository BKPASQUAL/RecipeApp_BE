const express = require("express");
const cors = require("cors");
const { connectToDatabase } = require("./config/db");
// const routes = require("./routes/index.routes");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

connectToDatabase();

// app.use("/", routes);

app.listen(port, () => {
  console.log(`SERVER RUNNING ON PORT ${port}`);
});

//POFtThMWnC86rFE7