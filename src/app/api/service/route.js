import { connectDB } from "@/lib/dbconnect"; 

export async function GET() {
  try {
    const collection = await connectDB("service");
    const services = await collection.find().toArray();

    return new Response(JSON.stringify(services), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error fetching services:", error);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
    });
  }
}
