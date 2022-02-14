const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const carSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide car's name"],
      unique: true,
    },
    maker: {
      type: String,
      required: [true, "Please provide car's maker"],
    },
    year: {
      type: Number,
      required: [true, "Please provide the year the car was made"],
    },
    price: {
      type: String,
      required: [true, "Please provide the car's price"],
    },
    mpg: {
      type: Number,
      required: [true, "Please provide car's miles per gallon"],
    },
    image: {
      type: String,
      required: [true, "Please provide car's image link"],
    },
    featured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Car = mongoose.model("Car", carSchema);

module.exports = Car;
