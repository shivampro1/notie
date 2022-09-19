const mongoose = require("mongoose");

// const mongoURI = "mongodb+srv://shivam:Lsa45EtlQZ385FoA@notie.fyaymdm.mongodb.net/notie";
// mongodb+srv://shivam:MrsnbWEFEBWHlhP7@notie.fyaymdm.mongodb.net/notie

// const connectToMongo = () => {
//   mongoose
//     .connect(mongoURI)
//     .then(() => {
//       console.log("connected successfully!!!");
//     })
//     .catch((err) => {
//       console.log("error mil gaya ", err);
//     });
// };

const connectToMongo = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("connect successfully");
  } catch (err) {
    console.log("error occurred! ", err);
  }
};

module.exports = connectToMongo;
