let express = require("express");
let path = require("path");

let app = express();

app.use("/", express.static(path.resolve(__dirname, '..')));

app.listen(3000, () => {
    console.info("http://localhost:3000");
});