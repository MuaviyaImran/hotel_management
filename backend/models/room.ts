import mongoose, { Schema, Document } from "mongoose";
import { IUser } from "./user";

export interface IImage extends Document {
  public_id: string;
  url: string;
}

export interface IReview extends Document {
  user: IUser;
  name: string;
  rating: number;
  comment: string;
}


export interface IRoom extends Document {
  name: string;
  description: string;
  pricePerNight: number;
  address: string;
  guestCapacity: number;
  numOfBeds: number;
  isInternet: boolean;
  isBreakfast: boolean;
  isAirConditioned: boolean;
  isPetsAllowed: boolean;
  isRoomCleaning: boolean;
  ratings: number;
  numOfReviews: number;
  images: IImage[];
  category: string;
  reviews: IReview[];
  user: IUser;
  createdAt: Date;
}

const roomSchema: Schema<IRoom> = new Schema({
  name: {
    type: String,
    required: [true, "Please enter a room name"],
    trim: true,
    maxLength: [200, "Room name cannot exceed 200 characters"],
  },
  description: {
    type: String,
    required: [true, "Please enter a room description"],
  },
  pricePerNight: {
    type: Number,
    required: [true, "Please enter a room price"],
    default: 0.0,
  },
  address: {
    type: String,
    required: [true, "Please enter a room address"],
  },

  guestCapacity: {
    type: Number,
    required: [true, "Please enter a room guest capacity"],
  },
  numOfBeds: {
    type: Number,
    required: [true, "Please enter a room number of beds"],
  },
  isInternet: {
    type: Boolean,
    default: false,
  },
  isBreakfast: {
    type: Boolean,
    default: false,
  },
  isAirConditioned: {
    type: Boolean,
    default: false,
  },
  isPetsAllowed: {
    type: Boolean,
    default: false,
  },
  isRoomCleaning: {
    type: Boolean,
    default: false,
  },
  ratings: {
    type: Number,
    default: 0,
  },
  numOfReviews: {
    type: Number,
    default: 0,
  },
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],

  category: {
    type: String,
    required: [true, "Please enter room category"],
    enum: {
      values: ["Single",
        "Deluxe",
        "Quad",
        "Triple",
        "Twins",
        "King",
        "Connected",],
      message: "Please select correct category for room",
    },
  },
  reviews: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});



export default mongoose.models.Room ||
  mongoose.model<IRoom>("Room", roomSchema);
