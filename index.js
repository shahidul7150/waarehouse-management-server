const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

// this is middleware
app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
    res.send('My f&c Stock server is ok' )
})

app.listen(port, () => {
    console.log("my f&C server running port",port);
})
