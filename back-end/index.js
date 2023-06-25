const express = require('express')
const app = express()
const port = 3000

const book = require("./src/routes/bookRoute");

app.use(express.json());
app.use("/book",book);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})