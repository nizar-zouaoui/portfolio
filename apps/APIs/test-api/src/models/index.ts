import mongoose from "mongoose";

const TestSchema = new mongoose.Schema(
  {
    playerName: String,
  },
  { timestamps: true, typeKey: "$type" }
);

export type TestType = {
  playerName: string;
};

export const Tester = mongoose.model<TestType>("Tester", TestSchema);
