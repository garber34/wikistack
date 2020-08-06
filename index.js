const morgan =require('morgan');
const express=require('express');
const { urlencoded } = require('body-parser');
const methodOverride = require('method-override');
const app = express();
const layout =require("./views/layout.js");
const {db}  = require('./models');
const {Page} =require('./models/')
const wikiRouter =require('./routes/wiki');
const userRouter=require('./routes/user');


app.use(morgan("dev"));
app.use(express.static(__dirname+`./public`));
app.use(express.urlencoded({extended:false}));

app.get("/", (req,res)=>{
  res.redirect("/wiki");
})

app.use("/wiki",wikiRouter);
app.use("/users",userRouter);

const PORT = 1337;
db.sync({force:true}).then(() => {
  app.listen(PORT, () => {
    console.log(`App listening in port ${PORT}`);
  });
});


