import { connectDB } from "@/lib/dbconnect";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const { id } = await params;
  console.log(id);
  const serviceCollection = await connectDB("service");
  const result = await serviceCollection.findOne({
    _id: new ObjectId(id),
  });
  return NextResponse.json(result);
}
