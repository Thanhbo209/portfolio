import { connectDB } from "@/lib/mongodb";
import { Drawing } from "@/models/Drawing";

type PostBody = {
  image: string;
};

export async function POST(req: Request) {
  await connectDB();

  const body = (await req.json()) as PostBody;

  if (!body.image) {
    return Response.json({ message: "Image is required" }, { status: 400 });
  }

  await Drawing.create({ image: body.image });

  return Response.json({ success: true });
}

export async function GET() {
  await connectDB();

  const drawings = await Drawing.find().sort({ createdAt: -1 }).lean();

  return Response.json(drawings);
}
