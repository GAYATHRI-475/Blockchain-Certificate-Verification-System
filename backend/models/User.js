// // // // models/User.js
// // // import mongoose from "mongoose";

// // // const userSchema = new mongoose.Schema({
// // //   name: String,
// // //   email: { type: String, unique: true },

// // //   role: {
// // //     type: String,
// // //     enum: ["user"],
// // //     default: "user"
// // //   },

// // //   certificates: [
// // //     {
// // //       title: String,
// // //       issuedBy: String,
// // //       date: Date
// // //     }
// // //   ]
// // // });

// // // export default mongoose.model("User", userSchema);

// // import mongoose from "mongoose";

// // const userSchema = new mongoose.Schema(
// //   {
// //     name: { type: String, required: true },

// //     email: { 
// //       type: String, 
// //       required: true, 
// //       unique: true, 
// //       lowercase: true,   // ensures email matches Google login
// //       trim: true
// //     },

// //     password: { type: String, required: true }, // store hashed password

// //     role: {
// //       type: String,
// //       enum: ["user"],
// //       default: "user",
// //     },

// //     certificates: [
// //       {
// //         title: String,
// //         issuedBy: String,
// //         date: Date,
// //       },
// //     ],
// //   },
// //   { timestamps: true } // createdAt and updatedAt
// // );

// // const User = mongoose.model("User", userSchema);

// // export default User;



// // models/User.js


// // models/User.js
// import mongoose from "mongoose";

// const userSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   email: { type: String, unique: true, required: true },
//   password: { type: String, required: true },

//   role: {
//     type: String,
//     enum: ["user"],
//     default: "user",
//   },

//   // Array of certificate IDs from the certificates collection
//   certificates: [
//     {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Certificate",
//     },
//   ],
// });

// export default mongoose.model("User", userSchema);

import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["user"],
    default: "user",
  },
  certificates: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Certificate", // assuming you have Certificate model
    },
  ],
});

export default mongoose.model("User", userSchema);