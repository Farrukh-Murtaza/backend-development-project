require("dotenv").config();
require("./config/db-connection");
const express = require("express");
const path = require("path");
const morgan = require("morgan");

const app = express();
const PORT = process.env.PORT || 3200; 


app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded());
app.use(express.json());
app.use(morgan('dev'));

const authRoutes = require("./routes/auth-routes");
const verifyAuthentication = require("./middlewares/verifyAuthentication");
app.use("/api/auth", verifyAuthentication  ,authRoutes);

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});