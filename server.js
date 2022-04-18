/* -------------------------------------------------------------------------- */
/*                 SET UP - Import deps and create app object                 */
/* -------------------------------------------------------------------------- */
const express = require('express')
const app = express()
require('dotenv').config()
const methodOverride = require('method-override');
const PORT = process.env.PORT || 3000
const mongoose = require('mongoose');
const productsController = require('./controllers/products')
const d = new Date()


// Database Connection
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  

/* -------------------------------------------------------------------------- */
/*                          Delcare Middleware                                */
/* -------------------------------------------------------------------------- */
app.use(express.urlencoded({extended: true}))
app.use("/static", express.static('public'))
app.use(methodOverride('_method'));
app.use('/products',productsController)



// Database Connection Error/Success
// Define callback functions for various events
const db = mongoose.connection
db.on("error", (err) => console.log(err.message + " is mongo not running?"))
db.on("connected", () => console.log("mongo connected"))
db.on("disconnected", () => console.log("mongo disconnected"))




/* -------------------------------------------------------------------------- */
/*                               server listener                              */
/* -------------------------------------------------------------------------- */

app.listen(PORT,()=>console.log(`(╯°□°)╯ Mongoose Live on PORT ${PORT} - ${d.toLocaleString('en-US')} `))

