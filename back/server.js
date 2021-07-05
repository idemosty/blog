//Building REST API
const express = require('express')
//Provides Express middleware to enable CORS with various options.
const cors = require('cors')
const app = express()

let corsOptions = {
  origin: 'http://localhost:8081',
}

app.use(cors(corsOptions))
// parse request content-type -> application/json
app.use(express.json())
// parse request content-type -> application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }))

// simple route
app.get('/', (req, res) => {
  res.json({ message: 'Meet us Idemosty ;)' })
})

require('./app/routes/tip.routes')(app)
// set port + listen for request
const PORT = process.env.BACK_PORT || 8080
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`)
})

const db = require('./app/models')
// const tip_controller = require("./app/controllers/tip.controller");

// const seedData = async () => {
//   try {
//     await tip_controller.create({
//       title: "CSS Tips - Center element",
//       description: "How to center an element with css",
//       published: true,
//     });
//     await tip_controller.create({
//       title: "CSS Tips - Superscript element",
//       description: "Display text as superscript",
//       published: true,
//     });
//     await tip_controller.create({
//       title: "CSS Tips - Smooth animation",
//       description: "How to apply an smooth animation on scrolling",
//       published: true,
//     });
//   } catch (err) {
//     console.log(err);
//   }
// };

db.sequelize.sync({ force: true }).then(() => {
  console.log('Drop and re-sync DB')
  // seedData();
})
