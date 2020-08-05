const morgan =require('morgan');
const express=require('express');
const { urlencoded } = require('body-parser');
const methodOverride = require('method-override');
const app = express();
const layout =require("./views/layout.js");

app.use(morgan("dev"));
app.use(express.static(__dirname+`./public`));
app.use(express.urlencoded({extended:false}));


app.get("/", (req, res) => {

res.send(layout(""));

})

const PORT = 1337;

app.listen(PORT, () => {
  console.log(`App listening in port ${PORT}`);
});


