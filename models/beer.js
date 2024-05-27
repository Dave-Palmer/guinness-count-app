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
  withfriends: [{ type: Schema.Types.ObjectId, ref: "User" }],
  createdAt: { type: Date, default: Date.now },
});

const Beer = models.Beer || model("Beer", beerSchema);

export default Beer;
