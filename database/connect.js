const mongoose = require("mongoose");

mongoose.connect(process.env.DB_HOST, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
mongoose.connection.on("error", console.log);