import { Schema, model, models } from "mongoose";

const beerSchema = new Schema({
  location: {
    type: String,
    required: [true, "Location is required"],
  },
  consumer: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  friendParty: [{ type: Schema.Types.ObjectId, ref: "User" }],
});

const Beer = models.Beer || model("Beer", beerSchema);

export default Beer;
