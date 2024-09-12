const express = require("express");
const cors = require("cors");
const app = express();
const dotenv = require("dotenv").config();
const router = require("./routers/routers");
const connecDB = require("./db/dbserver");
app.use(express.json());
app.use(cors());
app.use(express.json({ extended: true }));
connecDB();

app.use("/api/v1/data", router);
app;
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
