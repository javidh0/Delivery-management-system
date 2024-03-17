const express = require('express');

const app = express();
app.use(express.json());

app.listen(1729, () => {
    console.log(`Successfully started server on port 1729.`);
});

app.get('/', (req, res) => {
  res.send("helloo")
})
