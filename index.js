const express = require("express");
const cors = require("cors");
const routes = require("./routes");
const AppError = require("./utils/appError");
const errorHandler = require("./utils/errorHandler");
const PORT = 5000;

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.all("*", (req, res, next) => {
  next(new AppError(`The URL ${req.originalUrl} does not exist`, 404));
});
app.use(errorHandler);

app.listen(PORT, () => console.log("Server is up and running at port " + PORT));
