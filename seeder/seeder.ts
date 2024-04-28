
import Room from "../backend/models/room";
import { rooms } from "./data";
import dbConnect from "@/backend/config/dbConnect";

const seedRooms = async () => {
  try {
    dbConnect();
    await Room.deleteMany();

    await Room.insertMany(rooms);

    process.exit();
  } catch (error) {
    console.log(error);
    process.exit();
  }
};

seedRooms();
