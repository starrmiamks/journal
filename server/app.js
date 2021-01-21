require("dotenv").config();
let express = require('express');
let app = express();
let sequelize = require("./db");
let journal = require('./controllers/journalcontroller')
let user = require("./controllers/usercontroller");
// let about = require('./controllers/journalcontroller')

// app.use('/test', function(req,res){
//     res.send("This is a message from the test endpoint on the server!")
// });

// app.use('/mia', function(req,res){
//     res.send("My name is Mia.")
// });

sequelize.sync();

app.use(require('./middleware/headers'));

app.use(express.json());

app.use('/journal', journal);

app.use('/user', user);
// app.use('/about', about);
app.use(require('./middleware/validate-session'));


app.listen(3000, function () {
    console.log("App is listening on port 3000");
});
