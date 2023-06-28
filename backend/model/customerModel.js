const mongoose = require("mongoose");
const { phoneNumberRegex , emailRegex } = require("../utils/helper.js");

//Customer Model Schema
const customerSchema = new mongoose.Schema({

  phoneNumber: {
    type: String,
    required: [true, "phoneNumber must not be empty"],
    match: [phoneNumberRegex, "ph-number is not vald"],
  },
  email: {
    type: String,
    required: [true, "email must not be empty"],
    match: [emailRegex, "email is not valid"],
  },
  linkedId: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "linkedId fill with some value"],
    default: null,
  },
  linkPrecedence: {
    type: String,
    required: [true, "linkReference is required"],
    enum: ["primary", "secondary"],
  },
  createdAt: {
    type: Date,
    default: new Date(Date.now()),
  },
  updatedAt: {
    type: Date,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  deletedAt: {
    type: Date,
  },
});

// {
//     "contact":{
//         "primaryContatctId": 1,
//         "emails": ["lorraine@hillvalley.edu","mcfly@hillvalley.edu"]
//         "phoneNumbers": ["123456"]
//         "secondaryContactIds": [23]
//     }
// }

// {
// 	id                   1
//   phoneNumber          "123456"
//   email                "lorraine@hillvalley.edu"
//   linkedId             null
//   linkPrecedence       "primary"
//   createdAt            2023-04-01 00:00:00.374+00
//   updatedAt            2023-04-01 00:00:00.374+00
//   deletedAt            null
// },
// {
// 	id                   23
//   phoneNumber          "123456"
//   email                "mcfly@hillvalley.edu"
//   linkedId             1
//   linkPrecedence       "secondary"
//   createdAt            2023-04-20 05:30:00.11+00
//   updatedAt            2023-04-20 05:30:00.11+00
//   deletedAt            null
// },

module.exports = mongoose.model("contact", customerSchema);
