const express = require("express");
const cors = require("cors");
const app = express();
const db = require("./models");

// ejecutar modelos en la base de datos
db.sequelize.sync({ force: false }).then(() => {
  console.log("Sync Database");
});

// opciones cors
var corsOptions = {
  origin: "http://localhost:8081",
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ruta simple
app.get("/", (req, res) => {
  res.json({ message: "Bienvenidos" });
});

// incluir archivos de rutas
require('./routes/userRoutes')(app);
require('./routes/postRoutes')(app);

// definir puerto
app.listen(3001, () => {
  console.log("http://localhost:3001");
});
