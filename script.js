const express = require('express')
const app = express()
const db = require('./config/db')
const personrouter = require("./routes/Personroute")



app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.get("/", (req, res) => {
  res.send("hello")
})

app.use("/login",personrouter)




app.listen(3000, function (err) {
  console.log("it is running on port 3000");

})