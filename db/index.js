const mongoose = require("mongoose");

mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true);

//mongodb://heroku_r5f3x44q:6f05c4sqstqspd01n62kv7bish@ds159509.mlab.com:59509/heroku_r5f3x44q
mongoose
  .connect(
    process.env.MONGODB_URI ||
      "mongodb:////heroku_r5f3x44q:6f05c4sqstqspd01n62kv7bish@ds159509.mlab.com:59509/heroku_r5f3x44q"
  )
  .then((conn) => {
    console.log(`Connected to ${conn.connections[0].name}`);
  })
  .catch((err) => {
    console.log(`Error connecting to the DB: ${err}`);
  });

module.exports = {
  disconnect: () => {
    mongoose.connection.close();
  },
};
