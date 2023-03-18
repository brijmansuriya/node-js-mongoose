var mongoose = require("mongoose");
mongoose.set('strictQuery', false);
require('dotenv').config()
mongoose.connect(process.env.URL, {
  useNewUrlParser: true,
  // useFindAndModify: false,
  useUnifiedTopology: true
})
.then(() => {
  console.log("Succesfully Connected to the Mongodb Database.........");
})
.catch((e) => {
  console.log('::::::::::::::DB::::::::::::::',e);
});
mongoose.set("debug", false);