const moongoose = require("mongoose");

const connectToDB = async () => {
  try {
    await moongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log("Connected to MongoDB");
  } catch (err) {
    console.log("Error connecting to MongoDB", err);
  }
};

module.exports = connectToDB;

//OLD METHODE

//  moongoose
//   .connect(process.env.MONGODP_URI, {
//     serverSelectionTimeoutMS: 5000,
//   })
//   .then(() => {
//     console.log("Connected to MongoDB");
//   })
//   .catch((err) => {
//     console.log("Error connecting to MongoDB", err);
//   });
